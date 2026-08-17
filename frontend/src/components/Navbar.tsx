import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import { Siren, Bell, User, LogOut, ShieldAlert, Cpu, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, setRole, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const roleOptions: { key: Role; label: string }[] = [
    { key: 'patient', label: 'Patient View' },
    { key: 'driver', label: 'Driver View' },
    { key: 'doctor', label: 'Doctor View' },
    { key: 'hospital_admin', label: 'Hospital Admin' },
    { key: 'super_admin', label: 'Super Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30 group-hover:scale-105 transition-transform">
            <Siren className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
              LifeLine <span className="text-blue-500 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">AI</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Smart Emergency System</p>
          </div>
        </Link>

        {/* Live Role Switcher (Crucial for testing all 5 role dashboards easily) */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <Cpu className="w-4 h-4 text-blue-400 ml-2" />
          <span className="text-xs font-semibold text-slate-400 mr-1">Switch Role:</span>
          {roleOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setRole(opt.key);
                navigate(`/${opt.key === 'patient' ? 'patient-dashboard' : opt.key + '-dashboard'}`);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                role === opt.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {opt.label.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Quick SOS Trigger Button */}
          <Link
            to="/patient-dashboard"
            className="hidden sm:flex items-center space-x-2 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>SOS EMERGENCY</span>
          </Link>

          {/* System Telemetry Status */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-medium">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Live Telemetry</span>
          </div>

          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Live System Alerts</h4>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-semibold">2 New</span>
                </div>
                <div className="space-y-3 mt-3">
                  <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs">
                    <p className="font-bold text-red-400">P1 Critical Alert Dispatched</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">Ambulance AMB-ALS-901 en route to Block 4 Metro Sq (ETA 4.5 mins)</p>
                  </div>
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs">
                    <p className="font-bold text-blue-400">Hospital Bed Reserved</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">City General Trauma ICU Bed #4 auto-allocated by AI</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-xs">
              {user?.full_name ? user.full_name[0] : 'U'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-200 truncate max-w-[120px]">{user?.full_name}</p>
              <p className="text-[10px] text-blue-400 capitalize">{role.replace('_', ' ')}</p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
