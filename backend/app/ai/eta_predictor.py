import random

class ETAPredictor:
    def predict_eta(self, distance_km: float, traffic_factor: float = 1.2, speed_kmh: float = 40.0) -> dict:
        base_time_hours = distance_km / max(speed_kmh, 10.0)
        adjusted_time_minutes = base_time_hours * 60.0 * traffic_factor
        
        # Add slight traffic delay variance
        buffer = random.uniform(0.5, 2.0)
        final_eta = round(max(1.5, adjusted_time_minutes + buffer), 1)

        traffic_status = "Light" if traffic_factor < 1.1 else ("Moderate" if traffic_factor < 1.4 else "Heavy Congestion")

        return {
            "distance_km": round(distance_km, 2),
            "predicted_eta_minutes": final_eta,
            "traffic_density": traffic_status,
            "confidence_interval": f"{max(1.0, final_eta - 1.0):.1f} - {final_eta + 2.0:.1f} mins"
        }

eta_predictor = ETAPredictor()
