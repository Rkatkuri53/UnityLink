import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, User, LayoutDashboard, MessageSquareText, FileSpreadsheet, Users2, Activity, Shapes } from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';
import { motion } from 'framer-motion';

const Layout = ({ children, activeTab, onTabChange }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex overflow-hidden">
      {/* Custom Pro Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 static h-screen flex-col flex-shrink-0">
        <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Shield size={22} strokeWidth={2.5} />
            </div>
            <div>
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none block">UNITY<span className="text-blue-600">LINK</span></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 block">District OS</span>
            </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
            <SidebarItem active={activeTab === 'overview'} onClick={() => onTabChange('overview')} icon={<LayoutDashboard size={20}/>} label="Overview" />
            <SidebarItem active={activeTab === 'complaints'} onClick={() => onTabChange('complaints')} icon={<MessageSquareText size={20}/>} label="Citizen Hub" />
            <SidebarItem active={activeTab === 'financials'} onClick={() => onTabChange('financials')} icon={<FileSpreadsheet size={20}/>} label="Audits & Ledger" />
            <SidebarItem active={activeTab === 'staff'} onClick={() => onTabChange('staff')} icon={<Users2 size={20}/>} label="Service Staff" />
            <SidebarItem active={activeTab === 'amenities'} onClick={() => onTabChange('amenities')} icon={<Shapes size={20}/>} label="Facilities" />
            <SidebarItem active={activeTab === 'iot'} onClick={() => onTabChange('iot')} icon={<Activity size={20}/>} label="IoT Sensors" />
        </nav>

        <div className="p-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow-sm flex items-center justify-center text-white font-black">
                    {user.name && user.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{user.role}</p>
                </div>
            </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Custom Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center px-8 justify-between sticky top-0 z-[1000]">
          <div className="flex-1">
             <h2 className="text-lg font-black text-slate-900 capitalize tracking-tight px-4 border-l-4 border-blue-600 leading-none">
                 {activeTab.replace(/([A-Z])/g, ' $1').trim()}
             </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">System Online</span>
            </div>
            
            <button className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all flex items-center justify-center relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Fluid Main Area */}
        <main className="flex-1 overflow-y-auto w-full">
            <div className="container-fluid py-10 pb-32 lg:pb-16 max-w-[1600px] mx-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            </div>
        </main>
      </div>

      {/* Mobile Interaction Layer */}
      <MobileBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

const SidebarItem = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
        <span className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>{icon}</span>
        <span className="tracking-tight">{label}</span>
        {active && <motion.div layoutId="sidebarActive" className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
);

export default Layout;
