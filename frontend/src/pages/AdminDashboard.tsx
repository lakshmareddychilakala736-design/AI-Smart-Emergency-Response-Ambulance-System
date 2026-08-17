import React, { useState } from 'react';
import { StatsCard } from '../components/StatsCard';
import { Siren, Navigation, Building2, Users, Activity, ShieldCheck, Flame, Cpu, FileText } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'users' | 'demand' | 'audit'>('fleet');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Super Admin Operations Center</span>
            <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2.5 py-0.5 rounded-full font-bold">SYSTEM OVERVIEW</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Global emergency network control, AI dispatch analytics & fleet oversight.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            ALL AI SERVICES OPERATIONAL
          </span>
        </div>
      </div>

      {/* Top Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Ambulances" value="24 Units" subtitle="18 Available / 6 Busy" icon={Navigation} color="blue" />
        <StatsCard title="Active Emergencies" value="3 Incidents" subtitle="1 P1 Critical" icon={Siren} color="red" />
        <StatsCard title="Avg Response Time" value="6.8 Mins" subtitle="Target < 8.0 mins" icon={Activity} color="emerald" />
        <StatsCard title="Partner Hospitals" value="12 Centers" subtitle="84% ICU Beds Available" icon={Building2} color="amber" />
        <StatsCard title="Registered Users" value="1,420" subtitle="Patients, Drivers & Doctors" icon={Users} color="purple" />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'fleet' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Fleet Management
        </button>
        <button
          onClick={() => setActiveTab('demand')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'demand' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          AI Demand Forecasting
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          User Accounts
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'fleet' && (
        <div className="glass-card p-5 rounded-2xl overflow-x-auto space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">Active Ambulance Fleet Table</h3>
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 text-[10px] uppercase">
              <tr>
                <th className="p-3">Vehicle No</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Fuel</th>
                <th className="p-3">O₂ Level</th>
                <th className="p-3">GPS Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-3 font-bold text-white">AMB-ALS-901</td>
                <td className="p-3 text-blue-400 font-medium">ALS (Advanced)</td>
                <td className="p-3"><span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">BUSY (TRIP)</span></td>
                <td className="p-3 font-semibold text-slate-200">Capt. Alex Vance</td>
                <td className="p-3 text-emerald-400 font-bold">88%</td>
                <td className="p-3 text-blue-400 font-bold">98.5%</td>
                <td className="p-3 text-slate-400">(12.9680, 77.5890)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-white">AMB-BLS-402</td>
                <td className="p-3 text-amber-400 font-medium">BLS (Basic)</td>
                <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">AVAILABLE</span></td>
                <td className="p-3 font-semibold text-slate-200">David Miller</td>
                <td className="p-3 text-emerald-400 font-bold">95%</td>
                <td className="p-3 text-blue-400 font-bold">100%</td>
                <td className="p-3 text-slate-400">(12.9820, 77.6150)</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'demand' && (
        <div className="glass-card p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Flame className="w-4 h-4 text-red-400" />
            <span>AI Emergency Demand Spatial Hotspots (Next 24h)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-1">
              <span className="text-[10px] text-red-400 font-bold uppercase">High Risk Zone</span>
              <h4 className="font-bold text-white text-sm">Downtown Central Hub</h4>
              <p className="text-slate-300">Predicted Emergencies: <strong className="text-red-400">14 Incidents</strong></p>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
              <span className="text-[10px] text-amber-400 font-bold uppercase">Medium Risk Zone</span>
              <h4 className="font-bold text-white text-sm">Highway Junction North</h4>
              <p className="text-slate-300">Predicted Emergencies: <strong className="text-amber-400">9 Incidents</strong></p>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-1">
              <span className="text-[10px] text-red-400 font-bold uppercase">High Risk Zone</span>
              <h4 className="font-bold text-white text-sm">Industrial Corridor East</h4>
              <p className="text-slate-300">Predicted Emergencies: <strong className="text-red-400">11 Incidents</strong></p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="glass-card p-5 rounded-2xl space-y-3 text-xs text-slate-300">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">User Directory</h3>
          <div className="space-y-2">
            <div className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white">John Doe (patient@lifeline.com)</p>
                <p className="text-[10px] text-slate-400">Role: Patient • Contact: +1-555-0192</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Capt. Alex Vance (driver@lifeline.com)</p>
                <p className="text-[10px] text-slate-400">Role: Driver • Vehicle: AMB-ALS-901</p>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="glass-card p-5 rounded-2xl space-y-3 text-xs">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">System Audit Logs</h3>
          <div className="space-y-2 text-slate-300">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-[10px] text-slate-500 block">2026-08-06 14:35:10 UTC</span>
              <p className="font-bold text-white">SOS_DISPATCH_TRIGGERED</p>
              <p className="text-slate-400 text-[11px]">Patient John Doe dispatched AMB-ALS-901 to Block 4 Metro Sq</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
