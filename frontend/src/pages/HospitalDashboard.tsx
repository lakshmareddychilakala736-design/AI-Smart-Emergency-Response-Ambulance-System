import React, { useState } from 'react';
import { EmergencyMap } from '../components/EmergencyMap';
import { StatsCard } from '../components/StatsCard';
import { Building2, Bed, UserPlus, Siren, CheckCircle2, AlertTriangle, Activity, ArrowUpRight } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
  const [icuBeds, setIcuBeds] = useState(6);
  const [generalBeds, setGeneralBeds] = useState(24);

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>City General Emergency Trauma Command</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">LEVEL 1 TRAUMA</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Hospital Admin: <strong className="text-slate-200">Marcus Aurelius</strong> • Emergency Contact: +1-800-555-9111
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">ER Capacity:</span>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            OPERATIONAL (84% Occupancy)
          </span>
        </div>
      </div>

      {/* Bed Management Stats & Quick Adjusters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-4 rounded-2xl border border-blue-500/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ICU Beds Available</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-blue-400">{icuBeds}</span>
              <span className="text-xs text-slate-500">/ 15 Total</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <button onClick={() => setIcuBeds((b) => Math.min(15, b + 1))} className="px-2 py-0.5 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold rounded">
              +
            </button>
            <button onClick={() => setIcuBeds((b) => Math.max(0, b - 1))} className="px-2 py-0.5 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold rounded">
              -
            </button>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">General Beds Available</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-400">{generalBeds}</span>
              <span className="text-xs text-slate-500">/ 60 Total</span>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <button onClick={() => setGeneralBeds((b) => Math.min(60, b + 1))} className="px-2 py-0.5 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold rounded">
              +
            </button>
            <button onClick={() => setGeneralBeds((b) => Math.max(0, b - 1))} className="px-2 py-0.5 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-bold rounded">
              -
            </button>
          </div>
        </div>

        <StatsCard
          title="Incoming Ambulances"
          value="2 En Route"
          subtitle="ETA < 6 minutes"
          icon={Siren}
          color="red"
        />

        <StatsCard
          title="On-Duty Doctors"
          value="8 Doctors"
          subtitle="Cardiology & Trauma"
          icon={UserPlus}
          color="purple"
        />

      </div>

      {/* Main Grid: Incoming Dispatch Tracking & Triage Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incoming Ambulance Tracking Radar Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Incoming Inbound Ambulance Telemetry Tracker</span>
            </h3>
            <span className="text-[11px] text-slate-400">Live Hospital Perimeter Radar</span>
          </div>

          <EmergencyMap height="420px" />
        </div>

        {/* ER Patient Admission Queue */}
        <div className="glass-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Incoming ER Patients Queue</span>
              <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">2 Active</span>
            </h4>

            <div className="space-y-3 mt-3">
              
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-red-400">P1 CRITICAL CODE RED</span>
                  <span className="text-[10px] text-slate-400">ETA 4.2 Mins</span>
                </div>
                <p className="font-bold text-white">John Doe (Male, 42)</p>
                <p className="text-[11px] text-slate-300">Acute chest pain • High ST elevation</p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-blue-400 font-semibold">Assigned: Dr. Sarah Jenkins</span>
                  <span className="text-emerald-400 font-bold">ICU Bed #4</span>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-400">P2 URGENT PRIORITY</span>
                  <span className="text-[10px] text-slate-400">ETA 8.5 Mins</span>
                </div>
                <p className="font-bold text-white">Robert Smith (Male, 28)</p>
                <p className="text-[11px] text-slate-300">Fractured radius & laceration</p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-blue-400 font-semibold">Assigned: Dr. Mike Ross</span>
                  <span className="text-emerald-400 font-bold">Gen Bed #12</span>
                </div>
              </div>

            </div>
          </div>

          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all mt-4">
            + Admit Walk-In Patient
          </button>
        </div>

      </div>

    </div>
  );
};
