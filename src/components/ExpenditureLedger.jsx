import React, { useState } from 'react';
import { Landmark, FileText, ChevronRight, Eye, Download, Search, Filter } from 'lucide-react';

const expenditures = [
  { id: 1, date: 'Mar 18, 2026', desc: 'Main Gate Painting', amount: 850, category: 'Maintenance', billUrl: 'bill1.jpg', approved: true },
  { id: 2, date: 'Mar 15, 2026', desc: 'Emergency Plumbing - Block A', amount: 120, category: 'Repairs', billUrl: 'bill2.jpg', approved: true },
  { id: 3, date: 'Mar 10, 2026', desc: 'Garden Monthly Upkeep', amount: 300, category: 'Landscaping', billUrl: 'bill3.jpg', approved: true }
];

const ExpenditureLedger = ({ onViewBill }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Transparency Ledger
        </h3>
        <div className="flex gap-2">
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Search size={14} className="text-slate-500" />
                <input type="text" placeholder="Search expenses..." className="bg-transparent border-none outline-none text-xs w-32" />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10">
                <Filter size={14} />
            </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {expenditures.map(exp => (
              <tr key={exp.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 text-xs font-medium text-slate-400">{exp.date}</td>
                <td className="px-6 py-4 text-sm font-bold">{exp.desc}</td>
                <td className="px-6 py-4">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 font-bold uppercase">
                    {exp.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-black text-emerald-400">${exp.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => onViewBill(exp)}
                      className="p-2 hover:bg-emerald-500/20 hover:text-emerald-400 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenditureLedger;
