import React from 'react';
import { motion } from 'framer-motion';
import { 
    UserPlus, Shield, MessageSquare, Key, LayoutGrid, Plus, 
    ArrowRight, UserCheck, Users, HelpCircle, Activity, Droplets 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ResidentDashboard = ({ onShowBill }) => {
    const { user } = useAuth();
    
    // Fallback for simulation mode if context fails
    const userName = user?.name || 'Resident';

    return (
        <div className="px-6 py-4 space-y-10">
            {/* Dynamic Welcome Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl font-black text-slate-900 tracking-tight leading-tight"
                    >
                        Hello, {userName.split(' ')[0]} 👋
                    </motion.h1>
                    <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Status: Secure at {user?.society || 'Community'} • {user?.unit || 'Unit'}
                    </p>
                </div>
            </header>

            {/* Quick Action Strip - HIGH REACHABILITY */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickAction icon={UserPlus} label="Invite Guest" color="bg-blue-600" />
                <QuickAction icon={MessageSquare} label="Message Guard" color="bg-slate-900" />
                <QuickAction icon={Shield} label="Security Pass" color="bg-indigo-600" />
                <QuickAction icon={Users} label="Family Access" color="bg-violet-600" />
            </section>

            {/* Live Activity & Updates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Live at the Gate</h3>
                    <div className="space-y-3">
                        <ActivityLine type="entry" name="Ramesh (Plumber)" time="10:15 AM" status="Entered" />
                        <ActivityLine type="delivery" name="Amazon Delivery" time="09:42 AM" status="At Gate" highlight />
                        <ActivityLine type="entry" name="House Help (Shanti)" time="08:20 AM" status="Entered" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Essential Utilities</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <UtilityCard icon={Droplets} label="Water Tank" value="82%" sub="Daily Level" color="text-blue-500" />
                        <UtilityCard icon={Activity} label="Power Grid" value="Normal" sub="Stability: High" color="text-amber-500" />
                    </div>
                </div>
            </div>

            {/* Survival Support Components - NoBrokerHood style */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-1">Community IQ</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:opacity-70">View All Features</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceTile icon={UserCheck} label="House Help" color="bg-emerald-500" />
                    <ServiceTile icon={Building2} label="Community" color="bg-blue-500" />
                    <ServiceTile icon={HelpCircle} label="Emergency" color="bg-rose-500" />
                    <ServiceTile icon={LayoutGrid} label="Society IQ" color="bg-slate-900" />
                </div>
            </section>
        </div>
    );
};

// Sub-components for High Fidelity
const QuickAction = ({ icon: Icon, label, color }) => (
    <motion.button 
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${color} p-6 rounded-[2rem] flex items-center justify-between group shadow-xl shadow-blue-500/10`}
    >
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <div className="text-right">
             <span className="text-[10px] font-black uppercase text-white/50 tracking-widest block mb-1">Quick</span>
             <span className="text-sm font-black text-white">{label}</span>
        </div>
    </motion.button>
);

const ActivityLine = ({ type, name, time, status, highlight }) => (
    <div className={`p-4 rounded-3xl border transition-all flex items-center justify-between ${highlight ? 'bg-blue-50 border-blue-200 shadow-lg shadow-blue-500/5' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {type === 'entry' ? <UserCheck size={18} /> : <Shield size={18} />}
            </div>
            <div>
                <span className="text-sm font-bold text-slate-900 block leading-tight">{name}</span>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{status} • {time}</span>
            </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <ArrowRight size={16} />
        </button>
    </div>
);

const UtilityCard = ({ icon: Icon, label, value, sub, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
            <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">{label}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{sub}</span>
            </div>
        </div>
        <span className="text-2xl font-black text-slate-900">{value}</span>
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
    </motion.div>
);

const Building2 = ({ size, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
        <path d="M10 6h4"/>
        <path d="M10 10h4"/>
        <path d="M10 14h4"/>
        <path d="M10 18h4"/>
    </svg>
);

export default ResidentDashboard;
