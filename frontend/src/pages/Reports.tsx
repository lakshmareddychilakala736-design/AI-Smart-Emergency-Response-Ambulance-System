import React from 'react';
import { FileText, Download, Filter } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div>
          <h1 className="text-xl font-extrabold text-white">Emergency Response Compliance Reports</h1>
          <p className="text-xs text-slate-400 mt-1">Exportable PDF & CSV audit reports for healthcare governance</p>
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl space-y-3 text-xs">
        <div className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between border border-slate-700/50">
          <div>
            <p className="font-bold text-white">Monthly Ambulance Response Time Audit (July 2026)</p>
            <p className="text-[10px] text-slate-400">PDF Document • Generated Aug 1, 2026</p>
          </div>
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center space-x-1">
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};
