import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, CheckCircle2, AlertCircle, Sparkles, Plus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DataService from '../services/dataService';

const AmenityHub = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await DataService.getAmenities();
            setAmenities(data || []);
        } catch (err) {
            console.error("Amenity Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  const handleBook = (amenity) => {
    toast.success(`Booking request sent for ${amenity.name}`);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            Facility & Amenity Hub
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Smart scheduling & rule-based resource usage
           </p>
        </div>
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
            <button onClick={() => setActiveTab('book')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'book' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>Discover</button>
            <button onClick={() => setActiveTab('mine')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'mine' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}>My Bookings</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'book' && (
            <motion.div 
                key="book" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {amenities.map(item => (
                    <div key={item.id} className="glass-card overflow-hidden border-white/5 flex flex-col group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75 group-hover:brightness-100" />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-white border border-white/20">
                                <Star size={10} className="inline fill-amber-500 text-amber-500 mr-1 mb-0.5" /> {item.rating}
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-black">{item.name}</h4>
                                    <span className="text-[10px] font-black uppercase text-blue-400">{item.rate}</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                            </div>
                            <button 
                                onClick={() => handleBook(item)}
                                className="w-full py-4 bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Check Availability
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        )}

        {activeTab === 'mine' && (
            <motion.div 
                key="mine" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
            >
                {bookings.map(b => (
                    <div key={b.id} className="glass-card p-6 border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold">{b.item}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase">
                                    <span>{b.date}</span>
                                    <span>•</span>
                                    <span>{b.slot}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className={`text-[10px] font-black uppercase ${b.status === 'Confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {b.status}
                            </span>
                            <button className="p-2 hover:bg-white/10 rounded-lg text-slate-500 hover:text-rose-500 transition-colors">
                                <AlertCircle size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 bg-amber-500/5 border-amber-500/20">
              <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-amber-500" />
                  <h4 className="text-sm font-bold">Booking Rules</h4>
              </div>
              <ul className="text-[10px] text-slate-500 space-y-2 uppercase font-bold">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"></div> Max 2 hours per day per unit.</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"></div> Cancellation allowed up to 4h before slot.</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-amber-500 rounded-full"></div> Dues must be cleared for premium facilities.</li>
              </ul>
          </div>
          <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5 relative overflow-hidden group">
              <Sparkles className="absolute top-2 right-2 text-blue-500/20 group-hover:text-blue-500 transition-all" size={40} />
              <h4 className="text-sm font-black mb-2 uppercase">Amenity Pass</h4>
              <p className="text-2xl font-black mb-1">PRO Membership</p>
              <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Unlimited gym & pool access enabled.</p>
          </div>
      </div>
    </div>
  );
};

export default AmenityHub;
