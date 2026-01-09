
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const getTitle = () => {
    if (path === '/') return 'Automation Generator';
    if (path.startsWith('/chat')) return 'Advisor AI';
    if (path.startsWith('/analysis')) return 'Vision Extract';
    if (path.startsWith('/voice')) return 'Voice Lab';
    if (path.startsWith('/consultant')) return 'Live Architect';
    if (path.startsWith('/sandbox')) return 'Logic Sandbox';
    if (path.startsWith('/audit')) return 'Audit Hub';
    if (path.startsWith('/deployment')) return 'Deployment Hub';
    if (path.startsWith('/vault')) return 'Blueprint Vault';
    if (path.startsWith('/comparator')) return 'Benchmarker';
    if (path.startsWith('/terminal')) return 'API Terminal';
    if (path.startsWith('/profile')) return 'User Profile';
    return 'Architect Console';
  };

  const getSubtitle = () => {
    if (path === '/') return 'Synthesize production-grade automation blueprints.';
    if (path.startsWith('/chat')) return 'Fine-tuned Gemini intelligence for API strategy.';
    if (path.startsWith('/analysis')) return 'Reverse-engineer workflows from visual UI documentation.';
    if (path.startsWith('/voice')) return 'Generate high-fidelity audio instructions for procedures.';
    if (path.startsWith('/consultant')) return 'Low-latency native audio brainstorming session.';
    if (path.startsWith('/sandbox')) return 'Stress-test logical branches in a dry-run kernel.';
    if (path.startsWith('/audit')) return 'Security analysis and estimated monthly ROI / Cost.';
    if (path.startsWith('/deployment')) return 'Configure secrets and export production-ready assets.';
    return '';
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 shrink-0 z-10 sticky top-0">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          {getTitle()}
          <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Active</span>
        </h1>
        <p className="text-xs text-slate-500 font-semibold hidden sm:block uppercase tracking-widest mt-0.5 opacity-70">{getSubtitle()}</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
           <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] leading-none">Protocol v3.0</span>
           <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">Multi-Agent Synthesis Engine</span>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-inner group cursor-default">
           <div className="relative">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse-soft" />
             <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20" />
           </div>
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
