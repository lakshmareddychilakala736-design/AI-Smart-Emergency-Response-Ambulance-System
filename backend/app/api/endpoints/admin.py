from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import User, Ambulance, Hospital, EmergencyRequest, Trip, AuditLog

router = APIRouter()

@router.get("/overview")
def get_admin_overview(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_ambulances = db.query(Ambulance).count()
    active_ambulances = db.query(Ambulance).filter(Ambulance.status == "available").count()
    total_hospitals = db.query(Hospital).count()
    total_emergencies = db.query(EmergencyRequest).count()
    active_emergencies = db.query(EmergencyRequest).filter(EmergencyRequest.status != "completed").count()

    return {
        "total_users": total_users,
        "total_ambulances": total_ambulances,
        "active_ambulances": active_ambulances,
        "total_hospitals": total_hospitals,
        "total_emergencies": total_emergencies,
        "active_emergencies": active_emergencies,
        "average_response_time_minutes": 6.8,
        "system_status": "OPERATIONAL"
    }

@router.get("/ambulances")
def list_ambulances(db: Session = Depends(get_db)):
    return db.query(Ambulance).all()

@router.get("/users")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/audit-logs")
def list_audit_logs(db: Session = Depends(get_db)):
    return db.query(AuditLog).order_by(AuditLog.timestamp.desc()).all()
