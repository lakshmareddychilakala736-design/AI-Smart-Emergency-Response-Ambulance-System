from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.models import Hospital
from app.schemas.schemas import (
    SeverityPredictionRequest, SeverityPredictionResponse,
    HospitalRecommendationRequest, ChatbotRequest, ChatbotResponse
)
from app.ai.severity_predictor import severity_predictor
from app.ai.hospital_recommender import hospital_recommender
from app.ai.eta_predictor import eta_predictor
from app.ai.demand_forecaster import demand_forecaster
from app.ai.chatbot import chatbot_assistant

router = APIRouter()

@router.post("/predict-severity", response_model=SeverityPredictionResponse)
def predict_severity(payload: SeverityPredictionRequest):
    return severity_predictor.predict(
        symptoms=payload.symptoms,
        heart_rate=payload.heart_rate or 80,
        spo2=payload.spo2 or 98,
        age=payload.age or 35
    )

@router.post("/recommend-hospitals")
def recommend_hospitals(payload: HospitalRecommendationRequest, db: Session = Depends(get_db)):
    hospitals = db.query(Hospital).all()
    return hospital_recommender.recommend_hospitals(
        pickup_lat=payload.pickup_lat,
        pickup_lng=payload.pickup_lng,
        hospitals=hospitals,
        severity_level=payload.severity_level
    )

@router.get("/predict-eta")
def predict_eta(distance_km: float, traffic_factor: float = 1.2):
    return eta_predictor.predict_eta(distance_km=distance_km, traffic_factor=traffic_factor)

@router.get("/forecast-demand")
def forecast_demand():
    return demand_forecaster.forecast_hotspots()

@router.post("/chatbot", response_model=ChatbotResponse)
def chat_with_ai(payload: ChatbotRequest):
    return chatbot_assistant.respond(message=payload.message)
