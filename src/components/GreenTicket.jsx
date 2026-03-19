import React from 'react';
import { CheckCircle2, MoreVertical, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const GreenTicket = ({ residentName, flatNo, validUntil }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-sm mx-auto glass-card relative overflow-hidden group"
    >
      {/* Dynamic Pulsing Background */}
      <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
      
      {/* Security Watermark */}
      <div className="absolute top-0 right-0 p-2 opacity-10 rotate-12 group-hover:rotate-0 transition-transform">
        <ShieldCheck size={120} />
      </div>

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
            Active Green Pass
          </div>
          <MoreVertical size={16} className="text-slate-500" />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-500/30 mb-4">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 tracking-tight">{flatNo}</h3>
          <p className="text-sm font-bold text-slate-400 capitalize">{residentName}</p>
        </div>

        <div className="border-t border-dashed border-white/10 pt-4 flex justify-between items-end">
          <div>
            <p className="text-[10px] text-slate-500 font-black uppercase">Valid Until</p>
            <p className="text-sm font-bold">{validUntil}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-black uppercase">Signed By</p>
            <p className="text-sm font-bold italic text-emerald-600">Secretary, SH</p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
            {[1,2,3,4,5,6,7].map(i => (
                <div key={i} className="flex-1 h-3 bg-emerald-500/10 rounded-sm"></div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GreenTicket;
