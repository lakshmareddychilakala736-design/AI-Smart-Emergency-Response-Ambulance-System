import React from 'react';
import { Link } from 'react-router-dom';
import { Siren, ShieldAlert, Cpu, HeartPulse, Navigation, Building2, ChevronRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600/20 text-red-500 rounded-xl border border-red-500/30">
              <Siren className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              LifeLine <span className="text-blue-500">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-blue-400 transition-colors">AI Dispatch</a>
            <a href="#roles" className="hover:text-blue-400 transition-colors">Portals</a>
            <a href="#stats" className="hover:text-blue-400 transition-colors">Live Impact</a>
            <a href="#tech" className="hover:text-blue-400 transition-colors">Tech Stack</a>
          </div>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/patient-dashboard" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Zap className="w-4 h-4" />
            <span>AI-Driven Emergency Response Engine • 42% Faster Arrival</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Saving Lives with <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">Real-Time AI Telemetry</span> & Smart Ambulance Dispatch
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            An intelligent emergency response network connecting Patients, ALS Ambulances, Hospital ICUs, Doctors, and Dispatch Command through zero-latency GPS tracking and predictive AI algorithms.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/patient-dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white text-sm font-extrabold rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <ShieldAlert className="w-5 h-5 animate-bounce" />
              <span>TEST EMERGENCY SOS NOW</span>
            </Link>
            <Link
              to="/admin-dashboard"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 text-sm font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all"
            >
              <span>Explore Admin Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Metrics Counter */}
          <div id="stats" className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-extrabold text-white">6.8 Mins</h3>
              <p className="text-xs text-slate-400 mt-1">Avg Ambulance Response Time</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-extrabold text-emerald-400">96.4%</h3>
              <p className="text-xs text-slate-400 mt-1">AI Severity Prediction Accuracy</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-extrabold text-blue-400">100%</h3>
              <p className="text-xs text-slate-400 mt-1">Live ICU Bed Visibility</p>
            </div>
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-extrabold text-purple-400">&lt; 1.2s</h3>
              <p className="text-xs text-slate-400 mt-1">IoT Vitals Stream Latency</p>
            </div>
          </div>

        </div>
      </section>

      {/* Role Dashboards Showcase Section */}
      <section id="roles" className="py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">5 Dedicated Enterprise Dashboards</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">Custom tailored user interfaces for every stakeholder in the emergency lifecycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            <Link to="/patient-dashboard" className="glass-card glass-card-hover p-5 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <div className="p-3 bg-red-500/10 text-red-500 rounded-xl w-fit mb-3">
                  <Siren className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Patient Portal</h4>
                <p className="text-xs text-slate-400 mt-1">One-click SOS, live tracking radar, AI chatbot & medical vault.</p>
              </div>
              <span className="text-xs font-semibold text-red-400 flex items-center space-x-1 mt-4">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link to="/driver-dashboard" className="glass-card glass-card-hover p-5 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit mb-3">
                  <Navigation className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Driver Portal</h4>
                <p className="text-xs text-slate-400 mt-1">Instant dispatch alert, turn-by-turn turn navigation & route optimization.</p>
              </div>
              <span className="text-xs font-semibold text-blue-400 flex items-center space-x-1 mt-4">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link to="/doctor-dashboard" className="glass-card glass-card-hover p-5 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit mb-3">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Doctor Portal</h4>
                <p className="text-xs text-slate-400 mt-1">Live IoT patient vitals streaming, ECG waveform & medical history.</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1 mt-4">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link to="/hospital-dashboard" className="glass-card glass-card-hover p-5 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Hospital Command</h4>
                <p className="text-xs text-slate-400 mt-1">ICU bed management, incoming ambulance queue & doctor assignment.</p>
              </div>
              <span className="text-xs font-semibold text-amber-400 flex items-center space-x-1 mt-4">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link to="/admin-dashboard" className="glass-card glass-card-hover p-5 rounded-2xl text-left flex flex-col justify-between">
              <div>
                <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl w-fit mb-3">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Super Admin</h4>
                <p className="text-xs text-slate-400 mt-1">Fleet control, demand forecasting heatmap, system audit logs.</p>
              </div>
              <span className="text-xs font-semibold text-purple-400 flex items-center space-x-1 mt-4">
                <span>View Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 AI Smart Emergency Response & Ambulance System. All Rights Reserved.</p>
      </footer>

    </div>
  );
};
