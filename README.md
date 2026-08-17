# AI Smart Emergency Response & Ambulance System

![Platform Badge](https://img.shields.io/badge/LifeLine-AI%20Smart%20Emergency-red.svg)
![React](https://img.shields.io/badge/Frontend-React%20%7C%20TypeScript%20%7C%20Tailwind-blue.svg)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20SQLAlchemy%20%7C%20WebSockets-green.svg)
![Docker](https://img.shields.io/badge/Deploy-Docker%20Compose-purple.svg)

An enterprise-grade, startup-ready **AI Smart Emergency Response & Ambulance Management System** designed to reduce ambulance arrival times and optimize hospital triage through Machine Learning, real-time telemetry, OpenStreetMap GPS tracking, and instant role-based dashboards.

---

## 🌟 Key Features & Role Portals

### 1. Patient Portal
- **One-Touch SOS Emergency Button** with a 3-second safety cancel countdown.
- **Live GPS Arrival Radar** displaying real-time ambulance movement along polyline routes.
- **Medical Records Vault** for uploading and storing patient diagnostic reports.
- **AI Triage Chatbot Assistant** offering 24/7 symptom guidance and emergency warning flags.

### 2. Ambulance Driver Portal
- **Turn-by-Turn Route Navigation** with traffic congestion indicators.
- **Trip Lifecycle Progression** (`En Route` ➔ `On Site` ➔ `Transporting` ➔ `Arrived ER` ➔ `Completed`).
- **Vehicle Readiness Monitoring** (Fuel %, Oxygen pressure levels).

### 3. Emergency Doctor Portal
- **Live IoT Patient Telemetry** displaying ECG waveforms, Heart Rate (BPM), SpO₂ (%), Temperature, and Blood Pressure.
- **Clinical Treatment Notes Recording** with direct synchronization to patient records.
- **Allergies & History Alerts** (Penicillin warnings, chronic conditions).

### 4. Hospital Command Portal
- **Real-Time Bed Management Grid** allowing instant increment/decrement of ICU and General beds.
- **Inbound Ambulance Telemetry Queue** tracking arriving emergency patients.
- **Doctor & Ward Assignment**.

### 5. Super Admin Portal
- **Spatial Demand Forecasting** identifying emergency hotspots for pre-positioning fleets.
- **Ambulance Fleet & User Management Tables**.
- **System Audit Logs & Performance Analytics**.

---

## 👥 Default Demo Credentials (All 5 Roles)

Password for all pre-configured accounts: `password123`

| Role | Email Address | Assigned Features |
| :--- | :--- | :--- |
| **Patient** | `patient@lifeline.com` | SOS Button, Medical Records, Live Tracking |
| **Driver** | `driver@lifeline.com` | Turn Navigation, Vehicle AMB-ALS-901 |
| **Doctor** | `doctor@lifeline.com` | Live Vitals ECG Waveforms, Notes Editor |
| **Hospital Admin** | `hospital@lifeline.com` | ICU Bed Adjuster, Incoming ER Queue |
| **Super Admin** | `admin@lifeline.com` | Fleet Control, AI Demand Hotspots, Audit Logs |

---

## 🏗️ Project Architecture

```
AI Smart Emergency Response & Ambulance System/
├── backend/
│   ├── app/
│   │   ├── api/                  # REST API Endpoints (Auth, Emergency, Hospitals, Trips, Vitals, AI, Admin)
│   │   ├── ai/                   # AI/ML Engines (Severity, Dispatch, Hospital Recommender, ETA, Demand Forecast, Chatbot)
│   │   ├── core/                 # Config & Security (JWT, Hashing)
│   │   ├── db/                   # SQLAlchemy Engine & Session
│   │   ├── models/               # SQLAlchemy Models (Users, Patients, Ambulances, Trips, Vitals, etc.)
│   │   ├── schemas/              # Pydantic Schemas
│   │   └── websockets/           # Telemetry WebSocket Manager
│   ├── seed_data.py              # Automatic Database Seeder
│   ├── main.py                   # FastAPI Application Entrypoint
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Sidebar, EmergencyMap (Leaflet), VitalsWaveform, AIChatbotWidget, StatsCard
│   │   ├── context/              # AuthContext with Live Role Switcher
│   │   ├── pages/                # LandingPage, Dashboards for all 5 Roles, Tracking, Analytics, Auth
│   │   ├── services/             # Axios API Client & Fallbacks
│   │   └── types/                # TypeScript Interfaces
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml            # Multi-container orchestration (Postgres + Backend + Frontend)
├── .env.example
└── README.md
```

---

## 🚀 How to Run Locally

### 1. Run Backend (FastAPI + SQLite Zero-Config)
```bash
cd backend
python seed_data.py          # Seeds initial database & demo accounts
uvicorn main:app --reload    # Starts backend server at http://localhost:8000
```
- Interactive Swagger API Documentation: `http://localhost:8000/docs`

### 2. Run Frontend (React + Vite + TypeScript)
```bash
cd frontend
npm install
npm run dev                  # Starts Vite dev server at http://localhost:5173
```

---

## 🐳 Docker Deployment

To launch the full stack with **PostgreSQL**, **FastAPI**, and **Nginx/React** in isolated containers:

```bash
docker-compose up --build
```
- Frontend Web App: `http://localhost:3000`
- Backend API Docs: `http://localhost:8000/docs`
- 
---

## 👨‍💻 Connect With Me

**Lakshma Reddy**

- 💻 **GitHub:** https://github.com/lakshmareddychilakala736-design
- 💼 **LinkedIn:** https://www.linkedin.com/in/lakshma-reddy-chilakala-3175b835b?utm_source=share_via&utm_content=profile&utm_medium=member_android
- 📧 **Email:** lakshmareddychilakala736@gmail.com

---

### ⭐ If you like this project

Give this repository a ⭐ on GitHub and feel free to connect with me!
