import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { Heart, Activity, Thermometer, Gauge } from 'lucide-react';

interface VitalsWaveformProps {
  heartRate?: number;
  spo2?: number;
  temp?: number;
  bp?: string;
}

export const VitalsWaveform: React.FC<VitalsWaveformProps> = ({
  heartRate = 104,
  spo2 = 95,
  temp = 37.1,
  bp = "138 / 88"
}) => {
  const [data, setData] = useState<{ time: string; hr: number; spo2: number }[]>([]);

  useEffect(() => {
    // Generate initial live telemetry curve
    const initialData = Array.from({ length: 15 }, (_, i) => ({
      time: `${i * 2}s`,
      hr: heartRate + Math.floor(Math.sin(i) * 6),
      spo2: Math.min(100, spo2 + Math.floor(Math.cos(i) * 2))
    }));
    setData(initialData);

    // Live ECG pulse tick interval
    const timer = setInterval(() => {
      setData((prev) => {
        const nextTime = `${(prev.length * 2) % 60}s`;
        const newPoint = {
          time: nextTime,
          hr: heartRate + Math.floor(Math.random() * 8 - 4),
          spo2: Math.min(100, Math.max(88, spo2 + Math.floor(Math.random() * 3 - 1)))
        };
        return [...prev.slice(1), newPoint];
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [heartRate, spo2]);

  return (
    <div className="space-y-4">
      {/* Vital Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="p-3.5 bg-slate-900/80 border border-red-500/30 rounded-2xl flex items-center space-x-3 shadow-lg shadow-red-500/5">
          <div className="p-2.5 bg-red-500/20 text-red-500 rounded-xl animate-pulse">
            <Heart className="w-5 h-5 fill-red-500" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Heart Rate</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-white">{data[data.length - 1]?.hr || heartRate}</span>
              <span className="text-[10px] text-slate-400 font-medium">BPM</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-blue-500/30 rounded-2xl flex items-center space-x-3 shadow-lg shadow-blue-500/5">
          <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">SpO₂ Blood Oxygen</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-white">{data[data.length - 1]?.spo2 || spo2}</span>
              <span className="text-[10px] text-slate-400 font-medium">%</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-amber-500/30 rounded-2xl flex items-center space-x-3 shadow-lg shadow-amber-500/5">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Body Temp</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-xl font-extrabold text-white">{temp}</span>
              <span className="text-[10px] text-slate-400 font-medium">°C</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/80 border border-emerald-500/30 rounded-2xl flex items-center space-x-3 shadow-lg shadow-emerald-500/5">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Blood Pressure</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-lg font-extrabold text-white">{bp}</span>
              <span className="text-[10px] text-slate-400 font-medium">mmHg</span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Waveform Chart */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl relative">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Live Cardiac Telemetry ECG Waveform</span>
          </h4>
          <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold">
            P1 CRITICAL MONITORING
          </span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
              <YAxis domain={[60, 160]} stroke="#475569" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                itemStyle={{ color: '#ef4444' }}
              />
              <Line type="monotone" dataKey="hr" stroke="#ef4444" strokeWidth={2.5} dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="spo2" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
