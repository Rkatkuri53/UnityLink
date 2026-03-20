import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, Users, CheckCircle2, ChevronRight, Search, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ResidentOnboarding = () => {
    const { register, user } = useAuth();
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({
        society: '',
        block: '',
        unit: '',
        type: 'Owner'
    });

    const societies = [
        { id: '1', name: 'Skyline Heights', location: 'Whitefield, Bangalore' },
        { id: '2', name: 'Oceanic Greens', location: 'Powai, Mumbai' },
        { id: '3', name: 'Emerald Isle', location: 'Rajpath, Delhi' }
    ];

    const handleFinish = () => {
        register({
            ...user,
            society: selection.society,
            unit: `${selection.block}-${selection.unit}`,
            role: 'Resident',
            onboarded: true
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-2xl">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                        ))}
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        {step === 1 && "Which community do you live in?"}
                        {step === 2 && "Locate your residence"}
                        {step === 3 && "Finalize Profile"}
                    </h2>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    className="w-full h-16 pl-12 pr-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 focus:bg-white outline-none font-bold"
                                    placeholder="Search for your society name..."
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {societies.map(soc => (
                                    <button 
                                        key={soc.id}
                                        onClick={() => { setSelection({...selection, society: soc.name}); setStep(2); }}
                                        className={`p-6 rounded-3xl border-2 flex items-center justify-between group transition-all ${selection.society === soc.name ? 'bg-blue-50 border-blue-600' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                <Building2 size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 leading-none">{soc.name}</p>
                                                <div className="flex items-center gap-1 mt-2 text-slate-400">
                                                    <MapPin size={10} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">{soc.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-600 translate-x-0 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Block / Wing</label>
                                    <input 
                                        className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 font-black text-xl focus:border-blue-600 focus:bg-white outline-none"
                                        placeholder="e.g. B"
                                        value={selection.block}
                                        onChange={(e) => setSelection({...selection, block: e.target.value.toUpperCase()})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Unit Number</label>
                                    <input 
                                        className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 font-black text-xl focus:border-blue-600 focus:bg-white outline-none"
                                        placeholder="e.g. 1402"
                                        value={selection.unit}
                                        onChange={(e) => setSelection({...selection, unit: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Residency Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelection({...selection, type: 'Owner'})}
                                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${selection.type === 'Owner' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        <Home size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Home Owner</span>
                                    </button>
                                    <button 
                                        onClick={() => setSelection({...selection, type: 'Tenant'})}
                                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${selection.type === 'Tenant' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                    >
                                        <Users size={24} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Premium Tenant</span>
                                    </button>
                                </div>
                            </div>

                            <button 
                                onClick={() => setStep(3)}
                                className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
                            >
                                Continue to Verification
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="text-center space-y-10"
                        >
                            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/30">
                                <CheckCircle2 size={48} />
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Application Submitted</h3>
                                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">Your identity is being verified by the <strong>{selection.society}</strong> management team. You will have restricted access until approved.</p>
                            </div>

                            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 inline-block w-full text-left space-y-4">
                                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span>Summary</span>
                                    <span className="text-blue-600">Pending Review</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl font-black text-slate-900">{selection.society}</p>
                                    <p className="text-sm text-slate-500 font-bold uppercase tracking-tight">UNIT {selection.block} - {selection.unit} • {selection.type}</p>
                                </div>
                            </div>

                            <button 
                                onClick={handleFinish}
                                className="w-full h-18 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
                            >
                                Go to Resident Dashboard <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M5 12h14"/>
        <path d="m12 5 7 7-7 7"/>
    </svg>
);

export default ResidentOnboarding;
