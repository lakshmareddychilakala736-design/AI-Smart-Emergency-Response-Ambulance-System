import React from 'react';
import { Link } from 'react-router-dom';
import { Siren, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center space-y-4 border border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center mx-auto text-2xl font-bold">
          404
        </div>
        <h2 className="text-2xl font-extrabold text-white">Emergency Page Not Found</h2>
        <p className="text-xs text-slate-400">The requested URL does not exist or has been relocated.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Safety Home</span>
        </Link>
      </div>
    </div>
  );
};
