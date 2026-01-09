
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Layout, Zap, Database, Mail, Globe, ShoppingCart, MessageSquare, Bot } from 'lucide-react';

const TEMPLATES = [
  { id: 't1', name: 'CRM Sync', icon: Database, color: 'text-blue-500', desc: 'Sync leads between multiple data sources.' },
  { id: 't2', name: 'AI Auto-Reply', icon: MessageSquare, color: 'text-purple-500', desc: 'Automated email response using LLMs.' },
  { id: 't3', name: 'Inventory Alert', icon: ShoppingCart, color: 'text-orange-500', desc: 'Monitor stock levels and notify Slack.' },
  { id: 't4', name: 'Lead Enrichment', icon: Bot, color: 'text-emerald-500', desc: 'Scrape web data to enrich lead profiles.' },
  { id: 't5', name: 'Web Traffic Hook', icon: Globe, color: 'text-indigo-500', desc: 'Capture webhooks and process events.' },
  { id: 't6', name: 'Email Dispatcher', icon: Mail, color: 'text-rose-500', desc: 'Bulk dispatch via SMTP or SendGrid.' },
];

const TemplatesPage: React.FC = () => {
  return (
    <div className="space-y-10 animate-in">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Layout className="text-indigo-600" />
          Logic Blueprints
        </h2>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm">
          {TEMPLATES.length} Pre-built Prototypes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((t) => (
          <Card key={t.id} title={t.name} headerAction={<Zap size={16} className={t.color} />}>
            <div className="space-y-6">
              <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${t.color}`}>
                <t.icon size={28} />
              </div>
              <p className="text-xs text-slate-500 font-bold leading-relaxed">{t.desc}</p>
              <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                Use Prototype
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
