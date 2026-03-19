import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, Zap, Droplets, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

const SocietyAnalytics = () => {
  return (
    <div className="space-y-12">
      <div>
         <h3 className="text-xl font-bold flex items-center gap-2 text-rose-500">
          <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
          Financial & Resource Analytics
         </h3>
         <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
           Predictive insights for committee decision making
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnalyticCard label="Projected Maintenance" value="₹12.4L" trend="+5%" type="up" color="rose" />
          <AnalyticCard label="Ad Revenue Yield" value="₹42K" trend="+18%" type="up" color="emerald" />
          <AnalyticCard label="Water Usage Rate" value="14k L/d" trend="-12%" type="down" color="emerald" />
          <AnalyticCard label="Resident Satisfaction" value="4.8/5" trend="+0.2" type="up" color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card p-8 border-white/5 bg-slate-500/5">
              <div className="flex justify-between items-center mb-12">
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">6-Month Revenue Forecast</h4>
                  <div className="flex gap-4">
                      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-white"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Ad Share</div>
                      <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-white"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Maintenance</div>
                  </div>
              </div>
              <div className="flex items-end gap-4 h-48 px-4">
                  {[30, 45, 40, 60, 55, 80].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex flex-col-reverse h-full rounded-t-lg overflow-hidden border border-white/5">
                              <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} className="bg-blue-500/60 w-full" />
                              <motion.div initial={{ height: 0 }} animate={{ height: `${h/2}%` }} className="bg-emerald-400 w-full" />
                          </div>
                          <span className="text-[8px] font-black uppercase text-slate-500">{['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'][i]}</span>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <div className="glass-card p-6 border-white/5 bg-white/5">
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6">Expense Distribution</h4>
                  <div className="space-y-4">
                      <DistributionItem label="Security" percent={45} color="bg-rose-500" />
                      <DistributionItem label="Cleaning" percent={25} color="bg-emerald-500" />
                      <DistributionItem label="Electricity" percent={20} color="bg-amber-500" />
                      <DistributionItem label="Repairs" percent={10} color="bg-blue-500" />
                  </div>
              </div>
              <div className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                  <h4 className="text-xs font-black uppercase mb-2">AI Sustainability Tip</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Transitioning Tower A corridor lights to 15W Motion-LEDs will reduce common area bill by <span className="text-emerald-400 font-bold">14% (₹2,100/mo)</span>.</p>
              </div>
          </div>
      </div>
    </div>
  );
};

const AnalyticCard = ({ label, value, trend, type, color }) => (
    <div className="glass-card p-6 border-white/5 bg-white/5 group hover:border-emerald-500/20 transition-all">
        <p className="text-[10px] font-black uppercase text-slate-500 mb-1 tracking-tighter">{label}</p>
        <div className="flex items-end justify-between">
            <h4 className="text-3xl font-black">{value}</h4>
            <div className={`flex items-center gap-1 text-[10px] font-black ${type === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {type === 'up' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>} {trend}
            </div>
        </div>
    </div>
);

const DistributionItem = ({ label, percent, color }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-black uppercase">
            <span className="text-slate-500">{label}</span>
            <span className="text-white">{percent}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);

export default SocietyAnalytics;
