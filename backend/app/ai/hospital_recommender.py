from app.ai.dispatch_optimizer import haversine_distance

class HospitalRecommender:
    def recommend_hospitals(self, pickup_lat: float, pickup_lng: float, hospitals: list, severity_level: str) -> list:
        recommendations = []
        for hosp in hospitals:
            dist = haversine_distance(pickup_lat, pickup_lng, hosp.lat, hosp.lng)
            
            # Score formula considering distance and bed capacity
            bed_score = 0
            if hosp.available_icu_beds > 0:
                bed_score += 3.0
            if hosp.available_general_beds > 0:
                bed_score += 1.0

            if severity_level == "P1_CRITICAL" and hosp.available_icu_beds == 0:
                # Penalty for no ICU beds in critical cases
                score = dist + 15.0
            else:
                score = dist - bed_score

            eta_min = max(2.0, round((dist / 35.0) * 60, 1)) # Assuming avg speed 35 km/h in emergency
            recommendations.append({
                "hospital_id": hosp.id,
                "name": hosp.name,
                "address": hosp.address,
                "lat": hosp.lat,
                "lng": hosp.lng,
                "distance_km": round(dist, 2),
                "eta_minutes": eta_min,
                "available_icu_beds": hosp.available_icu_beds,
                "available_general_beds": hosp.available_general_beds,
                "contact_phone": hosp.contact_phone,
                "recommendation_score": round(score, 2)
            })

        recommendations.sort(key=lambda x: x["recommendation_score"])
        return recommendations

hospital_recommender = HospitalRecommender()
