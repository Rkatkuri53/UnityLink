import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Building2, LayoutGrid, FileCheck, ArrowRight, UserPlus, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SocietyRegistration = () => {
    const { register, user } = useAuth();
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        societyName: '',
        units: '',
        adminName: '',
        plan: 'Basic'
    });

    const handleFinish = () => {
        register({
            ...user,
            name: data.adminName || user?.name || 'Admin',
            society: data.societyName,
            role: 'Society-Admin',
            onboarded: true
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col relative overflow-hidden">
            {/* Dark Mode Onboarding - "Master Command" Feel */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>

            <header className="p-8 lg:p-12 flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Shield size={22} />
                    </div>
                    <span className="text-xl font-black tracking-tight">UNITY<span className="text-blue-600">LINK</span></span>
                </div>
                <div className="flex gap-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-12 h-1 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-white/10'}`}></div>
                    ))}
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-xl">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <h1 className="text-5xl font-black tracking-tight leading-[1.1]">Launch your <span className="text-blue-500">Digital Society.</span></h1>
                                    <p className="text-slate-400 text-lg font-medium">Join 500+ communities managing security, finance, and living with UnityLink.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-slate-500 px-1 tracking-widest">Community Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                            <input 
                                                className="w-full h-20 bg-white/5 border-2 border-white/10 rounded-[2.5rem] pl-16 pr-8 text-xl font-bold focus:border-blue-600 outline-none transition-all"
                                                placeholder="e.g. Skyline Heights"
                                                onChange={(e) => setData({...data, societyName: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setStep(2)}
                                        className="w-full h-20 bg-blue-600 hover:bg-blue-700 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4"
                                    >
                                        Next Step <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="space-y-4">
                                    <h1 className="text-5xl font-black tracking-tight leading-[1.1]">Management <span className="text-blue-500">Profile.</span></h1>
                                    <p className="text-slate-400 text-lg font-medium">Who will be the primary administrator for <strong>{data.societyName}</strong>?</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-1 tracking-widest">Admin Full Name</label>
                                            <input 
                                                className="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl px-6 font-bold focus:border-blue-600 outline-none"
                                                placeholder="Alice Smith"
                                                onChange={(e) => setData({...data, adminName: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-500 px-1 tracking-widest">Total Units</label>
                                            <input 
                                                className="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl px-6 font-bold focus:border-blue-600 outline-none"
                                                placeholder="e.g. 150"
                                                onChange={(e) => setData({...data, units: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                                        <div className="flex items-center gap-3 text-emerald-400">
                                            <Zap size={20} />
                                            <span className="text-xs font-black uppercase tracking-widest">Instant Activation</span>
                                        </div>
                                        <p className="text-sm text-slate-400 font-medium">By clicking continue, you agree to deploy the Standard Governance set for your region. You can customize this later.</p>
                                    </div>

                                    <button 
                                        onClick={() => setStep(3)}
                                        className="w-full h-20 bg-blue-600 hover:bg-blue-700 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/20 transition-all flex items-center justify-center gap-4"
                                    >
                                        Finalize Deployment <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center space-y-10"
                            >
                                <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/40 mx-auto rotate-12">
                                    <FileCheck size={48} />
                                </div>

                                <div className="space-y-3">
                                    <h1 className="text-5xl font-black tracking-tight">System Ready.</h1>
                                    <p className="text-slate-400 text-lg font-medium">Your digital ecosystem for <strong>{data.societyName}</strong> is ready for residents.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FeatureCard icon={<UserPlus size={18}/>} label="Resident Invites" />
                                    <FeatureCard icon={<Shield size={18}/>} label="Security Kiosk" />
                                </div>

                                <button 
                                    onClick={handleFinish}
                                    className="w-full h-20 bg-white text-slate-900 rounded-[2.5rem] font-black uppercase tracking-widest text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-4"
                                >
                                    Enter Admin Command Center <LayoutGrid size={20} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const FeatureCard = ({ icon, label }) => (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
        <div className="text-blue-500">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
);

export default SocietyRegistration;
