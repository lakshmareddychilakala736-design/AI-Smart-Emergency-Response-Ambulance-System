import math

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Radius of earth in kilometers
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

class DispatchOptimizer:
    def find_best_ambulance(self, pickup_lat: float, pickup_lng: float, ambulances: list, severity: str) -> dict:
        if not ambulances:
            return None

        scored_ambulances = []
        for amb in ambulances:
            dist = haversine_distance(pickup_lat, pickup_lng, amb.lat, amb.lng)
            
            # Score formula: Distance weight (70%) + Fuel & Equipment Readiness (30%)
            # Lower score is better
            fuel_factor = (100 - amb.fuel_level) * 0.05
            type_bonus = 0 if (severity == "P1_CRITICAL" and "ALS" in amb.type) else 1.5
            
            score = dist + fuel_factor + type_bonus
            scored_ambulances.append({
                "ambulance": amb,
                "distance_km": round(dist, 2),
                "score": score
            })

        scored_ambulances.sort(key=lambda x: x["score"])
        return scored_ambulances[0]

dispatch_optimizer = DispatchOptimizer()
