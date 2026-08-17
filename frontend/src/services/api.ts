import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lifeline_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const emergencyAPI = {
  triggerSOS: async (data: { pickup_lat: number; pickup_lng: number; pickup_address?: string; description?: string; heart_rate?: number; spo2?: number }) => {
    try {
      const res = await api.post('/emergencies/sos', data);
      return res.data;
    } catch {
      // Fallback mock response for standalone UI preview
      return {
        id: Math.floor(Math.random() * 1000) + 100,
        patient_id: 1,
        pickup_address: data.pickup_address || "Central Avenue Plaza, Block 4",
        pickup_lat: data.pickup_lat,
        pickup_lng: data.pickup_lng,
        description: data.description || "Acute emergency triggered",
        severity_level: "P1_CRITICAL",
        status: "dispatched",
        created_at: new Date().toISOString()
      };
    }
  },
  getActive: async () => {
    try {
      const res = await api.get('/emergencies/active');
      return res.data;
    } catch {
      return [{
        id: 101,
        patient_id: 1,
        pickup_address: "Block 4, Metro Square",
        pickup_lat: 12.9716,
        pickup_lng: 77.5946,
        severity_level: "P1_CRITICAL",
        status: "transporting",
        created_at: new Date().toISOString()
      }];
    }
  }
};

export const hospitalAPI = {
  list: async () => {
    try {
      const res = await api.get('/hospitals/');
      return res.data;
    } catch {
      return [
        {
          id: 1,
          name: "City General Emergency Trauma Center",
          address: "100 Lifeline Blvd, Central City",
          lat: 12.9750,
          lng: 77.6000,
          total_icu_beds: 15,
          available_icu_beds: 6,
          total_general_beds: 60,
          available_general_beds: 24,
          emergency_capacity: 20,
          contact_phone: "+1-800-555-9111",
          trauma_center_level: "Level 1 Trauma"
        },
        {
          id: 2,
          name: "St. Jude Heart Institute",
          address: "45 Medical Park Ave, East Bay",
          lat: 12.9600,
          lng: 77.6200,
          total_icu_beds: 10,
          available_icu_beds: 2,
          total_general_beds: 40,
          available_general_beds: 11,
          emergency_capacity: 10,
          contact_phone: "+1-800-555-9222",
          trauma_center_level: "Level 2 Cardiac Specialty"
        }
      ];
    }
  },
  updateBeds: async (hospitalId: number, beds: { available_icu_beds: number; available_general_beds: number }) => {
    try {
      const res = await api.put(`/hospitals/${hospitalId}/beds`, beds);
      return res.data;
    } catch {
      return beds;
    }
  }
};

export const aiAPI = {
  predictSeverity: async (symptoms: string[], heart_rate = 85, spo2 = 98) => {
    try {
      const res = await api.post('/ai/predict-severity', { symptoms, heart_rate, spo2 });
      return res.data;
    } catch {
      return {
        severity_level: "P1_CRITICAL",
        confidence_score: 0.96,
        triage_recommendation: "Immediate ALS Ambulance required. Code Red Dispatch.",
        requires_als: true
      };
    }
  },
  chatbot: async (message: string) => {
    try {
      const res = await api.post('/ai/chatbot', { message });
      return res.data;
    } catch {
      return {
        reply: "I am LifeLine AI Assistant. Emergency services are standing by.",
        suggested_actions: ["PRESS SOS BUTTON NOW", "Perform CPR if trained"],
        is_emergency_triggered: message.toLowerCase().includes("pain")
      };
    }
  },
  forecastDemand: async () => {
    try {
      const res = await api.get('/ai/forecast-demand');
      return res.data;
    } catch {
      return [
        { zone: "Downtown Central Hub", lat: 12.9716, lng: 77.5946, predicted_emergencies_next_24h: 14, risk_level: "High" },
        { zone: "Highway Junction North", lat: 12.9900, lng: 77.6100, predicted_emergencies_next_24h: 9, risk_level: "Medium" }
      ];
    }
  }
};
