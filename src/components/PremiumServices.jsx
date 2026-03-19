import React, { useState } from 'react';
import { Sparkles, Trash2, Paintbrush, Hammer, Bug, ShoppingCart, Tag, Star, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const PremiumServices = () => {
  const services = [
    { id: 1, name: 'Deep Home Cleaning', icon: <Sparkles />, price: 'From ₹1,499', commission: '10% to Society', rating: 4.9, image: 'https://images.unsplash.com/photo-1581578731548-c64695ce6958' },
    { id: 2, name: 'Eco-Pest Control', icon: <Bug />, price: 'From ₹699', commission: '₹50 to Society', rating: 4.8, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a' },
    { id: 3, name: 'Express Painting', icon: <Paintbrush />, price: 'Quote on App', commission: '5% to Society', rating: 4.7, image: 'https://images.unsplash.com/photo-1589939705384-5185138a04b1' },
    { id: 4, name: 'Handyman / Repairs', icon: <Hammer />, price: '₹199 / Visit', commission: 'Service Fee Only', rating: 4.6, image: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a' },
  ];

  const handleBook = (name) => {
    toast.success(`Booking request sent for ${name}. Vendor will contact you shortly.`);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
            Premium Home Services
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Curated Professionals • Exclusive Society Rates
           </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 rounded-lg">
            <Tag size={14} /> 20% Discount for Skyline Residents
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map(service => (
            <motion.div 
                key={service.id}
                whileHover={{ y: -4 }}
                className="glass-card overflow-hidden border-white/5 flex group cursor-pointer"
                onClick={() => handleBook(service.name)}
            >
                <div className="w-1/3 relative h-48 md:h-auto">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">{service.icon}</span>
                            <span className="text-[10px] font-black uppercase text-slate-500">{service.name}</span>
                        </div>
                        <h4 className="text-xl font-black mb-1">{service.price}</h4>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter mb-4">{service.commission}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                             <Star size={12} className="fill-amber-500" /> {service.rating}
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1 text-white group-hover:gap-2 transition-all">
                            Book Now <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        ))}
      </div>

      <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <ShoppingCart size={32} className="text-black" />
              </div>
              <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-black mb-2 uppercase">Revenue Contribution</h4>
                  <p className="text-sm text-slate-400 max-w-lg">Home services generated <span className="text-emerald-500 font-black">₹14,500</span> for the society corpus this month. This covers 40% of our elevator AMC costs!</p>
              </div>
              <button className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-xl hover:bg-emerald-500 transition-all shadow-xl">
                  View Earnings Report
              </button>
          </div>
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
      </div>
    </div>
  );
};

export default PremiumServices;
