import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, User, Home, Megaphone, Landmark, Users, Zap, Star } from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';

const Layout = ({ children, activeTab, onTabChange }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 sticky top-0 h-screen flex-col flex-shrink-0 z-[1001]">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2 mb-4">
            <Shield className="text-blue-600" size={32} />
            <span className="text-xl font-black tracking-tight text-slate-900 leading-none">UNITY<span className="text-blue-600">LINK</span></span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
            <SidebarLink active={activeTab === 'overview'} onClick={() => onTabChange('overview')} icon={<Home size={18}/>} label="Dashboard" />
            <SidebarLink active={activeTab === 'complaints'} onClick={() => onTabChange('complaints')} icon={<Megaphone size={18}/>} label="Grievances" />
            <SidebarLink active={activeTab === 'financials'} onClick={() => onTabChange('financials')} icon={<Landmark size={18}/>} label="Finance & Audit" />
            <SidebarLink active={activeTab === 'staff'} onClick={() => onTabChange('staff')} icon={<Users size={18}/>} label="Staff Hub" />
            <SidebarLink active={activeTab === 'amenities'} onClick={() => onTabChange('amenities')} icon={<Star size={18}/>} label="Facilities" />
            <SidebarLink active={activeTab === 'iot'} onClick={() => onTabChange('iot')} icon={<Zap size={18}/>} label="District Sensors" />
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={16} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-black truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{user.role}</p>
                </div>
            </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between lg:justify-end sticky top-0 z-[1000]">
          <div className="lg:hidden flex items-center gap-2">
            <Shield className="text-blue-600" size={24} />
            <span className="text-lg font-black tracking-tighter text-slate-900">UNITY<span className="text-blue-600">LINK</span></span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-50 rounded-lg relative">
                <Bell size={20} className="text-slate-500" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-4 w-[1px] bg-slate-200"></div>
            <button className="flex items-center gap-2 hover:bg-slate-50 p-1.5 rounded-lg border border-transparent hover:border-slate-100 transition-all">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                    {user.name && user.name[0]}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-700">{user.name && user.name.split(' ')[0]}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden p-6 lg:p-8 pb-32 lg:pb-8">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

const SidebarLink = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
    >
        {icon} {label}
    </button>
);

export default Layout;
