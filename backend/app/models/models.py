import enum
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from app.db.session import Base

class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DRIVER = "driver"
    DOCTOR = "doctor"
    HOSPITAL_ADMIN = "hospital_admin"
    SUPER_ADMIN = "super_admin"

class EmergencyStatus(str, enum.Enum):
    PENDING = "pending"
    DISPATCHED = "dispatched"
    EN_ROUTE_PATIENT = "en_route_patient"
    ON_SITE = "on_site"
    TRANSPORTING = "transporting"
    ARRIVED_HOSPITAL = "arrived_hospital"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class SeverityLevel(str, enum.Enum):
    P1_CRITICAL = "P1_CRITICAL"
    P2_URGENT = "P2_URGENT"
    P3_NON_URGENT = "P3_NON_URGENT"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default=UserRole.PATIENT)
    full_name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    patient_profile = relationship("Patient", back_populates="user", uselist=False)
    driver_profile = relationship("Driver", back_populates="user", uselist=False)
    doctor_profile = relationship("Doctor", back_populates="user", uselist=False)
    hospital_admin_profile = relationship("HospitalAdmin", back_populates="user", uselist=False)

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    blood_group = Column(String(10), nullable=True)
    allergies = Column(Text, nullable=True)
    chronic_conditions = Column(Text, nullable=True)
    emergency_contact_name = Column(String(255), nullable=True)
    emergency_contact_phone = Column(String(50), nullable=True)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)

    user = relationship("User", back_populates="patient_profile")
    emergency_requests = relationship("EmergencyRequest", back_populates="patient")
    medical_records = relationship("MedicalRecord", back_populates="patient")

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    address = Column(String(500), nullable=False)
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    total_icu_beds = Column(Integer, default=10)
    available_icu_beds = Column(Integer, default=5)
    total_general_beds = Column(Integer, default=50)
    available_general_beds = Column(Integer, default=20)
    emergency_capacity = Column(Integer, default=15)
    contact_phone = Column(String(50), nullable=False)
    trauma_center_level = Column(String(50), default="Level 1")

    doctors = relationship("Doctor", back_populates="hospital")
    trips = relationship("Trip", back_populates="hospital")
    admins = relationship("HospitalAdmin", back_populates="hospital")

class HospitalAdmin(Base):
    __tablename__ = "hospital_admins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))

    user = relationship("User", back_populates="hospital_admin_profile")
    hospital = relationship("Hospital", back_populates="admins")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    specialization = Column(String(255), default="Emergency Medicine")
    license_number = Column(String(100), nullable=True)
    is_on_duty = Column(Boolean, default=True)

    user = relationship("User", back_populates="doctor_profile")
    hospital = relationship("Hospital", back_populates="doctors")

class Ambulance(Base):
    __tablename__ = "ambulances"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_number = Column(String(100), unique=True, nullable=False)
    type = Column(String(100), default="Advanced Life Support (ALS)")
    status = Column(String(50), default="available") # available, busy, maintenance
    lat = Column(Float, nullable=False)
    lng = Column(Float, nullable=False)
    oxygen_level = Column(Float, default=100.0) # %
    fuel_level = Column(Float, default=95.0) # %

    driver = relationship("Driver", back_populates="ambulance", uselist=False)

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    ambulance_id = Column(Integer, ForeignKey("ambulances.id"), nullable=True)
    license_number = Column(String(100), nullable=False)
    is_available = Column(Boolean, default=True)
    rating = Column(Float, default=4.9)
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)

    user = relationship("User", back_populates="driver_profile")
    ambulance = relationship("Ambulance", back_populates="driver")
    trips = relationship("Trip", back_populates="driver")

class EmergencyRequest(Base):
    __tablename__ = "emergency_requests"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    pickup_address = Column(String(500), nullable=True)
    pickup_lat = Column(Float, nullable=False)
    pickup_lng = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    severity_level = Column(String(50), default=SeverityLevel.P1_CRITICAL)
    status = Column(String(50), default=EmergencyStatus.PENDING)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    patient = relationship("Patient", back_populates="emergency_requests")
    trip = relationship("Trip", back_populates="emergency_request", uselist=False)

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    emergency_request_id = Column(Integer, ForeignKey("emergency_requests.id"), unique=True)
    driver_id = Column(Integer, ForeignKey("drivers.id"))
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    status = Column(String(50), default=EmergencyStatus.DISPATCHED)
    eta_minutes = Column(Float, default=8.5)
    distance_km = Column(Float, default=4.2)
    start_time = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    end_time = Column(DateTime, nullable=True)

    emergency_request = relationship("EmergencyRequest", back_populates="trip")
    driver = relationship("Driver", back_populates="trips")
    hospital = relationship("Hospital", back_populates="trips")
    vital_signs = relationship("VitalSign", back_populates="trip")

class VitalSign(Base):
    __tablename__ = "vital_signs"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"))
    heart_rate = Column(Integer, nullable=False) # bpm
    spo2 = Column(Integer, nullable=False) # %
    temperature = Column(Float, nullable=False) # °C
    blood_pressure_sys = Column(Integer, nullable=False) # mmHg
    blood_pressure_dia = Column(Integer, nullable=False) # mmHg
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    trip = relationship("Trip", back_populates="vital_signs")

class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    title = Column(String(255), nullable=False)
    record_type = Column(String(100), default="General Report")
    summary = Column(Text, nullable=True)
    file_url = Column(String(500), nullable=True)
    uploaded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    patient = relationship("Patient", back_populates="medical_records")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(255), nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
