
import React from 'react';
import { Card } from '../../components/ui/Card';
import { ShieldCheck, ShieldAlert, Lock, Fingerprint, Eye, Globe } from 'lucide-react';

const SecurityReportPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in">
      <div className="p-10 bg-emerald-50 border border-emerald-100 rounded-[3rem] flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-emerald-900 tracking-tight flex items-center gap-4">
            <ShieldCheck size={40} />
            Integrity Cleared
          </h2>
          <p className="text-sm font-bold text-emerald-700/60 uppercase tracking-widest">Global Security Compliance: Tier-1 Nominal</p>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-12 w-[1px] bg-emerald-200" />
          <div className="text-right">
            <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest">Last Scan</span>
            <span className="text-xs font-bold text-emerald-900">Just Now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card title="Logical Hardening" subtitle="Network Layer Protection">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 uppercase">SSL Termination</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Encrypted</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Fingerprint size={18} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 uppercase">MFA Protocol</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <Eye size={18} className="text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 uppercase">Log Masking</span>
              </div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Nominal</span>
            </div>
          </div>
        </Card>

        <Card title="Traffic Analysis" subtitle="Request Origin Integrity">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-slate-900 rounded-[2.5rem] text-white">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Globe size={24} className="text-indigo-400" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest">Global Relay</h4>
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">Status: Restricted to US-EAST-1</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Threat Vector Detection</h5>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-[5%] bg-emerald-500" />
              </div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3">0.05% Collision Probability Detected</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SecurityReportPage;
