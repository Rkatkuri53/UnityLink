import React, { useState, useEffect } from 'react';
import { Droplets, Fuel, Zap, Activity, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import SocketService from '../services/socketService';

const IoTDashboard = () => {
  const [waterLevel, setWaterLevel] = useState(72);
  const [fuelLevel, setFuelLevel] = useState(45);

  useEffect(() => {
    SocketService.start();
    SocketService.on('iot_update', (data) => {
        if (data.type === 'water') setWaterLevel(data.value);
        if (data.type === 'fuel') setFuelLevel(data.value);
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-400 rounded-full"></span>
            Smart Infrastructure (IoT)
           </h3>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
             Real-Time Resource Monitoring • Gateway ID {Math.random().toString(36).substring(7).toUpperCase()}
           </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Sensors Online (Sync Active)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IoTCard 
            icon={<Droplets size={24}/>} 
            title="Main Water Tank" 
            value={`${waterLevel}%`} 
            desc="Sufficient for 14 hours" 
            color="blue"
            level={waterLevel}
        />
        <IoTCard 
            icon={<Fuel size={24}/>} 
            title="DG Generator Fuel" 
            value={`${fuelLevel}%`} 
            desc="Last Refill: 4 days ago" 
            color="amber"
            level={fuelLevel}
        />
        <IoTCard 
            icon={<Zap size={24}/>} 
            title="Common Area Load" 
            value="14.2 kW" 
            desc="Peak Usage: 18:00 - 21:00" 
            color="emerald"
            level={65}
        />
      </div>

      <div className="glass-card p-6 border-white/5 bg-slate-500/5">
          <div className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl text-slate-400">
                  <Activity size={24} />
              </div>
              <div className="flex-1">
                  <h4 className="font-bold mb-1">Consumption Analytics</h4>
                  <p className="text-xs text-slate-500 mb-4">Daily resource usage patterns for March 2026.</p>
                  <div className="h-24 flex items-end gap-1 px-2">
                      {[40, 60, 45, 80, 55, 70, 90, 40, 60, 85, 45, 70, 50, 65, 80, 40, 55].map((h, i) => (
                          <motion.div 
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              className={`flex-1 rounded-t-sm ${i === 12 ? 'bg-blue-400' : 'bg-white/10'}`}
                          />
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const IoTCard = ({ icon, title, value, desc, color, level }) => {
    const colors = {
        blue: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
        amber: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
        emerald: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5'
    };
    
    return (
        <div className={`glass-card p-6 border ${colors[color]} relative overflow-hidden group`}>
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-xl transition-transform group-hover:scale-110">
                    {icon}
                </div>
                <RefreshCw size={14} className="text-slate-500 cursor-pointer hover:rotate-180 transition-all duration-500" />
            </div>
            
            <div className="mb-4">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{title}</p>
                <h4 className="text-3xl font-black">{value}</h4>
            </div>

            <div className="space-y-3">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        className={`h-full rounded-full ${color === 'blue' ? 'bg-blue-400' : color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                    {level < 30 ? <AlertTriangle size={10} className="text-rose-500" /> : <Activity size={10} className="text-emerald-500" />}
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default IoTDashboard;
