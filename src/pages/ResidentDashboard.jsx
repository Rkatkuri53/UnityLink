import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, RefreshCw, Sparkles, BarChart, 
  UserPlus, MessageSquare, Shield, PhoneCall, Wallet, Zap, Droplets, 
  Bell, ChevronRight, Star, Clock, UserCheck, MessageSquareMore
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DataService from '../services/dataService';
import { toast } from 'react-hot-toast';

const ResidentDashboard = ({ onShowBill, activeModule, setActiveModule }) => {
    const { user } = useAuth();
    const [fetching, setFetching] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } }
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">
            {/* NOBROKER FEATURE: Header & Greetings */}
            <motion.div variants={itemVariants} className="flex justify-between items-center">
                <div>
                   <h1 className="text-4xl font-black tracking-tighter text-slate-900">Unity<span className="text-blue-600">Link</span></h1>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Hello, {user.name.split(' ')[0]} 👋</p>
                </div>
                <div className="flex gap-3">
                    <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm relative">
                        <Bell size={20} />
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-black overflow-hidden border-2 border-white">
                        {user.name[0]}
                    </div>
                </div>
            </motion.div>

            {/* QUICK ACTIONS: NoBrokerHood Signature Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
                <QuickAction icon={UserPlus} label="Invite" sub="Guest" color="bg-emerald-500" onClick={() => {}} />
                <QuickAction icon={MessageSquareMore} label="Message" sub="Guard" color="bg-blue-500" onClick={() => {}} />
                <QuickAction icon={Shield} label="Security" sub="Pass" color="bg-orange-500" onClick={() => {}} />
                <QuickAction icon={Star} label="Family" sub="Access" color="bg-purple-500" onClick={() => {}} />
            </motion.div>

            {/* LIVE ACTIVITY RIBBON: NoBrokerHood Contextual Feed */}
            <motion.div variants={itemVariants} className="liquid-card p-5 border-l-[6px] border-l-emerald-500 bg-white shadow-xl relative overflow-hidden group">
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                           <UserCheck size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-0.5">Live at the Gate</p>
                            <h3 className="font-black text-slate-900 leading-none">Ramesh (Plumber) entered.</h3>
                        </div>
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                        VIEW HISTORY
                    </button>
                </div>
            </motion.div>

            {/* CORE STATUS BLOCKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <StatusBlock 
                        title="Water Tank" 
                        value="82" 
                        unit="%" 
                        icon={Droplets} 
                        color="text-blue-600" 
                        bg="bg-blue-600"
                        desc="Supply status: Normal"
                    />
                </motion.div>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                        <div className="liquid-card p-6 h-full bg-white flex flex-col justify-between border-slate-100">
                             <div className="text-orange-500 bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                                <Zap size={20} strokeWidth={3} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mains Power</p>
                                <h4 className="text-2xl font-black text-slate-900">Healthy</h4>
                             </div>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <div className="liquid-card p-6 h-full bg-slate-900 text-white border-0 shadow-2xl">
                             <div className="text-blue-400 bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                                <Wallet size={20} strokeWidth={3} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Maintenance</p>
                                <h4 className="text-2xl font-black tracking-tight">₹12,450</h4>
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* SERVICES MOSAIC */}
            <div className="space-y-6">
                <h3 className="text-lg font-black text-slate-900">Essential Services</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={itemVariants}>
                        <ServiceTile icon={Sparkles} label="House Help" color="bg-rose-500" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ServiceTile icon={BarChart} label="Community" color="bg-indigo-500" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ServiceTile icon={PhoneCall} label="Emergency" color="bg-rose-600" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <ServiceTile icon={Activity} label="Society IQ" color="bg-emerald-600" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

const QuickAction = ({ icon: Icon, label, sub, color, onClick }) => (
    <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-2 group cursor-pointer"
    >
        <div className={`w-16 h-16 rounded-[1.5rem] ${color} text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3 shadow-${color}/30`}>
            <Icon size={28} strokeWidth={2.5} />
        </div>
        <div className="text-center">
            <p className="text-[11px] font-black text-slate-900 leading-none">{label}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{sub}</p>
        </div>
    </motion.button>
);

const StatusBlock = ({ title, value, unit, icon: Icon, color, bg, desc }) => (
    <div className="liquid-card p-8 bg-white border-slate-100 flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
            <div className={`${bg} text-white p-3 rounded-2xl shadow-lg`}>
                <Icon size={24} />
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <div className="flex items-baseline justify-end gap-1">
                    <h3 className="text-5xl font-black tracking-tighter text-slate-900">{value}</h3>
                    <span className="text-xl font-bold text-slate-400">{unit}</span>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center relative z-10">
             <span className="text-xs font-bold text-slate-500">{desc}</span>
             <ChevronRight className="text-slate-300" size={18} />
        </div>
        {/* Abstract Pattern Overlay */}
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 -mr-10 -mt-10">
            <Icon size={120} />
        </div>
    </div>
);

const ServiceTile = ({ icon: Icon, label, color }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="liquid-card p-5 flex items-center gap-4 bg-white border-slate-100 group cursor-pointer"
    >
        <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
            <Icon size={20} />
        </div>
        <span className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{label}</span>
    </motion.button>
);

export default ResidentDashboard;
