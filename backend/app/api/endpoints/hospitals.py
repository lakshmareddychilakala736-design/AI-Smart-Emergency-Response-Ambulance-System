from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Hospital, Doctor, Trip
from app.schemas.schemas import HospitalResponse, BedUpdate

router = APIRouter()

@router.get("/", response_model=List[HospitalResponse])
def list_hospitals(db: Session = Depends(get_db)):
    return db.query(Hospital).all()

@router.get("/{hospital_id}", response_model=HospitalResponse)
def get_hospital(hospital_id: int, db: Session = Depends(get_db)):
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
    return hospital

@router.put("/{hospital_id}/beds", response_model=HospitalResponse)
def update_beds(hospital_id: int, bed_in: BedUpdate, db: Session = Depends(get_db)):
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")

    hospital.available_icu_beds = bed_in.available_icu_beds
    hospital.available_general_beds = bed_in.available_general_beds
    db.commit()
    db.refresh(hospital)
    return hospital

@router.get("/{hospital_id}/incoming-ambulances")
def get_incoming_ambulances(hospital_id: int, db: Session = Depends(get_db)):
    incoming_trips = db.query(Trip).filter(
        Trip.hospital_id == hospital_id,
        Trip.status != "completed"
    ).all()
    return incoming_trips
