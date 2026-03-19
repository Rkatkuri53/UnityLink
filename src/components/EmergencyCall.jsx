import React, { useState } from 'react';
import { Phone, MessageSquare, ShieldAlert, HeartPulse, Flame, X, MapPin, Send, Mic, PhoneOutgoing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const EmergencyCall = ({ onExit }) => {
  const [activeService, setActiveService] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [mode, setMode] = useState('menu'); // 'menu', 'calling', 'messaging'

  const services = [
    { id: 'police', name: 'Police', icon: <ShieldAlert />, color: 'bg-blue-500', number: '100' },
    { id: 'ambulance', name: 'Ambulance', icon: <HeartPulse />, color: 'bg-rose-500', number: '108' },
    { id: 'fire', name: 'Fire Force', icon: <Flame />, color: 'bg-orange-500', number: '101' },
  ];

  const handleCall = (service) => {
    setActiveService(service);
    setMode('calling');
    setIsCalling(true);
    setTimeout(() => {
        setIsCalling(false);
        toast.error(`Call Simulation: Connected to ${service.name} Control Room`);
    }, 3000);
  };

  const handleMessage = (service) => {
    setActiveService(service);
    setMode('messaging');
  };

  return (
    <div className="fixed inset-0 z-[11000] bg-black/90 backdrop-blur-xl text-white flex flex-col font-mono">
        <div className="p-6 flex justify-between items-center bg-white/5 border-b border-white/10">
            <div>
                <h2 className="text-xl font-black uppercase tracking-tighter text-rose-500">Emergency Response</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Unity-Link Secure Gateway</p>
            </div>
            <button onClick={onExit} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
            </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
                {mode === 'menu' && (
                    <motion.div 
                        key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-md space-y-6"
                    >
                        {services.map(service => (
                            <div key={service.id} className="glass-card p-6 border-white/5 bg-slate-500/5 group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${service.color} text-white shadow-lg shadow-${service.color.split('-')[1]}-500/20`}>
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black">{service.name}</h3>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase">Direct Access: {service.number}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => handleCall(service)}
                                        className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-emerald-500 hover:text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <Phone size={14}/> Call Now
                                    </button>
                                    <button 
                                        onClick={() => handleMessage(service)}
                                        className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <MessageSquare size={14}/> Text Alert
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-center pt-8">
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                                <MapPin size={10} /> Broadcasting Location: Skyline Heights CHS, Block B
                            </p>
                        </div>
                    </motion.div>
                )}

                {mode === 'calling' && (
                    <motion.div 
                        key="calling" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="text-center space-y-12"
                    >
                        <div className="relative">
                            <div className={`w-32 h-32 rounded-full ${activeService.color} flex items-center justify-center mx-auto relative z-10 animate-pulse`}>
                                <Phone size={48} className="text-white" />
                            </div>
                            <div className={`absolute inset-0 w-32 h-32 rounded-full ${activeService.color} opacity-20 blur-xl scale-125 mx-auto animate-ping`}></div>
                        </div>
                        
                        <div>
                            <h3 className="text-3xl font-black mb-2">Dialing {activeService.name}...</h3>
                            <p className="text-lg font-bold text-slate-500">{activeService.number}</p>
                        </div>

                        <button 
                            onClick={() => setMode('menu')}
                            className="bg-rose-500 text-white px-12 py-4 rounded-full font-black uppercase text-xs tracking-widest shadow-2xl"
                        >
                            End Call
                        </button>
                    </motion.div>
                )}

                {mode === 'messaging' && (
                    <motion.div 
                        key="messaging" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="w-full max-w-md h-[400px] glass-card border-white/10 flex flex-col overflow-hidden"
                    >
                        <div className={`p-4 border-b border-white/10 flex items-center gap-3 ${activeService.color} text-white`}>
                            {activeService.icon}
                            <h4 className="font-black text-xs uppercase tracking-widest">{activeService.name} Alert System</h4>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-auto">
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3 max-w-[80%]">
                                <p className="text-xs text-slate-400">Please state the nature of your emergency.</p>
                            </div>
                            <div className="bg-emerald-500 text-black rounded-xl p-3 max-w-[80%] self-end ml-auto">
                                <p className="text-xs font-bold italic">Location Shared: B-1402, Skyline Heights.</p>
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/10 flex gap-2">
                            <input type="text" placeholder="Type quick alert..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-white/30" />
                            <button className="p-2 bg-emerald-500 text-black rounded-lg"><Send size={18}/></button>
                            <button className="p-2 bg-white/10 text-white rounded-lg"><Mic size={18}/></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        <div className="p-6 bg-rose-500/10 border-t border-rose-500/20 text-center">
            <p className="text-[8px] font-black uppercase text-rose-500 animate-pulse tracking-[0.2em]">
                All calls and messages from this module are prioritized by local network operators.
            </p>
        </div>
    </div>
  );
};

export default EmergencyCall;
