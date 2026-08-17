import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Phone, Heart, Award } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center text-2xl font-black">
            {user?.full_name[0] || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">{user?.full_name}</h2>
            <p className="text-xs text-blue-400 font-semibold uppercase mt-0.5">{role.replace('_', ' ')} Account</p>
            <p className="text-xs text-slate-400 mt-1">ID: #USR-2026-9901 • Status: Verified</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-800/60 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Email Address</span>
            </span>
            <p className="font-bold text-white">{user?.email}</p>
          </div>

          <div className="p-3.5 bg-slate-800/60 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5" />
              <span>Mobile Contact</span>
            </span>
            <p className="font-bold text-white">{user?.phone || '+1-555-0192'}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
