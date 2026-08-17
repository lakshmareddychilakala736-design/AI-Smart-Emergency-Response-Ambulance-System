import React, { useState } from 'react';
import { EmergencyMap } from '../components/EmergencyMap';
import { Navigation, CheckCircle2, ShieldAlert, Clock, MapPin, Gauge, Fuel, Zap, AlertCircle } from 'lucide-react';

export const DriverDashboard: React.FC = () => {
  const [tripStatus, setTripStatus] = useState<'dispatched' | 'en_route_patient' | 'on_site' | 'transporting' | 'arrived_hospital' | 'completed'>('en_route_patient');
  const [showDispatchModal, setShowDispatchModal] = useState(false);

  const handleStatusChange = (newStatus: any) => {
    setTripStatus(newStatus);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Driver Status Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Ambulance Driver Command</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold">VEHICLE: AMB-ALS-901</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Driver: <strong className="text-slate-200">Capt. Alex Vance</strong> • Status: <strong className="text-emerald-400">On Duty (Active Emergency)</strong>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <Fuel className="w-4 h-4 text-amber-400" />
            <span>Fuel: <strong>88%</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-slate-300">
            <Gauge className="w-4 h-4 text-blue-400" />
            <span>O₂ Level: <strong>98.5%</strong></span>
          </div>
        </div>
      </div>

      {/* Dispatch Action Bar & Status Progression Workflow */}
      <div className="glass-card p-4 rounded-2xl border border-blue-500/30 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Trip Lifecycle Progression:</span>
          <span className="text-xs font-extrabold text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Current Stage: {tripStatus.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Step Progression Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          <button
            onClick={() => handleStatusChange('en_route_patient')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tripStatus === 'en_route_patient'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            1. En Route to Patient
          </button>
          <button
            onClick={() => handleStatusChange('on_site')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tripStatus === 'on_site'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            2. On Site (Pickup)
          </button>
          <button
            onClick={() => handleStatusChange('transporting')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tripStatus === 'transporting'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 animate-pulse'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            3. Transporting
          </button>
          <button
            onClick={() => handleStatusChange('arrived_hospital')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tripStatus === 'arrived_hospital'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            4. Arrived ER
          </button>
          <button
            onClick={() => handleStatusChange('completed')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tripStatus === 'completed'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            5. Trip Completed
          </button>
        </div>
      </div>

      {/* Main Grid: Navigation Map & AI Route Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Live Turn-By-Turn GPS Route Navigation</span>
            </h3>
            <span className="text-[11px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/20">
              AI Route Optimization Active
            </span>
          </div>

          <EmergencyMap height="450px" />
        </div>

        {/* Dispatch Target & Route Instructions */}
        <div className="space-y-4">
          
          <div className="glass-card p-5 rounded-2xl space-y-4 border border-red-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-xs font-extrabold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                <span>P1 Critical Emergency Pickup</span>
              </h4>
              <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">CODE RED</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Patient Name</span>
                <span className="text-sm font-bold text-white">John Doe (Age 42, Male)</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Pickup Location</span>
                <p className="text-slate-200 font-medium">Block 4, Metro Square, Central Avenue</p>
                <p className="text-[11px] text-blue-400 font-semibold mt-0.5">GPS: (12.9716, 77.5946)</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Symptom Summary</span>
                <p className="text-amber-300 font-medium bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                  Acute chest pain radiating to left arm. Shortness of breath reported.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-800/80 rounded-xl">
                <span className="text-slate-400 text-[10px] block">Distance</span>
                <span className="font-extrabold text-white text-sm">2.8 km</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-xl">
                <span className="text-slate-400 text-[10px] block">Estimated Arrival</span>
                <span className="font-extrabold text-blue-400 text-sm">4.2 Mins</span>
              </div>
            </div>
          </div>

          {/* Receiving Hospital Confirmation */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Assigned ER Hospital</h4>
            <div>
              <h5 className="text-sm font-bold text-emerald-400">City General Emergency Trauma Center</h5>
              <p className="text-xs text-slate-400">Distance from pickup: 1.4 km</p>
            </div>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] rounded-xl font-medium">
              ✓ ICU Bed #4 pre-reserved by System
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
