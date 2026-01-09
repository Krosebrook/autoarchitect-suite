
import React from 'react';
import { Card } from '../../components/ui/Card';
import { GitPullRequest, GitMerge, Terminal, Activity, CheckCircle2, Play } from 'lucide-react';

const PipelinesPage: React.FC = () => {
  const PIPELINES = [
    { id: 'p1', name: 'Production Sync', branch: 'main', status: 'success', lastRun: '2m ago' },
    { id: 'p2', name: 'Staging Deploy', branch: 'develop', status: 'active', lastRun: 'Just now' },
    { id: 'p3', name: 'Security Audit', branch: 'main', status: 'pending', lastRun: '1h ago' },
  ];

  return (
    <div className="space-y-10 animate-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <GitPullRequest className="text-indigo-600" />
          CI/CD Orchestration
        </h2>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">
          <Play size={14} fill="currentColor" /> Trigger All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {PIPELINES.map((p) => (
            <Card key={p.id} className="group hover:scale-[1.01]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    p.status === 'success' ? 'bg-emerald-50 text-emerald-600' : p.status === 'active' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <GitMerge size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest">{p.name}</h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Terminal size={12} /> {p.branch}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Activity size={12} /> {p.lastRun}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border ${
                    p.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : p.status === 'active' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 animate-pulse' : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {p.status}
                  </div>
                  <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all opacity-0 group-hover:opacity-100">
                    <Play size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-4">
          <Card title="Orchestrator Node" subtitle="Worker Telemetry">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Workers</span>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">04 / 12</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-indigo-500 rounded-full" />
              </div>
              <div className="p-6 bg-[#0d0e12] rounded-[2rem] border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  <CheckCircle2 size={14} /> System Healthy
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                  Neural link established with AWS Staging Cluster. Latency: 14ms.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PipelinesPage;
