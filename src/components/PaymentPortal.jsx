import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Check, ArrowRight, Wallet, X, BadgeCent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentPortal = ({ amount, onCancel, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Method, 2: Processing, 3: Success

  const handlePay = () => {
    setStep(2);
    setTimeout(() => {
        setStep(3);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md glass-card border-white/10 p-8 shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4">
                <button onClick={onCancel} className="text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        key="method" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Checkout Amount</p>
                            <h3 className="text-4xl font-black mb-1">₹{amount.toLocaleString()}</h3>
                            <div className="flex items-center justify-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                                <BadgeCent size={14} /> Applied Ad Credit: -₹1,200
                            </div>
                        </div>

                        <div className="space-y-3">
                            <PaymentMethod label="Instant UPI (Recommended)" icon="⚡" selected />
                            <PaymentMethod label="Debit/Credit Card" icon="💳" />
                            <PaymentMethod label="Net Banking" icon="🏦" />
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3">
                            <ShieldCheck size={20} className="text-emerald-500" />
                            <p className="text-[10px] font-bold text-slate-400">Secured via UnityLink Payment Gateway. SSL Encrypted.</p>
                        </div>

                        <button 
                            onClick={handlePay}
                            className="w-full py-4 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_#10b98133] active:scale-95 transition-all"
                        >
                            Pay Now
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div 
                        key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="py-12 text-center space-y-6"
                    >
                        <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
                        <div>
                            <h4 className="text-xl font-bold mb-2">Authorizing Payment...</h4>
                            <p className="text-sm text-slate-500">Do not refresh or close the page.</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div 
                        key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="py-8 text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_#10b98166]">
                            <Check size={32} className="text-black" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black mb-1">Payment Successful!</h4>
                            <p className="text-sm text-slate-500">Receipt #TXN-{Math.floor(Math.random()*90000)} sent to email.</p>
                        </div>
                        <button 
                            onClick={onSuccess}
                            className="w-full py-4 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                        >
                            Back to Dashboard
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </div>
  );
};

const PaymentMethod = ({ label, icon, selected }) => (
    <div className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selected ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-white/20'}`}>
        <div className="flex items-center gap-3">
             <span className="text-xl">{icon}</span>
             <span className="text-sm font-bold">{label}</span>
        </div>
        {selected && <div className="w-4 h-4 bg-emerald-500 rounded-full border-4 border-black"></div>}
    </div>
);

export default PaymentPortal;
