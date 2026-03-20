import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, Key, ArrowRight, Building2, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [role, setRole] = useState('Resident');

    const handleNext = () => {
        if (step === 1 && phone.length === 10) setStep(2);
        else if (step === 2) login(role, phone);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/10 p-10 relative z-10 border border-slate-100"
            >
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 mb-6 group hover:scale-110 transition-transform cursor-pointer">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">UNITY<span className="text-blue-600">LINK</span></h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">Digital Community Ecosystem</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block px-1">Identity Access</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <RoleSelect active={role === 'Resident'} onClick={() => setRole('Resident')} icon={<UserCircle2 size={20}/>} label="Resident" />
                                    <RoleSelect active={role === 'Admin'} onClick={() => setRole('Admin')} icon={<Building2 size={20}/>} label="Mgmt / Admin" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest block px-1">Registered Phone</label>
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <input 
                                        type="tel"
                                        placeholder="00000 00000"
                                        maxLength="10"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                        className="w-full h-16 pl-14 pr-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold focus:border-blue-600 focus:bg-white transition-all outline-none placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleNext}
                                disabled={phone.length < 10}
                                className="w-full h-16 bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all hover:gap-5"
                            >
                                Request OTP <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8 text-center"
                        >
                            <div className="space-y-2">
                                <h3 className="font-bold text-xl">Verification Code</h3>
                                <p className="text-sm text-slate-500 font-medium">Enter the 4-digit code sent to <span className="text-slate-900 font-bold">+91 {phone}</span></p>
                            </div>

                            <div className="flex justify-center gap-4">
                                {otp.map((digit, i) => (
                                    <input 
                                        key={i}
                                        type="text"
                                        maxLength="1"
                                        className="w-14 h-16 bg-slate-50 border-2 border-slate-100 rounded-xl text-2xl font-black text-center focus:border-blue-600 focus:bg-white outline-none"
                                        value={digit}
                                        onChange={(e) => {
                                            const newOtp = [...otp];
                                            newOtp[i] = e.target.value.replace(/\D/g, '');
                                            setOtp(newOtp);
                                            if (e.target.value && i < 3) e.target.nextSibling.focus();
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="space-y-4 pt-4">
                                <button 
                                    onClick={handleNext}
                                    className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                    Verify \u0026 Unlock Access
                                </button>
                                <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-slate-400 tracking-widest hover:text-slate-900 transition-colors">Wrong number? Change</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                    <p className="text-xs text-slate-500 font-medium">New Community? <button className="text-blue-600 font-black hover:underline">Register Society</button></p>
                </div>
            </motion.div>
        </div>
    );
};

const RoleSelect = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${active ? 'bg-blue-50 border-blue-600 text-blue-600' : 'bg-transparent border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'}`}
    >
        {icon}
        <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
    </button>
);

export default Login;
