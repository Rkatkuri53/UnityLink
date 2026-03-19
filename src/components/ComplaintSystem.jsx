import React, { useState, useEffect } from 'react';
import { Megaphone, AlertCircle, Clock, CheckCircle2, User, ChevronRight, Plus, X, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DataService from '../services/dataService';
import { toast } from 'react-hot-toast';

const ComplaintSystem = () => {
  const [complaints, setComplaints] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
      category: 'Owner/Tenant',
      description: '',
      urgency: 'Medium'
  });

  const categories = [
      'Owner/Tenant', 'Children', 'Pets', 'Electrician/Plumber', 
      'Committee Member', 'Garbage Collector', 'Vendors/Deliveries', 'Noise/Nuisance'
  ];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await DataService.getComplaints();
            setComplaints(data || []);
        } catch (err) {
            console.error("Complaint Fetch Error:", err);
        }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await DataService.addComplaint(newComplaint);
        const data = await DataService.getComplaints();
        setComplaints(data);
        setShowModal(false);
        toast.success('Complaint Registered Successfully!');
    } catch (err) {
        toast.error('Failed to register complaint');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
            Grievance Redressal
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Digital Complaint System • Log ID #GC-882
           </p>
        </div>
        <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-rose-500/20"
        >
            <Plus size={16} /> File Complaint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComplaintStatCard label="Total Logged" value={complaints.length} color="slate" />
        <ComplaintStatCard label="Resolved" value={complaints.filter(c => c.status === 'Resolved').length} color="emerald" />
        <ComplaintStatCard label="Pending" value={complaints.filter(c => c.status === 'Pending').length} color="rose" />
      </div>

      <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Recent Activity</h4>
          <div className="space-y-3">
              {complaints.map(complaint => (
                  <div key={complaint.id} className="glass-card p-6 border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-white/20 transition-all">
                      <div className="flex gap-4">
                          <div className={`p-3 rounded-xl ${complaint.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                              <Megaphone size={20} />
                          </div>
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{complaint.category}</span>
                                  <span className="text-[10px] font-bold text-slate-700">• {new Date(complaint.time).toLocaleDateString()}</span>
                              </div>
                              <h4 className="font-bold text-white mb-1">{complaint.desc || complaint.description}</h4>
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">STATUS: <span className={complaint.status === 'Resolved' ? 'text-emerald-500' : 'text-rose-500'}>{complaint.status}</span> • ASSIGNED: {complaint.assignedTo || 'Unassigned'}</p>
                          </div>
                      </div>
                      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                          View Timeline <ChevronRight size={14} />
                      </button>
                  </div>
              ))}
          </div>
      </div>

      <AnimatePresence>
          {showModal && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                    className="w-full max-w-lg glass-card border-white/10 p-8 shadow-2xl relative"
                  >
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={20}/></button>
                        
                        <h3 className="text-2xl font-black mb-1">File a Complaint</h3>
                        <p className="text-sm text-slate-500 mb-8">This will be visible to the committee members for resolution.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Category of Nuisance</label>
                                <select 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-rose-500 outline-none appearance-none"
                                    value={newComplaint.category}
                                    onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                                >
                                    {categories.map(cat => <option key={cat} value={cat} className="bg-[#020617]">{cat}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Detailed Description</label>
                                <textarea 
                                    rows="4"
                                    placeholder="Describe the issue in detail..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-rose-500 outline-none resize-none"
                                    value={newComplaint.description}
                                    onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="flex gap-4">
                                <UrgencyBtn active={newComplaint.urgency === 'Low'} onClick={() => setNewComplaint({...newComplaint, urgency: 'Low'})} label="Low" />
                                <UrgencyBtn active={newComplaint.urgency === 'Medium'} onClick={() => setNewComplaint({...newComplaint, urgency: 'Medium'})} label="Medium" />
                                <UrgencyBtn active={newComplaint.urgency === 'High'} onClick={() => setNewComplaint({...newComplaint, urgency: 'High'})} label="High" />
                            </div>

                            <button className="w-full py-4 bg-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_#f43f5e33]">
                                Submit Complaint
                            </button>
                        </form>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>
    </div>
  );
};

const ComplaintStatCard = ({ label, value, color }) => {
    const colors = {
        slate: 'border-white/5 text-slate-400',
        emerald: 'border-emerald-500/10 text-emerald-500 bg-emerald-500/5',
        rose: 'border-rose-500/10 text-rose-500 bg-rose-500/5'
    };
    return (
        <div className={`glass-card p-6 border ${colors[color]}`}>
            <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">{label}</p>
            <h4 className="text-3xl font-black">{value}</h4>
        </div>
    );
};

const UrgencyBtn = ({ active, label, onClick }) => (
    <button 
        type="button"
        onClick={onClick}
        className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${active ? 'bg-white/10 text-white border-white/20' : 'border-white/5 text-slate-500 hover:text-slate-300'}`}
    >
        {label}
    </button>
);

export default ComplaintSystem;
