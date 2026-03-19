import React, { useState } from 'react';
import { Video, Mic, MessageSquare, Users, Settings, X, Shield, PhoneOff, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VirtualMeeting = ({ meeting, onExit }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] bg-black text-white flex flex-col font-mono">
        {/* Header */}
        <div className="glass-nav h-16 flex items-center px-6 justify-between bg-white/5 backdrop-blur-3xl border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="bg-rose-500/20 text-rose-500 px-3 py-1 rounded-md text-[10px] font-black uppercase flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></div>
                    Recording LIVE
                </div>
                <div>
                   <h2 className="font-bold text-sm tracking-tight">{meeting?.title || 'Annual General Meeting (AGM) 2026'}</h2>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Skyline Heights • 12 Active Participants</p>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                    <Settings size={20} />
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button onClick={onExit} className="p-2 bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors">
                    <PhoneOff size={20} />
                </button>
            </div>
        </div>

        {/* Video Grid Simulation */}
        <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-auto">
            <VideoParticipant name="Secretary (Host)" role="Moderator" self />
            <VideoParticipant name="Treasurer" />
            <VideoParticipant name="Block B Rep" />
            <div className="md:col-span-2 relative bg-white/5 rounded-3xl border border-white/5 flex flex-col items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                   <Users size={40} className="text-slate-600" />
                </div>
                <h4 className="text-lg font-bold relative z-10">Agenda: Budget Approval 2026</h4>
                <p className="text-slate-500 text-sm relative z-10">Sharing active document...</p>
                <div className="absolute top-4 right-4">
                    <button className="p-2 bg-black/40 hover:bg-black/60 rounded-lg">
                        <Maximize2 size={16} />
                    </button>
                </div>
            </div>
            <VideoParticipant name="John Doe (You)" cameraOff={isCameraOff} />
        </div>

        {/* Controls Bar */}
        <div className="h-24 bg-[#0a0f1d] border-t border-white/5 flex items-center justify-center gap-6 relative z-20">
            <ControlButton 
                icon={isMuted ? <Mic size={24} className="text-rose-500"/> : <Mic size={24}/>} 
                active={isMuted} 
                onClick={() => setIsMuted(!isMuted)} 
                label={isMuted ? 'Unmute' : 'Mute'} 
            />
            <ControlButton 
                icon={isCameraOff ? <Video size={24} className="text-rose-500"/> : <Video size={24}/>} 
                active={isCameraOff} 
                onClick={() => setIsCameraOff(!isCameraOff)} 
                label={isCameraOff ? 'Start Video' : 'Stop Video'} 
            />
            <div className="w-px h-10 bg-white/10 mx-4"></div>
            <ControlButton icon={<MessageSquare size={24}/>} label="Chat" />
            <ControlButton icon={<Users size={24}/>} label="Participants" count="12" />
            <div className="w-px h-10 bg-white/10 mx-4"></div>
            <button className="px-8 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all">
                Raise Hand
            </button>
        </div>
      </div>
    </AnimatePresence>
  );
};

const VideoParticipant = ({ name, role, self, cameraOff }) => (
    <div className={`relative bg-white/5 rounded-2xl border border-white/10 aspect-video flex flex-col items-center justify-center overflow-hidden group`}>
        {cameraOff ? (
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center font-black text-slate-500 border border-white/10 shadow-2xl">
                {name[0]}
            </div>
        ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users size={32} className="text-white/20" />
            </div>
        )}
        <div className="absolute bottom-3 left-3 bg-black/40 px-2 py-0.5 rounded text-[10px] font-bold text-slate-300">
            {name} {role && <span className="text-emerald-500 ml-1">• {role}</span>}
        </div>
        {!self && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-black/50 rounded-md hover:bg-rose-500 transition-colors">
                    <Mic size={12} />
                </button>
            </div>
        )}
    </div>
);

const ControlButton = ({ icon, label, active, onClick, count }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-all group"
    >
        <div className={`p-3 rounded-xl transition-all ${active ? 'bg-rose-500/20 border-rose-500/30' : 'bg-white/5 border border-white/5 hover:bg-white/10'}`}>
            {icon}
            {count && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] font-black px-1.5 rounded-full border border-black">{count}</span>
            )}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
);

export default VirtualMeeting;
