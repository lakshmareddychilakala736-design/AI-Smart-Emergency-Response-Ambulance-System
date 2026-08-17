import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { PatientDashboard } from './pages/PatientDashboard';
import { DriverDashboard } from './pages/DriverDashboard';
import { HospitalDashboard } from './pages/HospitalDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmergencyTracking } from './pages/EmergencyTracking';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';
import { NotFound } from './pages/NotFound';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Pages */}
          <Route path="/login" element={<AppLayout><Login /></AppLayout>} />
          <Route path="/register" element={<AppLayout><Register /></AppLayout>} />
          <Route path="/forgot-password" element={<AppLayout><ForgotPassword /></AppLayout>} />

          {/* Role Dashboards */}
          <Route path="/patient-dashboard" element={<AppLayout><PatientDashboard /></AppLayout>} />
          <Route path="/driver-dashboard" element={<AppLayout><DriverDashboard /></AppLayout>} />
          <Route path="/hospital-dashboard" element={<AppLayout><HospitalDashboard /></AppLayout>} />
          <Route path="/doctor-dashboard" element={<AppLayout><DoctorDashboard /></AppLayout>} />
          <Route path="/admin-dashboard" element={<AppLayout><AdminDashboard /></AppLayout>} />

          {/* Operational Pages */}
          <Route path="/emergency-tracking" element={<AppLayout><EmergencyTracking /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
          <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><Reports /></AppLayout>} />

          {/* 404 Fallback */}
          <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
