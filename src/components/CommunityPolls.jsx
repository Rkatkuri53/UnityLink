import React, { useState } from 'react';
import { PieChart, ListFilter, CheckCircle2, AlertCircle, BarChart, Plus, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const CommunityPolls = () => {
  const [activePoll, setActivePoll] = useState(1);
  const [voted, setVoted] = useState(false);

  const polls = [
    { 
        id: 1, 
        question: 'Should we upgrade the Pool Filtration system this month?', 
        options: [
            { label: 'Yes, urgently', votes: 142 },
            { label: 'Wait for next year', votes: 68 },
            { label: 'No, current is fine', votes: 12 }
        ],
        ends: '2 Days Left',
        total: 222
    },
    { 
        id: 2, 
        question: 'Suggest new color for Block B Lobby repaint.', 
        options: [
            { label: 'Modern Gray', votes: 45 },
            { label: 'Ivory White', votes: 98 },
            { label: 'Navy Theme', votes: 32 }
        ],
        ends: '5 Days Left',
        total: 175
    }
  ];

  const handleVote = (pollId) => {
    setVoted(true);
    toast.success('Vote Casted Successfully (Cryptographically Signed)');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
            Digital Referendums
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Community-driven decision making
           </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-lg">
            <Plus size={16} /> New Poll
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
              {polls.map(poll => (
                  <div key={poll.id} className="glass-card p-8 border-white/5 bg-slate-500/5 relative overflow-hidden">
                      {voted && poll.id === 1 && (
                          <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[8px] font-black uppercase border border-emerald-500/20 flex items-center gap-1">
                              <ShieldCheck size={10}/> Voted
                          </div>
                      )}
                      
                      <div className="flex items-start gap-4 mb-8">
                          <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                              <PieChart size={24} />
                          </div>
                          <div>
                              <h4 className="text-lg font-bold leading-tight">{poll.question}</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Governance ID: #PL-{poll.id} • {poll.ends}</p>
                          </div>
                      </div>

                      <div className="space-y-4">
                          {poll.options.map((opt, idx) => {
                              const percent = Math.round((opt.votes / poll.total) * 100);
                              return (
                                  <div key={idx} className="space-y-2 group cursor-pointer" onClick={() => handleVote(poll.id)}>
                                      <div className="flex justify-between text-xs font-bold font-mono">
                                          <span className="text-slate-300 group-hover:text-white transition-colors">{opt.label}</span>
                                          <span className="text-slate-500 group-hover:text-emerald-500 transition-colors">{percent}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                          <motion.div 
                                              initial={{ width: 0 }}
                                              animate={{ width: `${percent}%` }}
                                              className={`h-full ${voted ? 'bg-emerald-500/40' : 'bg-purple-500/40'} group-hover:bg-purple-500 transition-all`}
                                          />
                                      </div>
                                  </div>
                              );
                          })}
                      </div>

                      <div className="mt-8 flex items-center justify-between">
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{poll.total} Total Votes Casted</p>
                          <button className="text-[10px] font-black uppercase text-purple-400 hover:text-white transition-colors">View Audit Log</button>
                      </div>
                  </div>
              ))}
          </div>

          <div className="space-y-6">
              <div className="glass-card p-6 border-white/5 bg-white/5">
                  <div className="flex items-center gap-3 mb-4">
                      <BarChart className="text-purple-400" />
                      <h4 className="text-sm font-bold">Quorum Requirements</h4>
                  </div>
                  <div className="space-y-4">
                      <QuorumItem label="Maintenance Rule" status={65} required={50} />
                      <QuorumItem label="Committee Election" status={12} required={75} />
                  </div>
              </div>
              <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
                  <div className="flex items-start gap-4">
                      <AlertCircle className="text-amber-500 mt-1" size={20} />
                      <div>
                          <h4 className="text-xs font-black uppercase mb-1">Active Mandate</h4>
                          <p className="text-[10px] text-slate-500 leading-relaxed font-bold">New Garbage Collection Fee proposed. Vote before Midnight, March 20.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const QuorumItem = ({ label, status, required }) => (
    <div>
        <div className="flex justify-between text-[10px] font-black uppercase mb-1">
            <span className="text-slate-500">{label}</span>
            <span className={status >= required ? 'text-emerald-500' : 'text-rose-500'}>{status}% / {required}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full">
            <div className={`h-full rounded-full ${status >= required ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${(status/required)*100}%` }}></div>
        </div>
    </div>
);

export default CommunityPolls;
