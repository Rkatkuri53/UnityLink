import React, { useState } from 'react';
import { Camera, Shield, Users, Bell, Search, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GateSecurity = () => {
  const [activeTab, setActiveTab] = useState('scan'); // scan, visitors, alerts
  const [notifications, setNotifications] = useState([
     { id: 1, type: 'SOS', body: 'Emergency Panic Button: Flat B-1402', time: 'Just now' },
     { id: 2, type: 'Notice', body: 'Garbage Truck SH-992 Entering Gate A', time: '12m ago' }
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 font-mono">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 glass-card p-4 border-emerald-500/20">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Shield size={24} className="text-black" />
            </div>
            <div>
                <h2 className="text-lg font-black tracking-tighter">GATE_A <span className="text-emerald-500">SECURE</span></h2>
                <p className="text-[10px] text-slate-500 uppercase">Status: ONLINE • 2 Guards on duty</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="relative p-2 bg-white/5 rounded-lg">
                <Bell size={20} className="text-slate-400" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#020617]"></span>
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
            <NavItem active={activeTab === 'scan'} onClick={() => setActiveTab('scan')} icon={<Camera size={18}/>} label="Scan Pass" count="LIVE" />
            <NavItem active={activeTab === 'visitors'} onClick={() => setActiveTab('visitors')} icon={<Users size={18}/>} label="Expected" count="12" />
            <NavItem active={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} icon={<AlertCircle size={18}/>} label="Active SOS" count="!" color="rose" />
            
            <div className="mt-12 p-4 glass-card border-white/5">
                <p className="text-[10px] text-slate-500 mb-2 uppercase">Guard Stats</p>
                <div className="space-y-4">
                    <StatItem label="Visitors Today" val="48" />
                    <StatItem label="Deliveries" val="22" />
                    <StatItem label="SOS Triggered" val="1" />
                </div>
            </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
            <div className="glass-card min-h-[500px] border-white/10 overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    {activeTab === 'scan' && (
                        <motion.div 
                            key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="p-12 flex flex-col items-center justify-center flex-1 text-center"
                        >
                            <div className="relative w-64 h-64 border-2 border-emerald-500/20 rounded-3xl mb-8 flex items-center justify-center overflow-hidden">
                                 <div className="absolute inset-2 border border-emerald-500/40 rounded-2xl border-dashed animate-pulse"></div>
                                 <Camera size={80} className="text-emerald-500/20" />
                                 <motion.div 
                                    animate={{ top: ['10%', '90%', '10%'] }} transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute left-8 right-8 h-1 bg-emerald-500 shadow-[0_0_15px_#10b981]" 
                                 />
                            </div>
                            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">System Ready</h3>
                            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8 font-bold">Position QR code within frame for automatic guest verification.</p>
                            <div className="flex gap-4">
                                <button className="glow-btn !bg-white/5 !text-white border border-white/10">Manual Entry</button>
                                <button className="glow-btn">Auto-Scan</button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'visitors' && (
                        <motion.div 
                            key="visitors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col flex-1"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold">EXPECTED_VISITORS_LOG</h3>
                                <Search size={18} className="text-slate-500" />
                            </div>
                            <div className="divide-y divide-white/5 flex-1 overflow-auto">
                                <VisitorRow name="Michael Chen" type="Guest" unit="B-1402" time="18:30" />
                                <VisitorRow name="Amazon Delivery" type="Service" unit="A-901" time="ASAP" />
                                <VisitorRow name="Pizza Hut" type="Service" unit="C-22" time="Just Now" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ active, onClick, icon, label, count, color = 'emerald' }) => {
    const activeColors = {
        emerald: 'bg-emerald-500 text-black',
        rose: 'bg-rose-500 text-white'
    };
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${active ? activeColors[color] : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs font-black uppercase tracking-tight">{label}</span>
            </div>
            <span className={`text-[10px] font-black italic ${active ? 'opacity-100' : 'opacity-50'}`}>{count}</span>
        </button>
    );
};

const StatItem = ({ label, val }) => (
    <div className="flex justify-between items-center text-[11px]">
        <span className="text-slate-600 font-bold uppercase">{label}</span>
        <span className="text-slate-300 font-mono font-black">{val}</span>
    </div>
);

const VisitorRow = ({ name, type, unit, time }) => (
    <div className="p-4 flex items-center justify-between group hover:bg-white/5 transition-all">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <Users size={16} className="text-slate-400" />
            </div>
            <div>
                <p className="font-bold text-sm tracking-tight">{name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{type} • {unit}</p>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-right">
                <p className="text-xs font-black">{time}</p>
                <p className="text-[9px] text-emerald-500 font-bold uppercase">Pre-Approved</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-black transition-all">
                    <Check size={16} />
                </button>
                <button className="p-2 bg-rose-500/20 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
                    <X size={16} />
                </button>
            </div>
        </div>
    </div>
);

export default GateSecurity;
