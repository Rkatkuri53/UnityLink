import React, { useState } from 'react';
import { Home, Key, ArrowUpRight, Bed, Bath, Move, Tag, Filter, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PropertyListings = () => {
  const [filter, setFilter] = useState('All');

  const listings = [
    { id: 1, type: 'Rent', unit: 'C-804', config: '3 BHK', size: '1850 sqft', price: '₹45,000/mo', tags: ['Unfurnished', 'Available Now'] },
    { id: 2, type: 'Sale', unit: 'A-2201', config: '4 BHK', size: '2600 sqft', price: '₹3.2 Cr', tags: ['Park View', 'Luxury Interior'] },
    { id: 3, type: 'Rent', unit: 'B-1402', config: '2 BHK', size: '1200 sqft', price: '₹32,000/mo', tags: ['Studio Type', 'Ready Move'] },
  ];

  const filtered = filter === 'All' ? listings : listings.filter(l => l.type === filter);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
            Prop-Tech Hub
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Internal Marketplace for Unit Rentals & Sales
           </p>
        </div>
        <button className="glow-btn flex items-center gap-2">
            <Plus size={16} /> List Property
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
          {['All', 'Rent', 'Sale'].map(t => (
            <button 
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-slate-500 hover:text-white'}`}
            >
                {t}
            </button>
          ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
            <motion.div 
                key={item.id} layout
                className="glass-card overflow-hidden border-white/5 group hover:border-amber-500/30 transition-all"
            >
                <div className="h-40 bg-gradient-to-br from-slate-800 to-black p-6 flex items-center justify-center relative">
                    <Home size={64} className="text-white/10 group-hover:scale-110 group-hover:text-amber-500/20 transition-all duration-1000" />
                    <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.type}
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-xl font-black">{item.unit}</h4>
                            <p className="text-[10px] text-slate-500 font-bold uppercase">{item.config} • {item.size}</p>
                        </div>
                        <p className="text-lg font-black text-amber-500">{item.price}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-400">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/5">
                        <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <ArrowUpRight size={12}/> Details
                        </button>
                        <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <Key size={12}/> Tour
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      <div className="glass-card p-6 bg-slate-500/5 border-white/10 border-dashed text-center cursor-pointer hover:bg-white/5 transition-all">
          <p className="text-[10px] font-black uppercase text-slate-500 mb-2">Move-in/Move-out Desk</p>
          <h4 className="text-sm font-bold flex items-center justify-center gap-2">
            <Move size={16} /> Request NOC & Clearance Certificate
          </h4>
      </div>
    </div>
  );
};

export default PropertyListings;
