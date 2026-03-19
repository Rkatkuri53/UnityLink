import React from 'react';
import { X, ShieldCheck, Download, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BillViewer = ({ bill, onClose }) => {
  if (!bill) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-4xl w-full glass-card overflow-hidden flex flex-col max-h-full"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-black p-1.5 rounded-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="font-bold leading-tight">{bill.desc}</h3>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Verified Transaction • ID {bill.id}00X42
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Bill Body */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#0a0f1d]">
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Mock Bill Image / Box */}
              <div className="aspect-[1/1.4] w-full bg-white text-black p-8 shadow-2xl relative">
                  <div className="absolute top-0 right-0 p-4 font-black uppercase text-[10px] text-slate-300 -rotate-45">UNITYLINK AUDIT COPY</div>
                  
                  <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-8">
                      <div>
                          <h4 className="text-3xl font-black mb-1">INVOICE</h4>
                          <p className="text-sm text-slate-500">Bill Date: {bill.date}</p>
                      </div>
                      <div className="text-right">
                          <p className="font-bold">Vertex Maintenance Corp.</p>
                          <p className="text-xs text-slate-500">Service ID: #88721</p>
                      </div>
                  </div>

                  <div className="space-y-4 mb-24">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm font-medium">Description</span>
                          <span className="text-sm font-bold">{bill.desc}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-sm font-medium">Category</span>
                          <span className="text-sm font-bold uppercase">{bill.category}</span>
                      </div>
                  </div>

                  <div className="flex justify-between items-end">
                      <div className="text-[10px] text-slate-400">
                          <p>Digitally verified by UnityLink</p>
                          <p>on Mar 18, 2026, 14:02 IST</p>
                      </div>
                      <div className="text-right">
                          <p className="text-xs uppercase font-black text-slate-400">Total Amount</p>
                          <p className="text-4xl font-black">${bill.amount}.00</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold transition-all">
                <Printer size={16} /> Print
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-black rounded-lg text-sm font-black transition-all hover:brightness-110">
                <Download size={16} /> Download PDF
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BillViewer;
