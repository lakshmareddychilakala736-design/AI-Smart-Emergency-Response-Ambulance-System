import os
import sys
from datetime import datetime, timezone, timedelta

# Ensure parent path is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import engine, Base, SessionLocal
from app.models.models import (
    User, Patient, Doctor, HospitalAdmin, Driver, Hospital, Ambulance,
    EmergencyRequest, Trip, VitalSign, MedicalRecord, AuditLog, UserRole, EmergencyStatus, SeverityLevel
)
from app.core.security import get_password_hash

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("Seeding database with startup demo data...")

    # 1. Users & Profiles
    patient_user = User(
        email="patient@lifeline.com",
        hashed_password=get_password_hash("password123"),
        role=UserRole.PATIENT,
        full_name="John Doe",
        phone="+1-555-0192",
        is_verified=True
    )
    driver_user = User(
        email="driver@lifeline.com",
        hashed_password=get_password_hash("password123"),
        role=UserRole.DRIVER,
        full_name="Captain Alex Vance",
        phone="+1-555-0183",
        is_verified=True
    )
    doctor_user = User(
        email="doctor@lifeline.com",
        hashed_password=get_password_hash("password123"),
        role=UserRole.DOCTOR,
        full_name="Dr. Sarah Jenkins",
        phone="+1-555-0144",
        is_verified=True
    )
    hospital_admin_user = User(
        email="hospital@lifeline.com",
        hashed_password=get_password_hash("password123"),
        role=UserRole.HOSPITAL_ADMIN,
        full_name="Marcus Aurelius (Admin)",
        phone="+1-555-0175",
        is_verified=True
    )
    super_admin_user = User(
        email="admin@lifeline.com",
        hashed_password=get_password_hash("password123"),
        role=UserRole.SUPER_ADMIN,
        full_name="System Super Admin",
        phone="+1-555-0100",
        is_verified=True
    )

    db.add_all([patient_user, driver_user, doctor_user, hospital_admin_user, super_admin_user])
    db.commit()

    # 2. Patient Profile
    patient = Patient(
        user_id=patient_user.id,
        blood_group="O+",
        allergies="Penicillin",
        chronic_conditions="Hypertension",
        emergency_contact_name="Jane Doe",
        emergency_contact_phone="+1-555-9988",
        current_lat=12.9716,
        current_lng=77.5946
    )
    db.add(patient)

    # 3. Hospitals
    hosp1 = Hospital(
        name="City General Emergency Trauma Center",
        address="100 Lifeline Blvd, Central City",
        lat=12.9750,
        lng=77.6000,
        total_icu_beds=15,
        available_icu_beds=6,
        total_general_beds=60,
        available_general_beds=24,
        emergency_capacity=20,
        contact_phone="+1-800-555-9111",
        trauma_center_level="Level 1 Trauma"
    )
    hosp2 = Hospital(
        name="St. Jude Heart & Cardiac Institute",
        address="45 Medical Park Ave, East Bay",
        lat=12.9600,
        lng=77.6200,
        total_icu_beds=10,
        available_icu_beds=2,
        total_general_beds=40,
        available_general_beds=11,
        emergency_capacity=10,
        contact_phone="+1-800-555-9222",
        trauma_center_level="Level 2 Cardiac Specialty"
    )
    db.add_all([hosp1, hosp2])
    db.commit()

    # 4. Doctor & Hospital Admin Profiles
    doctor = Doctor(
        user_id=doctor_user.id,
        hospital_id=hosp1.id,
        specialization="Critical Care & Emergency Cardiology",
        license_number="MD-CRIT-8841",
        is_on_duty=True
    )
    hospital_admin = HospitalAdmin(
        user_id=hospital_admin_user.id,
        hospital_id=hosp1.id
    )
    db.add_all([doctor, hospital_admin])

    # 5. Ambulances & Driver
    amb1 = Ambulance(
        vehicle_number="AMB-ALS-901",
        type="Advanced Life Support (ALS)",
        status="busy",
        lat=12.9680,
        lng=77.5890,
        oxygen_level=98.5,
        fuel_level=88.0
    )
    amb2 = Ambulance(
        vehicle_number="AMB-BLS-402",
        type="Basic Life Support (BLS)",
        status="available",
        lat=12.9820,
        lng=77.6150,
        oxygen_level=100.0,
        fuel_level=95.0
    )
    db.add_all([amb1, amb2])
    db.commit()

    driver = Driver(
        user_id=driver_user.id,
        ambulance_id=amb1.id,
        license_number="DL-ALS-9904",
        is_available=False,
        rating=4.95,
        current_lat=amb1.lat,
        current_lng=amb1.lng
    )
    db.add(driver)
    db.commit()

    # 6. Active Emergency Request & Trip
    emergency = EmergencyRequest(
        patient_id=patient.id,
        pickup_address="Block 4, Metro Square, Central Avenue",
        pickup_lat=12.9716,
        pickup_lng=77.5946,
        description="Acute chest pain radiating to left shoulder with shortness of breath",
        severity_level=SeverityLevel.P1_CRITICAL,
        status=EmergencyStatus.TRANSPORTING
    )
    db.add(emergency)
    db.commit()

    trip = Trip(
        emergency_request_id=emergency.id,
        driver_id=driver.id,
        hospital_id=hosp1.id,
        status=EmergencyStatus.TRANSPORTING,
        eta_minutes=4.5,
        distance_km=2.8,
        start_time=datetime.now(timezone.utc) - timedelta(minutes=6)
    )
    db.add(trip)
    db.commit()

    # 7. Vital Signs Telemetry Stream
    now = datetime.now(timezone.utc)
    vitals_data = [
        VitalSign(trip_id=trip.id, heart_rate=112, spo2=94, temperature=37.2, blood_pressure_sys=145, blood_pressure_dia=92, timestamp=now - timedelta(minutes=5)),
        VitalSign(trip_id=trip.id, heart_rate=108, spo2=95, temperature=37.1, blood_pressure_sys=140, blood_pressure_dia=88, timestamp=now - timedelta(minutes=3)),
        VitalSign(trip_id=trip.id, heart_rate=102, spo2=96, temperature=37.0, blood_pressure_sys=135, blood_pressure_dia=85, timestamp=now - timedelta(minutes=1))
    ]
    db.add_all(vitals_data)

    # 8. Patient Medical Records
    records = [
        MedicalRecord(patient_id=patient.id, title="ECG Screening Report 2025", record_type="Cardiology", summary="Normal sinus rhythm with mild ST depression in lead II.", file_url="/records/ecg_2025.pdf"),
        MedicalRecord(patient_id=patient.id, title="Blood Panel & Lipid Profile", record_type="Lab Report", summary="Elevated cholesterol; HbA1c 5.8%", file_url="/records/blood_panel.pdf")
    ]
    db.add_all(records)

    # 9. System Audit Logs
    audit = AuditLog(
        user_id=patient_user.id,
        action="SOS_TRIGGERED",
        details="Patient John Doe triggered P1 Critical Emergency SOS at (12.9716, 77.5946)"
    )
    db.add(audit)

    db.commit()
    print("Database successfully seeded with demo data!")

if __name__ == "__main__":
    seed_database()
