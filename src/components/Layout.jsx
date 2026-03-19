import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, Menu, User } from 'lucide-react';
import MobileBottomNav from './MobileBottomNav';

const Layout = ({ children, activeTab, onTabChange }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#020617] text-[#f8fafc]">
      {/* Navigation */}
      <nav className="glass-nav h-16 flex items-center px-6 justify-between border-b border-white/5 fixed top-0 left-0 right-0 z-[10000]">
        <div className="flex items-center gap-2">
          <Shield className="text-emerald-500" size={28} />
          <span className="text-xl font-bold tracking-tighter">UNITY<span className="text-emerald-500">LINK</span></span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-emerald-400" onClick={() => onTabChange('overview')}>Home</a>
            <a href="#" className="hover:text-emerald-400" onClick={() => onTabChange('financials')}>Bills</a>
            <a href="#" className="hover:text-emerald-400" onClick={() => onTabChange('premium')}>Services</a>
            <a href="#" className="hover:text-emerald-400" onClick={() => onTabChange('security')}>Security</a>
          </div>
          
          <div className="flex items-center gap-4 pl-6 border-l border-white/10">
            <Bell size={20} className="text-slate-400 hover:text-white cursor-pointer" />
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <User size={16} className="text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-xs font-bold leading-tight">{user.name}</span>
                <span className="text-[10px] text-slate-500 leading-tight uppercase font-black">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-8 px-6 pt-24 pb-32 lg:pb-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default Layout;
