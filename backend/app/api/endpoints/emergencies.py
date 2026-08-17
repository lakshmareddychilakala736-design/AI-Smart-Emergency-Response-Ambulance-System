from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import EmergencyRequest, Patient, Ambulance, Driver, Hospital, Trip, EmergencyStatus, VitalSign
from app.schemas.schemas import EmergencyCreate, EmergencyResponse
from app.ai.severity_predictor import severity_predictor
from app.ai.dispatch_optimizer import dispatch_optimizer
from app.ai.hospital_recommender import hospital_recommender
from app.websockets.connection_manager import ws_manager

router = APIRouter()

@router.post("/sos", response_model=EmergencyResponse)
async def trigger_sos(request_in: EmergencyCreate, db: Session = Depends(get_db)):
    # Default patient ID 1 for quick SOS if unauthenticated
    patient = db.query(Patient).first()
    patient_id = patient.id if patient else 1

    # AI severity prediction
    sev_result = severity_predictor.predict(
        symptoms=[request_in.description or "Emergency SOS Triggered"],
        heart_rate=request_in.heart_rate or 85,
        spo2=request_in.spo2 or 98
    )

    emergency = EmergencyRequest(
        patient_id=patient_id,
        pickup_address=request_in.pickup_address,
        pickup_lat=request_in.pickup_lat,
        pickup_lng=request_in.pickup_lng,
        description=request_in.description,
        severity_level=sev_result["severity_level"],
        status=EmergencyStatus.PENDING
    )
    db.add(emergency)
    db.commit()
    db.refresh(emergency)

    # Find best ambulance & hospital
    ambulances = db.query(Ambulance).filter(Ambulance.status == "available").all()
    hospitals = db.query(Hospital).all()
    
    best_amb = dispatch_optimizer.find_best_ambulance(
        pickup_lat=emergency.pickup_lat,
        pickup_lng=emergency.pickup_lng,
        ambulances=ambulances,
        severity=emergency.severity_level
    )
    
    best_hosp = hospital_recommender.recommend_hospitals(
        pickup_lat=emergency.pickup_lat,
        pickup_lng=emergency.pickup_lng,
        hospitals=hospitals,
        severity_level=emergency.severity_level
    )

    hospital_id = best_hosp[0]["hospital_id"] if best_hosp else (hospitals[0].id if hospitals else 1)
    driver_id = best_amb["ambulance"].driver.id if (best_amb and best_amb["ambulance"].driver) else 1

    # Create trip assignment
    trip = Trip(
        emergency_request_id=emergency.id,
        driver_id=driver_id,
        hospital_id=hospital_id,
        status=EmergencyStatus.DISPATCHED,
        eta_minutes=best_amb["distance_km"] * 2.0 + 3.0 if best_amb else 8.5,
        distance_km=best_amb["distance_km"] if best_amb else 4.2
    )
    db.add(trip)
    emergency.status = EmergencyStatus.DISPATCHED
    
    if best_amb and best_amb["ambulance"]:
        best_amb["ambulance"].status = "busy"

    # Initial vital sign log
    vital = VitalSign(
        trip_id=trip.id,
        heart_rate=request_in.heart_rate or 85,
        spo2=request_in.spo2 or 98,
        temperature=37.0,
        blood_pressure_sys=120,
        blood_pressure_dia=80
    )
    db.add(vital)
    db.commit()
    db.refresh(emergency)

    # Broadcast real-time emergency alert via WebSockets
    await ws_manager.broadcast({
        "event": "NEW_EMERGENCY_DISPATCH",
        "emergency_id": emergency.id,
        "trip_id": trip.id,
        "severity": emergency.severity_level,
        "pickup_lat": emergency.pickup_lat,
        "pickup_lng": emergency.pickup_lng,
        "patient_address": emergency.pickup_address
    })

    return emergency

@router.get("/active")
def get_active_emergencies(db: Session = Depends(get_db)):
    return db.query(EmergencyRequest).filter(EmergencyRequest.status != EmergencyStatus.COMPLETED).all()

@router.get("/{emergency_id}")
def get_emergency_detail(emergency_id: int, db: Session = Depends(get_db)):
    emergency = db.query(EmergencyRequest).filter(EmergencyRequest.id == emergency_id).first()
    if not emergency:
        raise HTTPException(status_code=404, detail="Emergency not found")
    return emergency
