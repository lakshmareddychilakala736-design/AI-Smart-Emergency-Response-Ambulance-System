import React, { useState } from 'react';
import { EmergencyMap } from '../components/EmergencyMap';
import { AIChatbotWidget } from '../components/AIChatbotWidget';
import { emergencyAPI } from '../services/api';
import { ShieldAlert, Navigation, Phone, Upload, User, Clock, Heart, Plus, AlertTriangle, CheckCircle } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const [sosTriggered, setSosTriggered] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [activeEmergency, setActiveEmergency] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Trigger SOS with 3-second safety countdown
  const initiateSOS = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          executeSOS();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const cancelSOS = () => {
    setCountdown(null);
  };

  const executeSOS = async () => {
    setLoading(true);
    try {
      const res = await emergencyAPI.triggerSOS({
        pickup_lat: 12.9716,
        pickup_lng: 77.5946,
        pickup_address: "Central Avenue, Block 4 Metro Square",
        description: "Emergency Medical SOS Dispatch requested by patient",
        heart_rate: 104,
        spo2: 95
      });
      setActiveEmergency(res);
      setSosTriggered(true);
    } catch {
      setSosTriggered(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner Alert */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Patient Emergency Operations</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold">LIVE TELEMETRY</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Registered Patient: <strong className="text-slate-200">John Doe</strong> • Blood Group: <strong className="text-red-400">O+</strong> • Contact: +1-555-0192
          </p>
        </div>

        {/* Big SOS Button */}
        {!sosTriggered ? (
          <button
            onClick={initiateSOS}
            disabled={countdown !== null}
            className="w-full md:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm rounded-2xl shadow-2xl shadow-red-600/50 sos-pulse-ring flex items-center justify-center space-x-2 transition-all hover:scale-105 active:scale-95"
          >
            <ShieldAlert className="w-6 h-6 animate-bounce" />
            <span>TRIGGER EMERGENCY SOS NOW</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
            <CheckCircle className="w-4 h-4 animate-pulse" />
            <span>ALS AMBULANCE EN ROUTE • ETA 4.2 MINS</span>
          </div>
        )}
      </div>

      {/* Safety Countdown Modal */}
      {countdown !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 text-center max-w-sm w-full space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto text-2xl font-black animate-ping">
              {countdown}
            </div>
            <h3 className="text-lg font-bold text-white">Dispatching Emergency ALS Unit</h3>
            <p className="text-xs text-slate-400">Press Cancel within 3 seconds if triggered accidentally.</p>
            <button
              onClick={cancelSOS}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
            >
              Cancel SOS Trigger
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Tracking Map & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live GPS Tracking Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Live Emergency Radar & Arrival Polyline</span>
            </h3>
            <span className="text-[11px] text-slate-400">Real-time OpenStreetMap Provider</span>
          </div>

          <EmergencyMap height="450px" />
        </div>

        {/* Active Emergency Info & Assigned Driver */}
        <div className="space-y-4">
          
          <div className="glass-card p-5 rounded-2xl space-y-4 border border-blue-500/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Dispatched Ambulance Unit</h4>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">ALS ADVANCED</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl">
                🚑
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">AMB-ALS-901</h5>
                <p className="text-xs text-slate-400">Driver: Capt. Alex Vance</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Rating: ★ 4.95 (140+ Trips)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <div className="p-2.5 bg-slate-800/60 rounded-xl">
                <span className="text-slate-500 text-[10px] block">ETA to Pickup</span>
                <span className="font-extrabold text-blue-400 text-sm">4.2 Mins</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 rounded-xl">
                <span className="text-slate-500 text-[10px] block">Oxygen Level</span>
                <span className="font-extrabold text-emerald-400 text-sm">98.5 %</span>
              </div>
            </div>

            <a
              href="tel:+15550183"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all border border-slate-700"
            >
              <Phone className="w-4 h-4" />
              <span>Call Ambulance Driver Direct</span>
            </a>
          </div>

          {/* Destination Hospital Card */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Target Receiving Hospital</h4>
            <div>
              <h5 className="text-sm font-bold text-emerald-400">City General Emergency Trauma Center</h5>
              <p className="text-xs text-slate-400 mt-0.5">100 Lifeline Blvd, Central City</p>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-400">Reserved ICU Bed:</span>
              <span className="text-emerald-400 font-bold">Bed #4 Allocated</span>
            </div>
          </div>

        </div>

      </div>

      {/* Medical Records Vault & Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        <div className="glass-card p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Medical Records Vault</span>
            </h4>
            <button className="text-xs bg-blue-600/20 text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/30 hover:bg-blue-600/30">
              + Upload File
            </button>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-slate-800/50 rounded-xl flex items-center justify-between text-xs border border-slate-700/50">
              <div>
                <p className="font-bold text-slate-200">ECG Screening Report 2025</p>
                <p className="text-[10px] text-slate-400">Cardiology • PDF (1.2 MB)</p>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">Synced</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-xl flex items-center justify-between text-xs border border-slate-700/50">
              <div>
                <p className="font-bold text-slate-200">Blood Panel & Lipid Profile</p>
                <p className="text-[10px] text-slate-400">Lab Diagnostics • PDF (850 KB)</p>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">Synced</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Phone className="w-4 h-4 text-red-400" />
              <span>Emergency Contacts</span>
            </h4>
            <button className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-700">
              Edit Contacts
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-800/50 rounded-xl flex items-center justify-between border border-slate-700/50">
              <div>
                <p className="font-bold text-slate-200">Jane Doe (Spouse)</p>
                <p className="text-[10px] text-slate-400">+1-555-9988</p>
              </div>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-semibold">Primary</span>
            </div>
          </div>
        </div>

      </div>

      <AIChatbotWidget />
    </div>
  );
};
