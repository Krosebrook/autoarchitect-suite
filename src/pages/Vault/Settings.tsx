
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Database, Shield, HardDrive, RefreshCw, Trash2 } from 'lucide-react';

const VaultSettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in">
      <Card title="Vault Storage Protocols" subtitle="Manage persistent logic artifacts">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <Database className="text-indigo-600" size={20} />
                <h4 className="text-sm font-black uppercase tracking-widest">Local Retention</h4>
              </div>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                Blueprints are stored in high-security IndexedDB buffers for offline-first resilience.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Status: Nominal</span>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Optimize DB</button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-600" size={20} />
                <h4 className="text-sm font-black uppercase tracking-widest">Logic Encryption</h4>
              </div>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                All stored artifacts are hashed using AES-256 equivalent browser-level protocols.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Status: Active</span>
                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Rotate Keys</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">Maintenance Operations</h5>
            <div className="space-y-3">
              <button className="w-full p-5 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <RefreshCw size={18} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">Synchronize Cloud Backup</span>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase">Not Linked</span>
              </button>
              <button className="w-full p-5 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <HardDrive size={18} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700">Clear Logic Cache</span>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">1.4 MB</span>
              </button>
              <button className="w-full p-5 flex items-center justify-between bg-red-50 border border-red-100 rounded-2xl hover:bg-red-100 transition-all text-red-600">
                <div className="flex items-center gap-4">
                  <Trash2 size={18} />
                  <span className="text-sm font-bold">Purge Vault Manifest</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Danger Zone</span>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VaultSettingsPage;
