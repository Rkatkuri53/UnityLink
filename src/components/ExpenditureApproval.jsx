import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Clock, FileText, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpenditureApproval = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, desc: 'Roof Waterproofing', amount: 245000, status: 'Pending', signatures: 1, required: 3, category: 'Infrastructure' },
    { id: 2, desc: 'New CCTV Cameras', amount: 85000, status: 'Approved', signatures: 1, required: 1, category: 'Security' },
    { id: 3, desc: 'Clubhouse Interior Polish', amount: 210000, status: 'Pending', signatures: 0, required: 3, category: 'Maintenance' }
  ]);

  const THRESHOLD = 200000;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
            Expenditure Approval Workflow
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Government Compliance: Threshold Locked @ ₹2,00,000
           </p>
        </div>
        <ShieldAlert className="text-amber-500" size={24} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {expenses.map(exp => (
          <div key={exp.id} className={`glass-card p-6 border transition-all ${exp.amount >= THRESHOLD ? 'border-amber-500/20 bg-amber-500/5' : 'border-white/5'}`}>
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${exp.amount >= THRESHOLD ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {exp.amount >= THRESHOLD ? <Lock size={20} /> : <Unlock size={20} />}
                        </div>
                        <div>
                            <h4 className="font-bold flex items-center gap-2">
                                {exp.desc}
                                {exp.amount >= THRESHOLD && (
                                    <span className="text-[8px] font-black uppercase bg-amber-500 text-black px-2 py-0.5 rounded-full">High Value</span>
                                )}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">{exp.category} • ID #{exp.id}00AD</p>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Amount</p>
                            <p className="text-2xl font-black">₹{exp.amount.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Status</p>
                            <div className="flex items-center gap-2 font-bold text-sm">
                                {exp.status === 'Pending' ? <Clock size={16} className="text-amber-400" /> : <CheckCircle2 size={16} className="text-emerald-400" />}
                                {exp.status}
                            </div>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-500 mb-1">Approvals</p>
                            <div className="flex items-center gap-1">
                                {[...Array(exp.required)].map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < exp.signatures ? 'bg-emerald-500' : 'bg-white/10'}`}></div>
                                ))}
                                <span className="text-xs font-bold ml-2 text-slate-400">{exp.signatures}/{exp.required} Signed</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex md:flex-col justify-end gap-2 shrink-0">
                    <button className="flex-1 md:flex-none px-6 py-2 bg-emerald-500 text-black text-xs font-black uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-[0_0_20px_#10b98133]">
                      Sign Resolution
                    </button>
                    <button className="flex-1 md:flex-none px-6 py-2 bg-white/5 border border-white/10 text-slate-400 text-xs font-black uppercase tracking-widest rounded-lg hover:bg-white/10">
                      Query Bill
                    </button>
                </div>
            </div>

            {exp.amount >= THRESHOLD && (
                <div className="mt-6 pt-6 border-t border-dashed border-white/10 flex items-center gap-3">
                    <div className="bg-rose-500/10 text-rose-500 p-2 rounded-lg">
                        <FileText size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-300">Mandatory Multi-Signatory Compliance</p>
                        <p className="text-[10px] text-slate-500">As per bye-laws, expenses exceeding ₹2 Lacs require 3 Committee Signatures + AGM Minute Link.</p>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenditureApproval;
