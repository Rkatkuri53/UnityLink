import React from 'react';
import { BadgeCent, TrendingDown, ArrowRight, Zap, Target, Globe } from 'lucide-react';

const RevenueSettlement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Maintenance Offset Engine
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Real-Time Ad Revenue Distribution
           </p>
        </div>
        <BadgeCent className="text-purple-500" size={24} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settlement Summary */}
        <div className="lg:col-span-2 glass-card p-8 border-purple-500/10 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Globe size={160} />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 text-purple-400 font-black text-[10px] uppercase tracking-widest mb-4">
                    <Zap size={14} /> Total Community Earnings
                </div>
                <h4 className="text-5xl font-black mb-2">$12,450.00</h4>
                <p className="text-slate-400 text-sm mb-8">Generated from 12 active global ad campaigns & marketplace fees.</p>

                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Your Direct Saving</p>
                        <p className="text-2xl font-black text-emerald-400">-$12.00</p>
                        <p className="text-[10px] text-slate-500 mt-1">Applied to Mar Maintenance</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Eco-Donation</p>
                        <p className="text-2xl font-black text-blue-400">$3.50</p>
                        <p className="text-[10px] text-slate-500 mt-1">Voted for Garden Upgrade</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Campaign Mini-Logs */}
        <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Active Campaigns</h4>
            <div className="glass-card p-4 space-y-4">
                <CampaignItem name="Tesla Solar" type="Global" earn="+$0.45" />
                <CampaignItem name="Local Gym" type="Nearby" earn="+$0.12" />
                <CampaignItem name="Grocery App" type="Global" earn="+$0.30" />
                <div className="pt-2 border-t border-white/5">
                    <button className="w-full py-2 text-[10px] font-black uppercase text-purple-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                        View All Contributors <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CampaignItem = ({ name, type, earn }) => (
    <div className="flex justify-between items-center group">
        <div>
            <p className="text-xs font-bold group-hover:text-purple-400 transition-colors">{name}</p>
            <p className="text-[9px] text-slate-500 uppercase font-black">{type}</p>
        </div>
        <span className="text-xs font-black text-emerald-500">{earn}</span>
    </div>
);

export default RevenueSettlement;
