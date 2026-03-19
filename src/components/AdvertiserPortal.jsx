import React, { useState } from 'react';
import { Target, BarChart3, Globe, Plus, Zap, Users, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvertiserPortal = () => {
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Global Advertiser Portal
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Campaign Manager • ID #ADS-X-109
           </p>
        </div>
        <button className="glow-btn !bg-purple-600 !text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <Plus size={16} /> New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <div className="space-y-2">
            <AdNavItem active={activeTab === 'campaigns'} onClick={() => setActiveTab('campaigns')} icon={<Target size={18}/>} label="My Campaigns" count="3" />
            <AdNavItem active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={18}/>} label="Performance" />
            <AdNavItem active={activeTab === 'reach'} onClick={() => setActiveTab('reach')} icon={<Globe size={18}/>} label="Global Network" />
            
            <div className="mt-8 p-6 glass-card border-purple-500/10 bg-purple-500/5">
                <p className="text-[9px] font-black uppercase text-purple-400 mb-2">Network Reach</p>
                <h4 className="text-2xl font-black">420+</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Societies Reached</p>
            </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CampaignCard 
                    name="Tesla Solar Drive" 
                    status="Active" 
                    reach="12,500" 
                    ctr="4.2%" 
                    spend="$1,200" 
                />
                <CampaignCard 
                    name="Local Grocery Flash" 
                    status="Scheduled" 
                    reach="0" 
                    ctr="0%" 
                    spend="$450" 
                    color="blue"
                />
            </div>

            <div className="glass-card p-6 border-white/5 bg-slate-500/5">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">CTR Performance (Last 7 Days)</h4>
                <div className="h-24 flex items-end gap-1 px-4">
                      {[30, 50, 40, 70, 60, 80, 75, 90, 85, 95, 80, 70, 85, 100].map((h, i) => (
                          <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className={`flex-1 rounded-t-sm ${i === 13 ? 'bg-purple-500' : 'bg-white/5'}`}
                          />
                      ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const AdNavItem = ({ active, onClick, icon, label, count }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${active ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
    >
        <div className="flex items-center gap-3">
            {icon}
            <span className="text-xs font-black uppercase tracking-tight">{label}</span>
        </div>
        {count && <span className={`text-[10px] font-black italic`}>{count}</span>}
    </button>
);

const CampaignCard = ({ name, status, reach, ctr, spend, color = 'purple' }) => {
    const colors = {
        purple: 'border-purple-500/20 bg-purple-500/5 text-purple-400',
        blue: 'border-blue-500/20 bg-blue-500/5 text-blue-400'
    };
    return (
        <div className={`glass-card p-6 border ${colors[color]} group cursor-pointer`}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">{name}</h4>
                    <p className={`text-[9px] font-black uppercase ${status === 'Active' ? 'text-emerald-500' : 'text-slate-500'}`}>{status}</p>
                </div>
                <ArrowUpRight size={16} className="text-slate-600" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div>
                    <p className="text-[8px] font-black uppercase text-slate-500">Reach</p>
                    <p className="text-xs font-black text-slate-300">{reach}</p>
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase text-slate-500">CTR</p>
                    <p className="text-xs font-black text-slate-300">{ctr}</p>
                </div>
                <div>
                    <p className="text-[8px] font-black uppercase text-slate-500">Budget</p>
                    <p className="text-xs font-black text-slate-300">{spend}</p>
                </div>
            </div>
        </div>
    );
};

export default AdvertiserPortal;
