import React, { useState, useEffect } from 'react';
import { Megaphone, UserPlus, CheckCircle, Clock, Trash2, Filter, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import DataService from '../services/dataService';
import { toast } from 'react-hot-toast';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const staff = ['Security Head', 'Maintenance Mgr', 'Society Secretary', 'Plumber Team', 'Electrician Team'];

  useEffect(() => {
    const load = async () => {
        try {
            const data = await DataService.getComplaints();
            setComplaints(data || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };
    load();
  }, []);

  const handleAssign = (id, staffName) => {
    DataService.updateComplaint(id, { assignedTo: staffName });
    setComplaints(DataService.getComplaints());
    toast.success(`Assigned to ${staffName}`);
  };

  const handleResolve = (id) => {
    DataService.updateComplaint(id, { status: 'Resolved' });
    setComplaints(DataService.getComplaints());
    toast.success('Complaint marked as Resolved');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Grievance Back-Office
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Complaint Assignment & Resolution Workflow
           </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-white/10">
                    <th className="p-4">Resident</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 w-1/3">Issue</th>
                    <th className="p-4">Assigned To</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {complaints.map(c => (
                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-black">{c.resident || 'Unit B-101'}</td>
                        <td className="p-4">
                            <span className="text-[10px] font-black uppercase text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                                {c.category}
                            </span>
                        </td>
                        <td className="p-4 text-slate-400 leading-tight">
                            {c.desc || c.description}
                        </td>
                        <td className="p-4">
                            <select 
                                className="bg-transparent border border-white/10 rounded-md text-[10px] font-bold p-1 outline-none text-slate-300 focus:border-emerald-500"
                                value={c.assignedTo || ''}
                                onChange={(e) => handleAssign(c.id, e.target.value)}
                            >
                                <option value="" className="bg-[#020617]">Assign Staff...</option>
                                {staff.map(s => <option key={s} value={s} className="bg-[#020617]">{s}</option>)}
                            </select>
                        </td>
                        <td className="p-4">
                            <span className={`text-[10px] font-black uppercase flex items-center gap-1.5 ${c.status === 'Resolved' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {c.status === 'Resolved' ? <CheckCircle size={10}/> : <Clock size={10}/>}
                                {c.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex justify-end gap-2">
                               {c.status !== 'Resolved' && (
                                   <button 
                                        onClick={() => handleResolve(c.id)}
                                        className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg transition-colors border border-emerald-500/20"
                                        title="Mark Resolved"
                                   >
                                       <CheckCircle size={14} />
                                   </button>
                               )}
                               <button className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors border border-rose-500/20">
                                   <Trash2 size={14} />
                               </button>
                           </div>
                        </td>
                    </tr>
                ))}
            </tbody>
          </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 bg-blue-500/5 border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="text-blue-400" />
                  <h4 className="text-sm font-bold">Committee Review Required</h4>
              </div>
              <p className="text-xs text-slate-500 leading-normal">3 complaints involve "Committee Members" and require an external auditor signature as per Phase 3 bylaws.</p>
          </div>
          <div className="glass-card p-6 border-white/5 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Avg Resolution Time</p>
              <h4 className="text-3xl font-black">4.2 Hours</h4>
          </div>
      </div>
    </div>
  );
};

export default AdminComplaints;
