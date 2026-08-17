import React, { useState } from 'react';
import { VitalsWaveform } from '../components/VitalsWaveform';
import { HeartPulse, Stethoscope, Save, FileText, User, ShieldAlert, CheckCircle2, History, AlertTriangle } from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const [treatmentNotes, setTreatmentNotes] = useState(
    "Patient presenting with acute chest pain. Pre-hospital telemetry indicates mild sinus tachycardia (104 bpm) with SpO2 at 95%. Prepared cath lab & IV heparin protocol upon arrival."
  );
  const [saved, setSaved] = useState(false);

  const handleSaveNotes = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Doctor Emergency Monitoring Portal</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold">DR. SARAH JENKINS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Specialization: <strong className="text-slate-200">Critical Care & Cardiology</strong> • Unit: <strong className="text-emerald-400">ER Trauma Bay 1</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-emerald-400" />
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Active Remote Telemetry Monitoring
          </span>
        </div>
      </div>

      {/* Critical Patient Banner */}
      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-xl">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Active Case: John Doe (Male, 42)</h3>
            <p className="text-xs text-slate-300">En Route via ALS Unit AMB-ALS-901 • ETA: <strong className="text-red-400">4.2 Mins</strong></p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="px-3 py-1 bg-red-600 text-white rounded-lg">P1 CRITICAL CODE RED</span>
          <span className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg">Blood Group O+</span>
        </div>
      </div>

      {/* Main Grid: Real-Time Telemetry & Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live IoT Vitals Stream Waveform */}
        <div className="lg:col-span-2 space-y-4">
          <VitalsWaveform heartRate={104} spo2={95} temp={37.1} bp="138 / 88" />
          
          {/* Clinical Treatment Notes Editor */}
          <div className="glass-card p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Doctor Treatment Notes & Orders</span>
              </h4>
              {saved && (
                <span className="text-[11px] text-emerald-400 font-bold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Notes Synced to EHR</span>
                </span>
              )}
            </div>

            <textarea
              value={treatmentNotes}
              onChange={(e) => setTreatmentNotes(e.target.value)}
              rows={4}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSaveNotes}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Treatment Instructions</span>
            </button>
          </div>
        </div>

        {/* Patient History & Allergies Panel */}
        <div className="space-y-4">
          
          <div className="glass-card p-5 rounded-2xl space-y-4 border border-blue-500/20">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-400" />
              <span>Patient Clinical Profile</span>
            </h4>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Known Allergies</span>
                <p className="text-red-400 font-bold bg-red-500/10 p-2 rounded-xl border border-red-500/20 mt-0.5">
                  Severe Penicillin Allergy
                </p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Chronic Conditions</span>
                <p className="text-amber-300 font-bold bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 mt-0.5">
                  Hypertension (Diagnosed 2022)
                </p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Emergency Contact</span>
                <p className="text-slate-200 font-medium mt-0.5">Jane Doe (Spouse) • +1-555-9988</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center space-x-2">
              <History className="w-4 h-4 text-emerald-400" />
              <span>Past Diagnostics</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-bold text-slate-200">ECG Screening 2025</p>
                <p className="text-[10px] text-slate-400">Normal sinus rhythm with mild ST depression</p>
              </div>
              <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
                <p className="font-bold text-slate-200">Lipid & Metabolic Panel</p>
                <p className="text-[10px] text-slate-400">Elevated cholesterol; HbA1c 5.8%</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
