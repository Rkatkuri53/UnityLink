import React, { useState, useEffect } from 'react';
import { User, Users, Clock, Star, Phone, CheckCircle, Search, Plus, Filter, UserCheck, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DataService from '../services/dataService';
import { toast } from 'react-hot-toast';

const StaffManagement = () => {
  const [helpers, setHelpers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = DataService.getData();
    setHelpers(data.staff || []);
  }, []);

  const filtered = helpers.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Daily Help & Staff
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Track attendance & manage service professionals
           </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/10">
            <Plus size={16} /> Hire Staff
        </button>
      </div>

      <div className="flex gap-4">
          <div className="flex-1 glass-card p-4 border-white/5 bg-white/5 flex items-center gap-4">
              <Search className="text-slate-500" size={18} />
              <input 
                type="text" placeholder="Search by name or category..." 
                className="bg-transparent border-none outline-none text-sm w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          <button className="glass-card px-4 border-white/5 hover:border-white/20 transition-all">
              <Filter size={18} className="text-slate-400" />
          </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(helper => (
              <motion.div 
                key={helper.id}
                layout
                className="glass-card p-6 border-white/5 hover:border-emerald-500/30 transition-all group"
              >
                  <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                          <User size={28} />
                      </div>
                      <div className="flex-1">
                          <h4 className="font-bold text-white">{helper.name}</h4>
                          <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase text-emerald-500">{helper.role}</span>
                              <span className="text-[10px] text-slate-500 font-bold">• {helper.rating} <Star size={10} className="inline fill-amber-500 text-amber-500 mb-0.5" /></span>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Entry</p>
                          <p className="text-xs font-black text-white">{helper.entryTime}</p>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <span>Works at {helper.units.length} Units</span>
                          <span className="text-emerald-500 flex items-center gap-1"><ShieldCheck size={12}/> Police Verified</span>
                      </div>
                      <div className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                          <div className="flex-1 text-center border-r border-white/5">
                              <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Attendance</p>
                              <p className="text-xs font-black">24/30 Days</p>
                          </div>
                          <div className="flex-1 text-center">
                              <p className="text-[8px] font-black uppercase text-slate-500 mb-1">Dues</p>
                              <p className="text-xs font-black text-rose-500">₹4,200</p>
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                          <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-white/10">Call</button>
                          <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-white/10">Pay Salary</button>
                      </div>
                  </div>
              </motion.div>
          ))}
          
          <motion.div 
            className="glass-card p-6 border-dashed border-white/20 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/5"
            whileHover={{ scale: 1.02 }}
          >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 text-slate-500 group-hover:text-emerald-500 transition-colors">
                  <UserPlus size={24} />
              </div>
              <h4 className="font-bold text-sm mb-1 uppercase tracking-widest">Register New Staff</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Maid, Driver, Nanny, etc.</p>
          </motion.div>
      </div>

      <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
          <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl text-blue-400">
                  <UserCheck size={24} />
              </div>
              <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1">Society Verification Active</h4>
                  <p className="text-xs text-slate-400 leading-normal">All domestic staff must have a valid QR pass for entry. Police verification documents for Raju Kumar is expiring in 12 days.</p>
              </div>
              <button className="px-4 py-2 border border-blue-400/30 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-lg">Renew Now</button>
          </div>
      </div>
    </div>
  );
};

const UserPlus = ({ size, className }) => <Users size={size} className={className} />;

export default StaffManagement;
