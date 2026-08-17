import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import { Siren, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('patient@lifeline.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<Role>('patient');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role, 'Demo User');
    navigate(`/${role === 'patient' ? 'patient-dashboard' : role + '-dashboard'}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl space-y-6 border border-slate-800 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center mx-auto">
            <Siren className="w-7 h-7 animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign In to LifeLine AI</h2>
          <p className="text-xs text-slate-400">Smart Emergency Response Platform Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Select Role Portal</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-medium focus:border-blue-500"
            >
              <option value="patient">Patient Portal</option>
              <option value="driver">Ambulance Driver</option>
              <option value="doctor">Emergency Doctor</option>
              <option value="hospital_admin">Hospital Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-white focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-9 pr-3 text-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <Link to="/forgot-password" className="text-blue-400 hover:underline">Forgot password?</Link>
            <span className="text-slate-500">JWT OAuth 2.0</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 transition-all"
          >
            <span>SIGN IN TO DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Don't have an account? <Link to="/register" className="text-blue-400 font-semibold hover:underline">Register now</Link>
        </div>

      </div>
    </div>
  );
};
