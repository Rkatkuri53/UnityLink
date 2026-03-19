import React from 'react';
import { FileText, Download, Printer, TrendingUp, TrendingDown, PieChart, ShieldCheck } from 'lucide-react';

const PLGenerator = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Monthly Financial Audit
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Auto-Generated Compliance Report • March 2026
           </p>
        </div>
        <div className="flex gap-2">
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                <Printer size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95">
                <Download size={14} /> Download PDF
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visual Summary */}
        <div className="glass-card p-8 border-white/5 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 rounded-full border-8 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center mb-6">
                <PieChart size={40} className="text-emerald-500/50" />
            </div>
            <h4 className="text-2xl font-black mb-1">Healthy Surplus</h4>
            <p className="text-sm text-slate-500">Your society is in the top 5% for financial efficiency this month.</p>
        </div>

        {/* Quick Numbers */}
        <div className="space-y-4">
            <AuditMetric label="Total Collection" val="₹12.45 Lac" trend="up" />
            <AuditMetric label="Total Expenses" val="₹8.12 Lac" trend="down" />
            <AuditMetric label="Ad Revenue Net" val="₹1.20 Lac" trend="up" />
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <ShieldCheck size={20} className="text-emerald-500" />
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">Audit verified • No discrepancies found</p>
            </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/10">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Major Allocations</h4>
          </div>
          <div className="p-6 space-y-6">
              <AllocationRow label="Infrastructure & Repairs" percent={45} amount="₹3.65 Lac" color="blue" />
              <AllocationRow label="Security & Staff" percent={30} amount="₹2.43 Lac" color="amber" />
              <AllocationRow label="Utilities & Waste" percent={25} amount="₹2.04 Lac" color="emerald" />
          </div>
      </div>
    </div>
  );
};

const AuditMetric = ({ label, val, trend }) => (
    <div className="glass-card p-4 border-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-slate-500">{label}</span>
        <div className="flex items-center gap-3">
            <span className="text-sm font-black">{val}</span>
            {trend === 'up' ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-rose-500" />}
        </div>
    </div>
);

const AllocationRow = ({ label, percent, amount, color }) => {
    const colors = {
        blue: 'bg-blue-500',
        amber: 'bg-amber-500',
        emerald: 'bg-emerald-500'
    };
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold">
                <span className="text-slate-300">{label}</span>
                <span className="text-slate-500">{amount} ({percent}%)</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${colors[color]} rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

export default PLGenerator;
