
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Workflow, 
  MessageCircle, 
  Eye, 
  Mic2, 
  Layers,
  Radio,
  FlaskConical,
  ChevronRight,
  ShieldAlert,
  Rocket,
  Library,
  Scale,
  Terminal,
  UserCircle
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Blueprint Gen', icon: Workflow, color: 'text-blue-500' },
    { path: '/vault', label: 'Blueprint Vault', icon: Library, color: 'text-indigo-600' },
    { path: '/comparator', label: 'Benchmarker', icon: Scale, color: 'text-emerald-600' },
    { path: '/terminal', label: 'API Terminal', icon: Terminal, color: 'text-slate-700' },
    { path: '/audit', label: 'Audit Hub', icon: ShieldAlert, color: 'text-orange-500' },
    { path: '/sandbox', label: 'Logic Sandbox', icon: FlaskConical, color: 'text-pink-500' },
    { path: '/deployment', label: 'Deploy & Export', icon: Rocket, color: 'text-indigo-600' },
    { path: '/consultant', label: 'Live Architect', icon: Radio, color: 'text-indigo-500' },
    { path: '/chat', label: 'Advisor AI', icon: MessageCircle, color: 'text-purple-500' },
    { path: '/analysis', label: 'Vision Extract', icon: Eye, color: 'text-emerald-500' },
    { path: '/voice', label: 'Voice Lab', icon: Mic2, color: 'text-orange-500' },
    { path: '/profile', label: 'User Profile', icon: UserCircle, color: 'text-slate-500' },
  ];

  return (
    <aside className="w-20 lg:w-72 bg-white border-r border-slate-100 flex flex-col h-full z-20 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.02)]">
      <div className="p-8 flex items-center gap-4">
        <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-100 text-white transform hover:rotate-6 transition-transform">
          <Layers size={22} strokeWidth={2.5} />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <h2 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">AutoArchitect</h2>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1 block">Pro Suite 2.6</span>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `w-full group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 relative ${
                isActive 
                  ? 'bg-indigo-50/80 text-indigo-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {({ isActive }) => (
                <>
                  <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <Icon size={20} className={isActive ? item.color : 'text-slate-400 group-hover:text-slate-600'} />
                  </div>
                  <span className={`hidden lg:block font-bold text-sm ${isActive ? 'translate-x-1' : ''} transition-transform`}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <div className="hidden lg:block ml-auto animate-in-right">
                       <ChevronRight size={14} className="text-indigo-400" />
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-indigo-600 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-slate-50/50 rounded-3xl p-5 hidden lg:block border border-slate-100/50 hover:bg-white transition-colors">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Architect Pulse</p>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[85%] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
            <span className="text-[10px] font-bold text-slate-600">85% Capacity</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
