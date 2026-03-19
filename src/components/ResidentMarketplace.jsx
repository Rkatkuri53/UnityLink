import React, { useState } from 'react';
import { ShoppingBag, Calendar, Star, ChevronRight, User, Phone, MapPin, Search, Filter, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResidentMarketplace = () => {
  const [activeTab, setActiveTab] = useState('browse'); // browse, my-business
  const [businesses] = useState([
    { id: 1, name: "The Gourmet Crust", owner: "Aditi S.", type: "Food", rating: 4.8, desc: "Artisan sourdough and healthy desserts baked at Home B-1402.", priceRange: "$$" },
    { id: 2, name: "Zen Yoga Studio", owner: "Sarah M.", type: "Wellness", rating: 4.9, desc: "Group and private yoga sessions catering to all age groups.", priceRange: "$" },
    { id: 3, name: "Digital Fixers", owner: "Rahul K.", type: "Tech", rating: 4.5, desc: "Laptops, mobiles and gadgets repair within 2 hours.", priceRange: "$$$" }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Community Marketplace
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Support Your Neighbors • Hyper-Local Economy
           </p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setActiveTab('browse')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'browse' ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500'}`}
            >
                Browse
            </button>
            <button 
                onClick={() => setActiveTab('my-business')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'my-business' ? 'bg-white/10 text-white border border-white/20' : 'text-slate-500'}`}
            >
                Manage My Business
            </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
          {activeTab === 'browse' ? (
              <motion.div 
                key="browse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                  <div className="flex gap-3">
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3">
                          <Search size={20} className="text-slate-500" />
                          <input type="text" placeholder="What are you looking for today?" className="bg-transparent border-none outline-none text-sm w-full" />
                      </div>
                      <button className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 text-slate-400">
                          <Filter size={20} />
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {businesses.map(biz => (
                          <div key={biz.id} className="glass-card group cursor-pointer hover:border-emerald-500/30 transition-all">
                              <div className="h-40 bg-white/5 relative overflow-hidden flex items-center justify-center">
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
                                  <ShoppingBag size={48} className="text-white/5 group-hover:scale-110 transition-transform duration-500" />
                                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                      <div className="flex items-center gap-2 bg-emerald-500 text-black px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
                                          <Star size={10} fill="currentColor" /> {biz.rating}
                                      </div>
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{biz.type}</span>
                                  </div>
                              </div>
                              <div className="p-6">
                                  <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{biz.name}</h4>
                                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">{biz.desc}</p>
                                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                      <div className="flex items-center gap-2">
                                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                              {biz.owner.split(' ')[0][0]}{biz.owner.split(' ')[1][0]}
                                          </div>
                                          <div>
                                              <p className="text-[10px] font-black uppercase text-slate-500">By {biz.owner}</p>
                                              <p className="text-[10px] font-black text-emerald-500">{biz.priceRange}</p>
                                          </div>
                                      </div>
                                      <button className="p-2 rounded-full bg-white/5 hover:bg-emerald-500 hover:text-black transition-all">
                                          <ChevronRight size={16} />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))}
                      
                      <div className="glass-card border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center bg-transparent group hover:border-emerald-500/30 cursor-pointer" onClick={() => setActiveTab('my-business')}>
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 text-slate-500 group-hover:text-emerald-500 transition-colors">
                              <Plus size={24} />
                          </div>
                          <h4 className="font-bold text-slate-500 group-hover:text-emerald-400">Add Your Business</h4>
                          <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">Free for first 3 Months</p>
                      </div>
                  </div>
              </motion.div>
          ) : (
              <motion.div 
                key="manage" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                  <div className="lg:col-span-2 space-y-6">
                      <div className="glass-card p-12 text-center border-dashed border-white/10 bg-emerald-500/5">
                          <h3 className="text-3xl font-black mb-4 capitalize">Turn your hobby into a Business</h3>
                          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">Showcase your skills, manage bookings, and grow your local client base right here in {businesses[0]?.name ? 'Skyline Heights' : 'your society'}.</p>
                          <button className="glow-btn px-12">Setup Professional Profile</button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <MarketStat label="Total Reach" val="2,400 Residents" />
                          <MarketStat label="Commission" val="1.5% Standard" />
                      </div>
                  </div>

                  <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Business Features</h4>
                      <div className="glass-card p-6 space-y-4">
                          <FeatureItem icon={<Calendar size={18}/>} label="Auto-Booking" desc="Residents can book slots instantly from your calendar." />
                          <FeatureItem icon={<User size={18}/>} label="Client CRM" desc="Manage your relationships and service history." />
                          <FeatureItem icon={<MapPin size={18}/>} label="Cross-Society" desc="Optional: Show your services to nearby societies." />
                      </div>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

const MarketStat = ({ label, val }) => (
    <div className="glass-card p-6 border-white/5">
        <p className="text-[10px] font-black uppercase text-slate-500 mb-1">{label}</p>
        <p className="text-xl font-bold">{val}</p>
    </div>
);

const FeatureItem = ({ icon, label, desc }) => (
    <div className="flex gap-4">
        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-black uppercase tracking-tight mb-0.5">{label}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{desc}</p>
        </div>
    </div>
);

export default ResidentMarketplace;
