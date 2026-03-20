import React, { useState } from 'react';
import { Camera, Shield, Users, Bell, Search, Check, X, Phone, Keypad, Truck, UserPlus, Car, HelpCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GateSecurity = () => {
  const [showKeypad, setShowKeypad] = useState(false);
  const [entryCode, setEntryCode] = useState('');
  const [activeTab, setActiveTab] = useState('home');

  const handleKeyPress = (num) => {
    if (entryCode.length < 6) setEntryCode(prev => prev + num);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-6 overflow-hidden flex flex-col">
      {/* Kiosk Header */}
      <header className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Shield size={32} />
            </div>
            <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">Gate <span className="text-blue-600">Alpha</span></h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Entry • Terminal #01</p>
            </div>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900">Friday, 20 Mar</p>
                <p className="text-xs font-bold text-blue-600">10:18 AM</p>
            </div>
            <button className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200">
                <Bell size={24} />
            </button>
        </div>
      </header>

      {/* Main Kiosk Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left: Action Grid (Massive Buttons) */}
        <div className="lg:col-span-8 grid grid-cols-2 gap-4">
            <KioskButton 
                icon={UserPlus} 
                label="Guest Entry" 
                color="bg-emerald-500" 
                onClick={() => setShowKeypad(true)} 
            />
            <KioskButton 
                icon={Truck} 
                label="Delivery" 
                color="bg-blue-500" 
                onClick={() => {}} 
            />
            <KioskButton 
                icon={Car} 
                label="Cab Entry" 
                color="bg-amber-500" 
                onClick={() => {}} 
            />
            <KioskButton 
                icon={HelpCircle} 
                label="Daily Help" 
                color="bg-indigo-500" 
                onClick={() => {}} 
            />
            <div className="col-span-2 grid grid-cols-2 gap-4 mt-2">
                <button className="h-24 bg-white border-2 border-slate-200 rounded-[2rem] flex items-center justify-center gap-3 font-black text-lg hover:bg-slate-50 transition-colors shadow-sm">
                    <Search className="text-slate-400" /> FIND RESIDENT
                </button>
                <button className="h-24 bg-rose-600 rounded-[2rem] flex items-center justify-center gap-3 font-black text-white text-lg hover:bg-rose-700 transition-colors shadow-lg">
                    <AlertTriangle /> EMERGENCY SOS
                </button>
            </div>
        </div>

        {/* Right: Activity Log (NoBroker Style) */}
        <div className="lg:col-span-4 flex flex-col overflow-hidden">
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest">Recent Activity</h3>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md">LIVE</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <LogEntry name="Zomato Delivery" flat="B-1402" status="Entered" time="2m ago" icon={Truck} color="text-blue-500" />
                    <LogEntry name="Ramesh Kumar" flat="C-101" status="Guest" time="15m ago" icon={Check} color="text-emerald-500" />
                    <LogEntry name="Uber (KA 01 2231)" flat="A-202" status="Exited" time="22m ago" icon={X} color="text-slate-400" />
                    <LogEntry name="Society Staff" flat="Gen" status="Entered" time="1h ago" icon={Check} color="text-emerald-500" />
                </div>
                <div className="p-4 bg-slate-50">
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                        View Full Register
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Keypad Overlay (Kiosk Experience) */}
      <AnimatePresence>
        {showKeypad && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[6000] bg-slate-900/40 backdrop-blur-2xl flex items-center justify-center p-6"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-md rounded-[3rem] p-8 shadow-2xl border border-white/20"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Enter Invitation Code</h2>
                        <button onClick={() => {setShowKeypad(false); setEntryCode('');}} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex gap-2 justify-center mb-8">
                        {[0,1,2,3,4,5].map(i => (
                            <div key={i} className={`w-12 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${entryCode[i] ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 bg-slate-50 text-slate-200'}`}>
                                {entryCode[i] || '•'}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[1,2,3,4,5,6,7,8,9,'',0,'DEL'].map((val, idx) => (
                            <button 
                                key={idx}
                                onClick={() => val === 'DEL' ? setEntryCode(prev => prev.slice(0, -1)) : val !== '' && handleKeyPress(val)}
                                className={`h-16 rounded-2xl font-black text-xl flex items-center justify-center transition-all active:scale-95 ${val === '' ? 'pointer-events-none opacity-0' : 'bg-slate-50 text-slate-900 hover:bg-slate-100 active:bg-blue-600 active:text-white'}`}
                            >
                                {val}
                            </button>
                        ))}
                    </div>

                    <button 
                        disabled={entryCode.length < 6}
                        className="w-full py-6 bg-blue-600 disabled:bg-slate-200 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                    >
                        VERIFY & APPROVE
                    </button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const KioskButton = ({ icon: Icon, label, color, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 group overflow-hidden relative"
    >
        <div className={`p-6 rounded-[2rem] ${color} text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6`}>
            <Icon size={48} strokeWidth={2.5} />
        </div>
        <span className="font-black text-xl text-slate-900 uppercase tracking-tight">{label}</span>
        {/* Subtle Background Glow */}
        <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${color} opacity-5 blur-[40px] rounded-full`} />
    </button>
);

const LogEntry = ({ name, flat, status, time, icon: Icon, color }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group hover:bg-white transition-all border border-transparent hover:border-slate-100">
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm ${color}`}>
                <Icon size={18} strokeWidth={3} />
            </div>
            <div>
                <p className="font-black text-sm text-slate-900">{name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{flat} • {status}</p>
            </div>
        </div>
        <span className="text-xs font-black text-slate-400">{time}</span>
    </div>
);

export default GateSecurity;
