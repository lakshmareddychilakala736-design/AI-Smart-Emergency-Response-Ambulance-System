from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Trip, EmergencyStatus
from app.schemas.schemas import TripResponse, TripStatusUpdate
from app.websockets.connection_manager import ws_manager

router = APIRouter()

@router.get("/active", response_model=TripResponse)
def get_active_trip(db: Session = Depends(get_db)):
    trip = db.query(Trip).filter(Trip.status != EmergencyStatus.COMPLETED).first()
    if not trip:
        raise HTTPException(status_code=404, detail="No active trip found")
    return trip

@router.put("/{trip_id}/status", response_model=TripResponse)
async def update_trip_status(trip_id: int, update_in: TripStatusUpdate, db: Session = Depends(get_db)):
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    trip.status = update_in.status
    if trip.emergency_request:
        trip.emergency_request.status = update_in.status
    
    if update_in.lat and update_in.lng and trip.driver and trip.driver.ambulance:
        trip.driver.ambulance.lat = update_in.lat
        trip.driver.ambulance.lng = update_in.lng

    db.commit()
    db.refresh(trip)

    await ws_manager.broadcast({
        "event": "TRIP_STATUS_UPDATED",
        "trip_id": trip.id,
        "status": trip.status,
        "lat": update_in.lat,
        "lng": update_in.lng
    })

    return trip
