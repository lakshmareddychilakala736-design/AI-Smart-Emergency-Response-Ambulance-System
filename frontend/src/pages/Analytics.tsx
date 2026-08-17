import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Clock, Activity } from 'lucide-react';

const dailyEmergenciesData = [
  { day: 'Mon', count: 42, avgResponse: 7.2 },
  { day: 'Tue', count: 38, avgResponse: 6.8 },
  { day: 'Wed', count: 51, avgResponse: 6.5 },
  { day: 'Thu', count: 47, avgResponse: 6.9 },
  { day: 'Fri', count: 62, avgResponse: 7.4 },
  { day: 'Sat', count: 75, avgResponse: 8.1 },
  { day: 'Sun', count: 58, avgResponse: 7.0 },
];

const categoryData = [
  { name: 'Cardiac / Stroke', value: 38, color: '#ef4444' },
  { name: 'Road Accidents', value: 27, color: '#f59e0b' },
  { name: 'Respiratory / Asthma', value: 18, color: '#3b82f6' },
  { name: 'Trauma / Falls', value: 17, color: '#10b981' },
];

export const Analytics: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center space-x-2">
            <span>Enterprise System Analytics</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full font-bold">MONTHLY REPORT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Historical response times, emergency distribution & fleet efficiency metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <TrendingUp className="w-4 h-4" />
          <span>Response speed improved by 18.4% YoY</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Emergencies & Response Time Bar Chart */}
        <div className="glass-card p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Weekly Emergency Incidents & Average Response Time</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyEmergenciesData}>
                <XAxis dataKey="day" stroke="#475569" fontSize={11} />
                <YAxis stroke="#475569" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Emergencies" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emergency Categories Pie Breakdown */}
        <div className="glass-card p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
            <Activity className="w-4 h-4 text-red-400" />
            <span>Emergency Incident Type Breakdown</span>
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
