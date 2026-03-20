import React from 'react';
import { Home, ShieldAlert, MessageSquare, User, Grid, PieChart, Upload, MessageSquareWarning } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  
  const residentTabs = [
    { id: 'overview', icon: <Home size={20} />, label: 'Home' },
    { id: 'security', icon: <ShieldAlert size={20} />, label: 'Safety' },
    { id: 'chat', icon: <MessageSquare size={20} />, label: 'Chat' },
    { id: 'staff', icon: <User size={20} />, label: 'Staff' },
  ];

  const adminTabs = [
    { id: 'analytics', icon: <PieChart size={20} />, label: 'Insights' },
    { id: 'expenses', icon: <Upload size={20} />, label: 'Bills' },
    { id: 'complaints', icon: <MessageSquareWarning size={20} />, label: 'Grievance' },
    { id: 'marketplace', icon: <Grid size={20} />, label: 'Ads' },
  ];

  const tabs = user.role === 'Society-Admin' ? adminTabs : residentTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[12000] lg:hidden bg-white border-t border-slate-200 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center relative flex-1"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-[1px] w-12 h-0.5 bg-blue-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className={`transition-all duration-300 ${isActive ? 'text-blue-600 scale-110' : 'text-slate-400'}`}>
                {tab.icon}
              </div>
              <span className={`text-[8px] font-black uppercase mt-1 tracking-tighter ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
