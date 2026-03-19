import React, { useState } from 'react';
import { QrCode, Truck, Check, Timer, History, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WasteManagement = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: Idle, 1: Scanning, 2: Success

  const handleScan = () => {
    setIsScanning(true);
    setScanStep(1);
    // Simulate QR reading delay
    setTimeout(() => {
      setScanStep(2);
      setTimeout(() => {
        setIsScanning(false);
        setScanStep(0);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
          Waste Collection Service
        </h3>
        <div className="flex gap-2">
            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-500/20">
                Truck Nearby (200m)
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Scanner Simulator */}
        <div className="md:col-span-2 glass-card p-8 border-white/5 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Truck size={200} />
          </div>

          <AnimatePresence mode="wait">
            {scanStep === 0 && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 group cursor-pointer hover:border-emerald-500/50 transition-all" onClick={handleScan}>
                  <QrCode size={40} className="text-slate-400 group-hover:text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold mb-2">Scan Truck QR</h4>
                <p className="text-sm text-slate-500 max-w-xs mx-auto mb-6">Scan the large QR code on the side of the garbage truck to log your collection and verify your Green Ticket.</p>
                <button className="glow-btn px-12" onClick={handleScan}>Start Scanning</button>
              </motion.div>
            )}

            {scanStep === 1 && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-8">
                    {/* QR Frame Simulation */}
                    <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-2xl"></div>
                    <motion.div 
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_15px_#10b981]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <QrCode size={80} className="text-white/20" />
                    </div>
                </div>
                <p className="text-emerald-500 font-black animate-pulse uppercase tracking-widest text-xs">Communicating with Truck ID #SH-992...</p>
              </motion.div>
            )}

            {scanStep === 2 && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_#10b98144]">
                  <Check size={40} className="text-black" />
                </div>
                <h4 className="text-2xl font-black mb-2">Collection Logged!</h4>
                <p className="text-slate-400 text-sm mb-4">Dry Waste verified by Collector Robert. You earned <span className="text-emerald-400 font-bold">5 Eco-Points</span>.</p>
                <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5 text-[10px] font-bold uppercase text-slate-500">
                    <Timer size={14} /> Next Collection: Tomorrow 8:00 AM
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Recent Logs</h4>
            <div className="glass-card p-4 space-y-4">
                <LogItem date="Yesterday" type="Mixed" status="Logged" />
                <LogItem date="17 Mar" type="Dry" status="Logged" />
                <LogItem date="16 Mar" type="Wet" status="Logged" />
                <button className="w-full py-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <History size={14} /> Full History
                </button>
            </div>

            <div className="glass-card p-4 bg-amber-500/5 border-amber-500/20">
                <div className="flex gap-3">
                    <AlertCircle size={20} className="text-amber-500 shrink-0" />
                    <div>
                        <p className="text-xs font-bold mb-1">Missed Collection?</p>
                        <p className="text-[10px] text-slate-400 leading-normal">If you scanned but it's not showing, or if the truck missed you, raise a ticket here.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const LogItem = ({ date, type, status }) => (
    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
        <div>
            <p className="font-bold">{type} Waste</p>
            <p className="text-[10px] text-slate-500 uppercase font-black">{date}</p>
        </div>
        <span className="text-[10px] font-black text-emerald-500">{status}</span>
    </div>
);

export default WasteManagement;
