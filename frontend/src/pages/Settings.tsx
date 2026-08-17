import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Cpu, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      
      <div className="glass-card p-6 rounded-3xl space-y-6 border border-slate-800">
        <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-blue-400" />
          <span>System Settings & Operational Toggles</span>
        </h2>

        <div className="space-y-4 text-xs">
          
          <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700/50">
            <div>
              <p className="font-bold text-white">AI Autonomous Ambulance Dispatch</p>
              <p className="text-slate-400 text-[11px]">Auto-select and notify nearest available ALS ambulance unit on P1 SOS</p>
            </div>
            <input
              type="checkbox"
              checked={autoDispatch}
              onChange={(e) => setAutoDispatch(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700/50">
            <div>
              <p className="font-bold text-white">SMS & Push Notification Gateway</p>
              <p className="text-slate-400 text-[11px]">Send instant SMS broadcasts to emergency contacts upon SOS trigger</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

        </div>

      </div>

    </div>
  );
};
