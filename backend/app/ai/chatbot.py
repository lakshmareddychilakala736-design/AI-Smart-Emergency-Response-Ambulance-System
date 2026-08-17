class AIChatbotAssistant:
    def respond(self, message: str) -> dict:
        msg_lower = message.lower()
        
        if any(word in msg_lower for word in ["chest pain", "bleeding", "cannot breathe", "heart attack", "unconscious", "accident", "stroke", "emergency"]):
            return {
                "reply": "CRITICAL WARNING: Your symptoms suggest a potential medical emergency! Please click the red SOS Button immediately to dispatch an ambulance with live GPS tracking.",
                "suggested_actions": ["PRESS SOS BUTTON NOW", "Perform CPR if trained", "Keep patient lying flat"],
                "is_emergency_triggered": True
            }
        elif "burn" in msg_lower:
            return {
                "reply": "For minor burns: Cool with cool running water for 10-20 minutes. Do NOT apply ice or butter. If severe or large area, trigger SOS immediately.",
                "suggested_actions": ["Cool under running water", "Cover with clean cloth", "Trigger SOS if severe"],
                "is_emergency_triggered": False
            }
        elif "cpr" in msg_lower or "unresponsive" in msg_lower:
            return {
                "reply": "Hands-Only CPR: Push hard and fast in the center of the chest to the beat of 100-120 compressions per minute. Ensure someone triggers SOS immediately!",
                "suggested_actions": ["Call SOS", "Push hard & fast on chest center", "Do not stop until help arrives"],
                "is_emergency_triggered": True
            }
        else:
            return {
                "reply": "I am LifeLine AI Emergency Assistant. How can I help you today? In case of critical emergency, click the SOS button anytime.",
                "suggested_actions": ["Check First Aid Tips", "Upload Medical Record", "Call Emergency Contacts"],
                "is_emergency_triggered": False
            }

chatbot_assistant = AIChatbotAssistant()
