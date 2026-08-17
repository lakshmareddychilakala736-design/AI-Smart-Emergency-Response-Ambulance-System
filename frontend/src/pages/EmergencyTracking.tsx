import React from 'react';
import { EmergencyMap } from '../components/EmergencyMap';
import { Siren, Clock, Navigation, Phone, ShieldCheck } from 'lucide-react';

export const EmergencyTracking: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Live Dispatch Tracking</span>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold animate-pulse">
              CODE RED P1 CRITICAL
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Incident ID: <strong className="text-slate-200">#EMG-2026-881</strong> • Patient: <strong className="text-white">John Doe</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl text-xs font-bold">
          <Clock className="w-4 h-4" />
          <span>ESTIMATED ARRIVAL: 4.2 MINS</span>
        </div>
      </div>

      <EmergencyMap height="500px" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Ambulance Unit</span>
          <h4 className="font-bold text-white text-sm">AMB-ALS-901 (ALS)</h4>
          <p className="text-slate-400">Driver: Capt. Alex Vance</p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Pickup Address</span>
          <h4 className="font-bold text-white text-sm">Block 4, Metro Square</h4>
          <p className="text-slate-400">Central Avenue Plaza</p>
        </div>

        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Destination Hospital</span>
          <h4 className="font-bold text-emerald-400 text-sm">City General Trauma Center</h4>
          <p className="text-slate-400">ICU Bed #4 Auto-Allocated</p>
        </div>
      </div>

    </div>
  );
};
