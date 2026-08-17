from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import VitalSign
from app.schemas.schemas import VitalSignCreate, VitalSignResponse
from app.websockets.connection_manager import ws_manager

router = APIRouter()

@router.post("/", response_model=VitalSignResponse)
async def post_vital_sign(vital_in: VitalSignCreate, db: Session = Depends(get_db)):
    vital = VitalSign(**vital_in.model_dump())
    db.add(vital)
    db.commit()
    db.refresh(vital)

    # Stream vital sign live via WebSockets
    await ws_manager.broadcast({
        "event": "VITAL_SIGN_UPDATE",
        "trip_id": vital.trip_id,
        "heart_rate": vital.heart_rate,
        "spo2": vital.spo2,
        "temperature": vital.temperature,
        "blood_pressure_sys": vital.blood_pressure_sys,
        "blood_pressure_dia": vital.blood_pressure_dia,
        "timestamp": str(vital.timestamp)
    })

    return vital

@router.get("/trip/{trip_id}", response_model=List[VitalSignResponse])
def get_trip_vitals(trip_id: int, db: Session = Depends(get_db)):
    return db.query(VitalSign).filter(VitalSign.trip_id == trip_id).order_by(VitalSign.timestamp.asc()).all()
