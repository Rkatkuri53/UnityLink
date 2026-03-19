import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GreenTicket from '../components/GreenTicket';
import NoticeBoard from '../components/NoticeBoard';
import ExpenditureLedger from '../components/ExpenditureLedger';
import WasteManagement from '../components/WasteManagement';
import VisitorInvite from '../components/VisitorInvite';
import EmergencySOS from '../components/EmergencySOS';
import ExpenditureApproval from '../components/ExpenditureApproval';
import ResidentMarketplace from '../components/ResidentMarketplace';
import RevenueSettlement from '../components/RevenueSettlement';
import PLGenerator from '../components/PLGenerator';
import IoTDashboard from '../components/IoTDashboard';
import EVScheduling from '../components/EVScheduling';
import VirtualMeeting from '../components/VirtualMeeting';
import EncryptedChat from '../components/EncryptedChat';
import PaymentPortal from '../components/PaymentPortal';
import ComplaintSystem from '../components/ComplaintSystem';
import EmergencyCall from '../components/EmergencyCall';
import StaffManagement from '../components/StaffManagement';
import AmenityHub from '../components/AmenityHub';
import PropertyListings from '../components/PropertyListings';
import CommunityPolls from '../components/CommunityPolls';
import PremiumServices from '../components/PremiumServices';
import SocketService from '../services/socketService';
import { Wallet, Users, ShoppingBag, Calendar, ArrowRight, ShieldCheck, ShieldAlert, BadgeCent, Video, Zap, MessageSquare, Megaphone, PhoneCall, UserCheck, Star, Home, BarChart, Sparkles, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import DataService from '../services/dataService';

const ResidentDashboard = ({ onShowBill, activeModule, setActiveModule }) => {
  const { user } = useAuth();
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [waterLevel, setWaterLevel] = useState(72);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
        try {
            // In real world, we'd fetch water level from IoT table
            // For now, we simulate the fetch delay
            const residents = await DataService.getResidents();
            if (residents.length > 0) {
                // Initial data sync successful
            }
        } catch (err) {
            console.error("Data Sync Error:", err);
        }
    };

    loadInitialData();

    SocketService.on('iot_update', (data) => {
        if (data.type === 'water') setWaterLevel(data.value);
    });
    SocketService.on('security_alert', (data) => {
        toast(data.msg, { icon: '🛡️', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
    });
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
        setIsRefreshing(false);
        toast.success('Data Sync Complete', { icon: '🔄' });
    }, 1500);
  };
  
  return (
    <div className="space-y-12 pb-24 relative">
      {isRefreshing && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-black text-[10px] uppercase shadow-xl"
          >
            <RefreshCw size={14} className="animate-spin" /> Syncing...
          </motion.div>
      )}
      {activeMeeting && (
          <VirtualMeeting meeting={activeMeeting} onExit={() => setActiveMeeting(null)} />
      )}

      {showPayment && (
          <PaymentPortal 
            amount={1240} 
            onCancel={() => setShowPayment(false)} 
            onSuccess={() => setShowPayment(false)} 
          />
      )}

      {showEmergency && (
          <EmergencyCall onExit={() => setShowEmergency(false)} />
      )}

      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Morning, {user.name.split(' ')[0]}!</h2>
          <div className="flex gap-3">
             <span className="flex items-center gap-1.5 text-[10px] font-black uppercase bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 cursor-pointer" onClick={handleRefresh}>
                <ShieldCheck size={12} /> {user.unit} Verified
             </span>
             <span className="flex items-center gap-1.5 text-[10px] font-black uppercase bg-white/5 text-slate-400 px-3 py-1 rounded-full border border-white/10">
                {user.society}
             </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-[10px] font-black overflow-x-auto pb-2">
            <NavTab active={activeModule === 'overview'} onClick={() => setActiveModule('overview')} label="Home" />
            <NavTab active={activeModule === 'premium'} onClick={() => setActiveModule('premium')} label="Home Services" />
            <NavTab active={activeModule === 'marketplace'} onClick={() => setActiveModule('marketplace')} label="Market" />
            <NavTab active={activeModule === 'proptech'} onClick={() => setActiveModule('proptech')} label="Properties" />
            <NavTab active={activeModule === 'polls'} onClick={() => setActiveModule('polls')} label="Voting" />
            <NavTab active={activeModule === 'chat'} onClick={() => setActiveModule('chat')} label="Chat" />
            <NavTab active={activeModule === 'amenities'} onClick={() => setActiveModule('amenities')} label="Facilities" />
            <NavTab active={activeModule === 'staff'} onClick={() => setActiveModule('staff')} label="Daily Help" />
            <NavTab active={activeModule === 'complaints'} onClick={() => setActiveModule('complaints')} label="Complaints" />
            <NavTab active={activeModule === 'waste'} onClick={() => setActiveModule('waste')} label="Waste" />
            <NavTab active={activeModule === 'iot'} onClick={() => setActiveModule('iot')} label="Sensors" />
            <NavTab active={activeModule === 'ev'} onClick={() => setActiveModule('ev')} label="EV Charge" />
            <NavTab active={activeModule === 'visitors'} onClick={() => setActiveModule('visitors')} label="Visitors" />
            <NavTab active={activeModule === 'security'} onClick={() => setActiveModule('security')} label="Safety" />
            <NavTab active={activeModule === 'financials'} onClick={() => setActiveModule('financials')} label="Audit" />
        </div>
      </div>

      {activeModule === 'overview' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* AGENTIC FEATURE: Primary Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickLink onClick={() => setActiveModule('premium')} icon={<Sparkles className="text-blue-600" />} title="Premium Care" desc="Book Deep Cleaning" hColor="bg-blue-50/5 border-blue-200" />
                <QuickLink onClick={() => setActiveModule('polls')} icon={<BarChart className="text-purple-500" />} title="Active Poll" desc="Pool Upgrade Vote" hColor="bg-purple-500/10 border-purple-500/20" />
                <QuickLink onClick={() => setActiveModule('staff')} icon={<UserCheck className="text-blue-600" />} title="Helper Online" desc="Raju Kumar Check-in" />
                <QuickLink onClick={() => setShowEmergency(true)} icon={<PhoneCall className="text-rose-500" />} title="Emergency" desc="Police/Fire/Med" hColor="bg-rose-500/10 border-rose-500/20" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-12 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-emerald-500/20"></div>
                        <p className="text-slate-400 text-lg mb-6 max-w-lg">IoT sensors detect water tank is at <span className="text-blue-400 font-bold">{waterLevel}%</span>. Everything looks perfect for the day.</p>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-emerald-400 font-bold hover:gap-4 transition-all" onClick={() => setActiveModule('iot')}>
                                Smart Sensors <ArrowRight size={20} />
                            </button>
                            <button className="flex items-center gap-2 text-rose-400 font-bold hover:gap-3 transition-all" onClick={() => setActiveModule('complaints')}>
                                File Complaint <Megaphone size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setShowPayment(true)}>
                            <StatCard icon={<Wallet className="text-amber-500" />} title="Your Wallet" value="$42.50" color="amber" footer="Pay Dues Now" highlight />
                        </div>
                        <StatCard icon={<Zap className="text-emerald-500" />} title="EV Charge" value="Full" color="emerald" footer="Last Charged: 2h ago" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-widest pl-2">Waste Passport</h3>
                    <GreenTicket residentName={user.name} flatNo={user.unit || 'Admin Core'} validUntil="Midnight, Mar 19" />
                </div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                     <RevenueSettlement />
                     <div className="border-t border-white/5 pt-12">
                        <ExpenditureLedger onViewBill={onShowBill} />
                     </div>
                </div>
                <div className="space-y-8">
                    <NoticeBoard />
                    <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5 cursor-pointer" onClick={() => setActiveModule('amenities')}>
                        <h4 className="text-sm font-black mb-2 uppercase flex items-center justify-between">
                            Hotel Grade Facility <span><Star size={14} className="fill-amber-500 text-amber-500" /></span>
                        </h4>
                        <p className="text-lg font-black mb-1">Elite Clubhouse</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Next Slot: 4PM - 7PM Available</p>
                    </div>
                </div>
            </section>
        </div>
      )}

      {activeModule === 'premium' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <PremiumServices />
          </div>
      )}

      {activeModule === 'marketplace' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <ResidentMarketplace />
          </div>
      )}

      {activeModule === 'proptech' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <PropertyListings />
          </div>
      )}

      {activeModule === 'polls' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <CommunityPolls />
          </div>
      )}

      {activeModule === 'chat' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <EncryptedChat />
          </div>
      )}

      {activeModule === 'staff' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <StaffManagement />
          </div>
      )}

      {activeModule === 'amenities' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <AmenityHub />
          </div>
      )}

      {activeModule === 'complaints' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <ComplaintSystem />
          </div>
      )}

      {activeModule === 'iot' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <IoTDashboard />
          </div>
      )}

      {activeModule === 'ev' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <EVScheduling />
          </div>
      )}

      {activeModule === 'waste' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <WasteManagement />
          </div>
      )}

      {activeModule === 'visitors' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <VisitorInvite />
          </div>
      )}

      {activeModule === 'security' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <EmergencySOS />
          </div>
      )}

      {activeModule === 'financials' && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-16">
            <PLGenerator />
            <div className="border-t border-white/5 pt-16">
                <ExpenditureApproval />
            </div>
            <div className="border-t border-white/5 pt-16">
                <ExpenditureLedger onViewBill={onShowBill} />
            </div>
          </div>
      )}
    </div>
  );
};

const NavTab = ({ active, onClick, label }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${active ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-slate-500 hover:text-slate-300'}`}
    >
        {label}
    </button>
);

const QuickLink = ({ icon, title, desc, onClick, hColor }) => (
    <div onClick={onClick} className={`glass-card p-4 border transition-all cursor-pointer group flex items-center gap-4 ${hColor || 'border-white/10 hover:border-emerald-500/30 bg-white/5'}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform bg-white/5`}>
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-sm tracking-tight text-white">{title}</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">{desc}</p>
        </div>
    </div>
);

function StatCard({ icon, title, value, color, footer, highlight }) {
    const colorMap = {
      amber: 'border-amber-500/10 hover:border-amber-500/40',
      blue: 'border-blue-500/10 hover:border-blue-500/40',
      emerald: 'border-emerald-500/10 hover:border-emerald-500/40',
    };
    return (
      <div className={`glass-card p-6 border transition-all cursor-pointer ${colorMap[color]} ${highlight ? 'ring-2 ring-amber-500/20' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
          <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{title}</span>
        </div>
        <div className="text-3xl font-black mb-1">{value}</div>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{footer}</div>
      </div>
    );
}

export default ResidentDashboard;
