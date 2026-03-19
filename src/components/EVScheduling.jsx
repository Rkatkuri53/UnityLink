import React, { useState } from 'react';
import { Zap, BatteryCharging, Calendar, Clock, CreditCard, ChevronRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const EVScheduling = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = [
    { id: 1, time: '18:00 - 20:00', status: 'Available', cost: '$4.50' },
    { id: 2, time: '20:00 - 22:00', status: 'Booked', cost: '$4.50' },
    { id: 3, time: '22:00 - 00:00', status: 'Available', cost: '$3.00' },
    { id: 4, time: '00:00 - 02:00', status: 'Available', cost: '$2.00' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            EV Charging Station
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Smart Power Sharing • Point ID #EV-GATE-1
           </p>
        </div>
        <Zap className="text-emerald-500" size={24} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-emerald-500/10 bg-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <BatteryCharging size={160} />
            </div>
            
            <div className="relative z-10">
                <h4 className="text-2xl font-black mb-1">Schedule Charge</h4>
                <p className="text-slate-400 text-sm mb-8">Choose a slot to pre-authorize your charging session.</p>

                <div className="space-y-3">
                    {slots.map(slot => (
                        <div 
                            key={slot.id}
                            onClick={() => slot.status === 'Available' && setSelectedSlot(slot.id)}
                            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${slot.status === 'Booked' ? 'opacity-40 cursor-not-allowed border-white/5' : selectedSlot === slot.id ? 'border-emerald-500 bg-emerald-500 text-black' : 'border-white/10 hover:border-emerald-500/50 cursor-pointer'}`}
                        >
                            <div className="flex items-center gap-4">
                                <Clock size={16} />
                                <span className="text-sm font-bold">{slot.time}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase">{slot.status}</p>
                                <p className="text-xs font-bold">{slot.cost}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button className="w-full py-4 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_#10b98133] active:scale-95 disabled:opacity-50" disabled={!selectedSlot}>
                        Confirm Booking
                    </button>
                    <p className="text-[8px] text-center text-slate-500 font-bold uppercase mt-4">Amount will be added to next monthly maintenance</p>
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="glass-card p-6 border-white/5">
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Charging Policy</h4>
                <div className="space-y-4">
                    <PolicyItem icon={<Calendar size={18}/>} label="Advance Booking" desc="Only one active booking allowed per unit per day." />
                    <PolicyItem icon={<CreditCard size={18}/>} label="Peak Pricing" desc="Midnight slots (00:00 - 05:00) are 30% cheaper." />
                    <PolicyItem icon={<ShieldCheck size={18}/>} label="Automatic Stop" desc="Power cuts off automatically once 100% charge is detected." />
                </div>
            </div>

            <div className="glass-card p-6 bg-blue-500/5 border-blue-500/20">
                <p className="text-xs font-bold mb-1">New to EV?</p>
                <p className="text-[10px] text-slate-400 leading-normal mb-4">Read our guide on how the smart chargers integrate with your vehicle's BMS.</p>
                <button className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    View Guide <ChevronRight size={14} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

const PolicyItem = ({ icon, label, desc }) => (
    <div className="flex gap-4">
        <div className="p-2 bg-white/5 text-slate-400 rounded-lg">
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-black uppercase tracking-tight mb-0.5">{label}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
        </div>
    </div>
);

export default EVScheduling;
