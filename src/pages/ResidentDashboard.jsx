import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Activity, RefreshCw, Sparkles, BarChart, 
  UserCheck, PhoneCall, Wallet, Zap, Droplets, ArrowUpRight,
  Bell, ChevronRight, Star, Clock 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DataService from '../services/dataService';
import { toast } from 'react-hot-toast';

// Sub-components with High-Fidelity Styling
const HeroCard = ({ title, value, unit, icon: Icon, gradient }) => (
    <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`${gradient} rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group cursor-pointer`}
    >
        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
            <Icon size={120} />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <Icon size={24} />
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest">
                    LIVE DATA
                </div>
            </div>
            <div className="mt-12">
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-6xl font-black tracking-tighter">{value}</h3>
                    <span className="text-xl font-bold opacity-80">{unit}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const FeatureCard = ({ icon: Icon, title, sub, color }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="liquid-card p-6 flex flex-col gap-4 group cursor-pointer"
    >
        <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <h4 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h4>
            <p className="text-xs text-slate-400 font-bold">{sub}</p>
        </div>
        <div className="mt-auto flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black text-blue-600 uppercase">Explore</span>
            <ChevronRight size={14} className="text-blue-600" />
        </div>
    </motion.div>
);

const ResidentDashboard = () => {
    const { user } = useAuth();
    const [fetching, setFetching] = useState(false);
    const [stats, setStats] = useState({ water: 78, security: 'Safe', bank: '12,450' });

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    };

    return (
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-12"
        >
            {/* Header / Greeting */}
            <motion.div variants={itemVariants} className="flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900">
                        Hello, <span className="text-blue-600">{user.name.split(' ')[0]}</span>.
                    </h1>
                    <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
                            <ShieldCheck size={14} className="text-blue-600" />
                            <span className="text-[10px] font-black uppercase text-blue-600">Unit 102 Secured</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Simulation Active</span>
                        </div>
                    </div>
                </div>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-white border border-slate-200 rounded-3xl flex items-center justify-center shadow-sm hover:shadow-xl transition-all"
                >
                    <Bell size={24} className="text-slate-400" />
                </motion.button>
            </motion.div>

            {/* Top Level Hero Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <HeroCard 
                        title="Water Reserves" 
                        value={stats.water} 
                        unit="%" 
                        icon={Droplets} 
                        gradient="bg-gradient-to-br from-blue-600 to-indigo-700"
                    />
                </motion.div>
                <div className="grid grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                        <div className="liquid-card p-6 h-full flex flex-col justify-between hero-gradient bg-opacity-10 !bg-none border-blue-100 relative overflow-hidden group">
                           <div className="text-blue-600 mb-4"><Zap size={32} strokeWidth={2.5}/></div>
                           <div>
                                <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Grid Power</p>
                                <h3 className="text-3xl font-black">Stable</h3>
                           </div>
                           <ArrowUpRight className="absolute top-4 right-4 text-blue-200 group-hover:text-blue-600 transition-colors" size={24}/>
                        </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <div className="liquid-card p-6 h-full flex flex-col justify-between border-slate-200 bg-white">
                           <div className="text-slate-900 mb-4"><Wallet size={32} strokeWidth={2.5}/></div>
                           <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Maint. Balance</p>
                                <h3 className="text-3xl font-black">₹{stats.bank}</h3>
                           </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Action Mosaic (Control Center Style) */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-900 px-4 border-l-4 border-blue-600">Quick Actions</h3>
                    <span className="text-xs font-bold text-slate-400 cursor-pointer hover:text-blue-600">Manage All</span>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={itemVariants}>
                        <FeatureCard icon={Sparkles} title="Deep Clean" sub="Society Verified" color="bg-blue-600" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <FeatureCard icon={BarChart} title="Polls" sub="2 Active Votes" color="bg-purple-600" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <FeatureCard icon={UserCheck} title="Service Staff" sub="8 Online" color="bg-emerald-600" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <FeatureCard icon={PhoneCall} title="Emergency" sub="Police/Med" color="bg-rose-600" />
                    </motion.div>
                </div>
            </div>

            {/* Timeline / Updates Block */}
            <motion.div variants={itemVariants} className="liquid-card p-8 bg-slate-900 text-white border-0 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="text-blue-400" size={20}/>
                            <span className="text-xs font-black uppercase text-blue-400 tracking-widest">District Update</span>
                        </div>
                        <h2 className="text-3xl font-black leading-tight mb-2">Gate #4 Security Upgrade Finalized.</h2>
                        <p className="text-slate-400 text-sm font-medium">New AI license plate recognition is now active for all residents. Verify your vehicle tag in settings.</p>
                    </div>
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl">
                        View Details
                    </button>
                </div>
                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
            </motion.div>
        </motion.div>
    );
};

export default ResidentDashboard;
