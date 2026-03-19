import React, { useState } from 'react';
import { UserPlus, Calendar, Clock, MapPin, Share2, Shield, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const VisitorInvite = () => {
  const [form, setForm] = useState({ name: '', date: '', time: '', type: 'Guest' });
  const [generatedInvite, setGeneratedInvite] = useState(null);

  const handleGenerate = () => {
    // Mock invite generation
    setGeneratedInvite({
        id: 'INV-' + Math.floor(Math.random() * 90000 + 10000),
        ...form,
        qrCode: 'mock-qr-payload'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Quick Visitor Invite
        </h3>
        <Shield size={20} className="text-slate-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {!generatedInvite ? (
            <div className="glass-card p-8 space-y-6 animate-in slide-in-from-left duration-300">
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Guest Full Name</label>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                            <UserPlus size={18} className="text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="e.g. Michael Chen" 
                                className="bg-transparent border-none outline-none text-sm w-full"
                                value={form.name}
                                onChange={e => setForm({...form, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Arrival Date</label>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                                <Calendar size={18} className="text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="Today" 
                                    className="bg-transparent border-none outline-none text-xs w-full"
                                    value={form.date}
                                    onChange={e => setForm({...form, date: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Approx. Time</label>
                            <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center gap-3">
                                <Clock size={18} className="text-slate-400" />
                                <input 
                                    type="text" 
                                    placeholder="18:30" 
                                    className="bg-transparent border-none outline-none text-xs w-full"
                                    value={form.time}
                                    onChange={e => setForm({...form, time: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Visitor Type</label>
                        <div className="flex gap-2">
                            {['Guest', 'Helper', 'Delivery'].map(type => (
                                <button 
                                    key={type}
                                    onClick={() => setForm({...form, type})}
                                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${form.type === type ? 'bg-blue-500 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button 
                    disabled={!form.name}
                    className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${form.name ? 'bg-blue-500 text-white shadow-[0_0_20px_#3b82f644] active:scale-95' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}
                    onClick={handleGenerate}
                >
                    Generate Visitor Pass
                </button>
            </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 border-blue-500/20 relative group"
            >
                <div className="absolute top-0 right-0 p-4">
                    <button className="text-[10px] font-black uppercase text-slate-500 hover:text-white" onClick={() => setGeneratedInvite(null)}>Cancel</button>
                </div>

                <div className="text-center mb-8">
                    <div className="bg-white p-4 rounded-2xl inline-block shadow-[0_0_30px_#fff3] mb-6">
                        <QrCode size={180} className="text-black" />
                    </div>
                    <h3 className="text-2xl font-black mb-1">{generatedInvite.name}</h3>
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{generatedInvite.id} • {generatedInvite.type}</p>
                </div>

                <div className="border-t border-dashed border-white/10 pt-6 space-y-3">
                    <InfoRow icon={<Calendar size={14}/>} label="Valid On" value={generatedInvite.date || 'Today'} />
                    <InfoRow icon={<Clock size={14}/>} label="Time" value={generatedInvite.time || 'Immediate access'} />
                    <InfoRow icon={<MapPin size={14}/>} label="Location" value="Main Gate A, Skyline" />
                </div>

                <div className="mt-8 flex gap-3">
                    <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                        <Download size={16} /> Save Image
                    </button>
                    <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_#3b82f644] active:scale-95">
                        <Share2 size={16} /> Share Pass
                    </button>
                </div>
            </motion.div>
        )}

        <div className="space-y-6">
            <div>
                <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2 mb-4">Security Protocol</h4>
                <div className="glass-card p-6 space-y-4">
                    <div className="flex gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold mb-1">Single Entry Only</p>
                            <p className="text-[10px] text-slate-500 leading-normal">This pass is valid for one entry/exit cycle. For regular staff, use the Helper module.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold mb-1">Time Restricted</p>
                            <p className="text-[10px] text-slate-500 leading-normal">Guests will be notified if arriving more than 2 hours outside their window.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 border-white/5 flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-bold">Expecting a Delivery?</h4>
                    <p className="text-xs text-slate-500">Auto-approve frequent delivery apps.</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-slate-500 rounded-full"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
            {icon} {label}
        </div>
        <span className="text-xs font-bold">{value}</span>
    </div>
);

export default VisitorInvite;
