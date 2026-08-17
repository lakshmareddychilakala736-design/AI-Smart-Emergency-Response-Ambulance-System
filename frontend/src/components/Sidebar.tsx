import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Siren, Navigation, HeartPulse, Building2, 
  ShieldCheck, BarChart3, Settings, User, FileText
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role } = useAuth();

  const navItems = [
    { label: 'Patient Dashboard', path: '/patient-dashboard', icon: Siren, roles: ['patient'] },
    { label: 'Driver Dispatch', path: '/driver-dashboard', icon: Navigation, roles: ['driver'] },
    { label: 'Doctor Monitoring', path: '/doctor-dashboard', icon: HeartPulse, roles: ['doctor'] },
    { label: 'Hospital Command', path: '/hospital-dashboard', icon: Building2, roles: ['hospital_admin'] },
    { label: 'Super Admin', path: '/admin-dashboard', icon: ShieldCheck, roles: ['super_admin'] },
    { label: 'Emergency Tracking', path: '/emergency-tracking', icon: Siren, roles: ['patient', 'driver', 'doctor', 'hospital_admin', 'super_admin'] },
    { label: 'Analytics & Reports', path: '/analytics', icon: BarChart3, roles: ['super_admin', 'hospital_admin', 'doctor'] },
    { label: 'Profile Vault', path: '/profile', icon: User, roles: ['patient', 'driver', 'doctor', 'hospital_admin', 'super_admin'] },
    { label: 'System Settings', path: '/settings', icon: Settings, roles: ['super_admin', 'hospital_admin'] },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900/60 backdrop-blur-md border-r border-slate-800 p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Main Portal
          </h3>
          <nav className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-md shadow-blue-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* AI Operational Metrics Widget */}
        <div className="p-3.5 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Avg Response</span>
            <span className="text-emerald-400 font-bold">6.8 Mins</span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[82%]" />
          </div>
          <p className="text-[10px] text-slate-500">Target response &lt; 8 mins (94.2% met)</p>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        LifeLine AI Platform v2.6
      </div>
    </aside>
  );
};
