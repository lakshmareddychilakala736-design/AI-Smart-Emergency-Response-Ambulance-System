import numpy as np

class EmergencySeverityPredictor:
    def __init__(self):
        # High priority symptoms list
        self.critical_symptoms = [
            "chest pain", "cardiac arrest", "unconscious", "stroke", 
            "difficulty breathing", "severe bleeding", "head injury", "seizure"
        ]
        self.urgent_symptoms = [
            "fracture", "high fever", "severe abdominal pain", "asthma attack", 
            "burns", "deep laceration", "allergic reaction"
        ]

    def predict(self, symptoms: list[str], heart_rate: int = 80, spo2: int = 98, age: int = 35) -> dict:
        symptoms_lower = [s.lower() for s in symptoms]
        
        # Vital sign risk factors
        is_critical_vitals = spo2 < 90 or heart_rate > 130 or heart_rate < 45
        is_urgent_vitals = spo2 < 94 or heart_rate > 110 or heart_rate < 50

        # Critical match
        has_critical_symptom = any(cs in " ".join(symptoms_lower) for cs in self.critical_symptoms)
        has_urgent_symptom = any(us in " ".join(symptoms_lower) for us in self.urgent_symptoms)

        if has_critical_symptom or is_critical_vitals:
            severity = "P1_CRITICAL"
            confidence = 0.96
            recommendation = "Immediate Advanced Life Support (ALS) Ambulance required. Code Red Dispatch."
            requires_als = True
        elif has_urgent_symptom or is_urgent_vitals:
            severity = "P2_URGENT"
            confidence = 0.89
            recommendation = "Basic Life Support (BLS) Ambulance dispatched. Priority Response."
            requires_als = False
        else:
            severity = "P3_NON_URGENT"
            confidence = 0.82
            recommendation = "Standard Medical Transport recommended. Moderate Priority."
            requires_als = False

        return {
            "severity_level": severity,
            "confidence_score": confidence,
            "triage_recommendation": recommendation,
            "requires_als": requires_als
        }

severity_predictor = EmergencySeverityPredictor()
