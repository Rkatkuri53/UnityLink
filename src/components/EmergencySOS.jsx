import React, { useState } from 'react';
import { AlertTriangle, Shield, Phone, Bell, History, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencySOS = () => {
  const [isActivating, setIsActivating] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTrigger = () => {
    setIsTriggered(true);
    setIsActivating(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
          Emergency SOS
        </h3>
        <Shield size={20} className="text-slate-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* The Action Button */}
        <div className="flex flex-col items-center justify-center space-y-8 glass-card p-12 py-20 border-rose-500/10">
            {!isTriggered ? (
                <>
                    <div className="relative">
                        <AnimatePresence>
                            {isActivating && (
                                <motion.div 
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 bg-rose-500 rounded-full"
                                />
                            )}
                        </AnimatePresence>
                        <motion.button 
                            onMouseDown={() => setIsActivating(true)}
                            onMouseUp={() => setIsActivating(false)}
                            onMouseLeave={() => setIsActivating(false)}
                            onClick={handleTrigger}
                            className={`w-40 h-40 rounded-full shadow-[0_0_50px_#f43f5e33] flex items-center justify-center transition-all active:scale-90 relative z-10 ${isActivating ? 'bg-rose-600' : 'bg-rose-500'}`}
                        >
                            <AlertTriangle size={60} className="text-white" />
                        </motion.button>
                    </div>
                    <div className="text-center space-y-2">
                        <h4 className="text-2xl font-black uppercase tracking-tighter">Press & Hold</h4>
                        <p className="text-slate-500 text-sm font-bold">Alert Security + Neighbors instantly</p>
                    </div>
                </>
            ) : (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-6"
                >
                    <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_#f43f5e88] animate-pulse">
                        <Bell size={40} className="text-white" />
                    </div>
                    <div>
                        <h4 className="text-3xl font-black text-rose-500 mb-2">ALERT SENT</h4>
                        <p className="text-slate-400 font-bold">Gate Guard & 12 Neighbors notified.</p>
                    </div>
                    <button 
                        onClick={() => setIsTriggered(false)}
                        className="px-8 py-2 border border-rose-500/20 text-rose-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/10"
                    >
                        Cancel False Alarm
                    </button>
                </motion.div>
            )}
        </div>

        {/* Info & History */}
        <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2">
                   <Phone size={14} /> Quick Contacts
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <ContactCard name="Main Gate" num="Ext. 001" />
                    <ContactCard name="Society Office" num="Ext. 104" />
                    <ContactCard name="Ambulance" num="102" color="blue" />
                    <ContactCard name="Police" num="100" color="rose" />
                </div>
            </div>

            <div className="glass-card p-6">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-2 mb-4">
                   <History size={14} /> Recent Security Activity
                </h4>
                <div className="space-y-4">
                   <IncidentItem time="2h ago" type="Theft" status="Resolved" desc="Suspicious activity near Tower C reported." />
                   <IncidentItem time="1d ago" type="Fire" status="Drill" desc="Routine fire safety inspection completed." />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ name, num, color = 'slate' }) => {
    const colors = {
        slate: 'bg-white/5 border-white/5 text-slate-400',
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
        rose: 'bg-rose-500/10 border-rose-500/20 text-rose-500'
    };
    return (
        <div className={`p-4 rounded-xl border text-center ${colors[color]} hover:scale-105 transition-transform cursor-pointer`}>
            <p className="text-[10px] font-black uppercase mb-1">{name}</p>
            <p className="text-sm font-black">{num}</p>
        </div>
    );
};

const IncidentItem = ({ time, type, status, desc }) => (
    <div className="flex gap-4 border-l-2 border-white/5 pl-4 py-1">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-black uppercase text-white">{type}</span>
                <span className="text-[8px] font-black uppercase text-slate-500">{time}</span>
                <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 ml-auto">{status}</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
        </div>
    </div>
);

export default EmergencySOS;
