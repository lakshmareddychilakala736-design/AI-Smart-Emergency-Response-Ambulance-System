from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: int
    full_name: str

class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    role: Optional[str] = "patient"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Emergency Request Schemas
class EmergencyCreate(BaseModel):
    pickup_lat: float
    pickup_lng: float
    pickup_address: Optional[str] = "Current Location"
    description: Optional[str] = "Emergency Assistance Needed"
    heart_rate: Optional[int] = 85
    spo2: Optional[int] = 98

class EmergencyResponse(BaseModel):
    id: int
    patient_id: int
    pickup_address: Optional[str]
    pickup_lat: float
    pickup_lng: float
    description: Optional[str]
    severity_level: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Trip Schemas
class TripResponse(BaseModel):
    id: int
    emergency_request_id: int
    driver_id: int
    hospital_id: int
    status: str
    eta_minutes: float
    distance_km: float
    start_time: datetime

    class Config:
        from_attributes = True

class TripStatusUpdate(BaseModel):
    status: str
    lat: Optional[float] = None
    lng: Optional[float] = None

# Hospital & Bed Schemas
class HospitalResponse(BaseModel):
    id: int
    name: str
    address: str
    lat: float
    lng: float
    total_icu_beds: int
    available_icu_beds: int
    total_general_beds: int
    available_general_beds: int
    emergency_capacity: int
    contact_phone: str
    trauma_center_level: str

    class Config:
        from_attributes = True

class BedUpdate(BaseModel):
    available_icu_beds: int
    available_general_beds: int

# Vital Sign Schemas
class VitalSignCreate(BaseModel):
    trip_id: int
    heart_rate: int
    spo2: int
    temperature: float
    blood_pressure_sys: int
    blood_pressure_dia: int

class VitalSignResponse(VitalSignCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# AI Schemas
class SeverityPredictionRequest(BaseModel):
    symptoms: List[str]
    heart_rate: Optional[int] = 80
    spo2: Optional[int] = 98
    age: Optional[int] = 35

class SeverityPredictionResponse(BaseModel):
    severity_level: str
    confidence_score: float
    triage_recommendation: str
    requires_als: bool

class HospitalRecommendationRequest(BaseModel):
    pickup_lat: float
    pickup_lng: float
    severity_level: str
    required_specialty: Optional[str] = "Emergency Care"

class ChatbotRequest(BaseModel):
    message: str
    patient_id: Optional[int] = None

class ChatbotResponse(BaseModel):
    reply: str
    suggested_actions: List[str]
    is_emergency_triggered: bool
