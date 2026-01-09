import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#FDFDFF] text-gray-900 overflow-hidden selection:bg-indigo-100 dark:bg-slate-950 dark:text-gray-100 transition-colors duration-500">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 custom-scrollbar bg-slate-50/30 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto h-full relative">
            <Outlet />
          </div>
        </main>
        <footer className="px-10 py-3 border-t border-gray-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] hidden sm:flex shrink-0">
          <div className="flex items-center gap-4">
            <span>AutoArchitect Enterprise v2.6</span>
            <div className="h-3 w-[1px] bg-gray-200 dark:bg-gray-700" />
            <span className="text-indigo-500">Gemini 3 Pro Cluster</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Engine: Nominal
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
