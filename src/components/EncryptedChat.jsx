import React, { useState } from 'react';
import { Send, Hash, Lock, Search, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const EncryptedChat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages] = useState([
     { id: 1, user: 'Secretary', body: 'The new water sensors are now active in the Audit tab.', time: '10:30 AM' },
     { id: 2, user: 'John D.', body: 'Thanks! The P&L looks much better this month.', time: '10:45 AM' },
     { id: 3, user: 'Security', body: 'Visitor pass SCAN-92 verified for Flat B-1402.', time: '11:00 AM' }
  ]);

  return (
    <div className="h-[600px] glass-card border-white/10 flex overflow-hidden">
        {/* Channels Sidebar */}
        <div className="w-64 border-r border-white/10 flex flex-col bg-white/5">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h4 className="font-black text-xs uppercase tracking-widest">Community</h4>
                <Lock size={12} className="text-emerald-500" />
            </div>
            <div className="flex-1 p-2 space-y-1">
                <ChannelItem active={activeChannel === 'general'} onClick={() => setActiveChannel('general')} label="General" />
                <ChannelItem active={activeChannel === 'security'} onClick={() => setActiveChannel('security')} label="Security Alerts" />
                <ChannelItem active={activeChannel === 'marketplace'} onClick={() => setActiveChannel('marketplace')} label="Marketplace" />
                <div className="pt-4 px-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Direct Messages</p>
                    <DMItem name="Alice (Admin)" status="online" />
                    <DMItem name="Officer Singh" status="offline" />
                </div>
            </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                    <Hash size={18} className="text-slate-500" />
                    <h4 className="font-bold text-sm tracking-tight capitalize">{activeChannel} Chat</h4>
                </div>
                <div className="flex gap-4">
                    <Search size={18} className="text-slate-500 cursor-pointer" />
                    <MoreVertical size={18} className="text-slate-500 cursor-pointer" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 space-y-6 overflow-auto bg-gradient-to-b from-[#020617] to-transparent">
                {messages.map(msg => (
                    <div key={msg.id} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-[10px] text-slate-500 border border-white/10">
                            {msg.user[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-black text-emerald-400">{msg.user}</span>
                                <span className="text-[10px] text-slate-600 font-bold">{msg.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{msg.body}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-0">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2 flex items-center gap-3">
                    <div className="p-2 hover:bg-white/5 rounded-lg text-slate-600 cursor-pointer">
                        <Paperclip size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder={`Message #${activeChannel}`} 
                        className="bg-transparent border-none outline-none text-sm w-full py-2"
                    />
                    <div className="flex gap-2 pr-2">
                        <div className="p-2 hover:bg-white/5 rounded-lg text-slate-600 cursor-pointer">
                            <Smile size={18} />
                        </div>
                        <button className="p-2 bg-emerald-500 text-black rounded-lg hover:scale-105 active:scale-95 transition-all">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
                <p className="text-[8px] text-center text-slate-600 font-bold uppercase mt-2 flex items-center justify-center gap-1">
                   <Lock size={8} /> End-to-End Encrypted Node: UNITY-SEC-09
                </p>
            </div>
        </div>
    </div>
  );
};

const ChannelItem = ({ active, label, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold transition-all ${active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:bg-white/5'}`}
    >
        <Hash size={14} className={active ? 'text-emerald-400' : 'text-slate-600'} />
        {label}
    </button>
);

const DMItem = ({ name, status }) => (
    <div className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/5 group">
        <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200">{name}</span>
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'online' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
    </div>
);

export default EncryptedChat;
