import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Zap, Server, Database, Globe, AlertCircle, RefreshCw, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const SystemHealth = () => {
  const [metrics, setMetrics] = useState({
    latency: '12ms',
    uptime: '99.99%',
    dbHealth: 'Healthy',
    activeUsers: 142,
    load: 18
  });

  useEffect(() => {
    const interval = setInterval(() => {
        setMetrics(prev => ({
            ...prev,
            latency: `${Math.floor(Math.random() * 5) + 10}ms`,
            activeUsers: prev.activeUsers + (Math.random() > 0.5 ? 1 : -1),
            load: Math.floor(Math.random() * 10) + 15
        }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 p-1">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2 text-emerald-500">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            System Resilience Monitor
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Real-time Infrastructure Performance
           </p>
        </div>
        <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                All Nodes Live
             </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <HealthCard icon={<Server size={18}/>} label="API Gateway" value={metrics.latency} status="Excellent" />
          <HealthCard icon={<Database size={18}/>} label="Persistence" value={metrics.dbHealth} status="Synced" />
          <HealthCard icon={<Globe size={18}/>} label="CDN Edge" value={metrics.uptime} status="Online" />
          <HealthCard icon={<Users size={18}/>} label="Active Users" value={metrics.activeUsers} status="Processing" />
      </div>

      <div className="glass-card p-8 border-white/5 bg-slate-500/5">
        <div className="flex justify-between items-center mb-8">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                <BarChart3 size={14}/> Compute Load (%)
            </h4>
            <span className="text-[10px] font-black text-emerald-500">{metrics.load}% Capacity</span>
        </div>
        <div className="flex items-end gap-1.5 h-32 px-2">
            {[...Array(40)].map((_, i) => {
                const h = Math.random() * 60 + 20;
                return (
                    <motion.div 
                        key={i}
                        animate={{ height: `${h}%` }}
                        className={`flex-1 rounded-t-[1px] ${h > 70 ? 'bg-amber-500' : 'bg-emerald-500/30'} transition-all duration-500`}
                    />
                );
            })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5 flex items-start gap-4">
              <ShieldCheck className="text-emerald-500" />
              <div>
                  <h4 className="text-sm font-black uppercase mb-1">Security Audit</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">No unauthorized access attempts in the last 24h. Firewall rules are up to date. SSL Certificate expires in 242 days.</p>
              </div>
          </div>
          <div className="glass-card p-6 border-white/5 flex items-start gap-4">
              <AlertCircle className="text-slate-500" />
              <div>
                  <h4 className="text-sm font-black uppercase mb-1">Maintenance Logs</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">System scheduled for minor edge-update on Mar 22, 02:00 AM. No downtime expected.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

const Users = ({ size, className }) => <Activity size={size} className={className} />;

const HealthCard = ({ icon, label, value, status }) => (
    <div className="glass-card p-4 border-white/5 bg-white/5 group hover:border-emerald-500/20 transition-all">
        <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover:text-emerald-500 transition-colors">
                {icon}
            </div>
            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">{status}</span>
        </div>
        <p className="text-[10px] font-black uppercase text-slate-500 tracking-tighter mb-1">{label}</p>
        <p className="text-lg font-black text-white">{value}</p>
    </div>
);

export default SystemHealth;
