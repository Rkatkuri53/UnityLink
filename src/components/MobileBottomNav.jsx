import React from 'react';
import { Home, ShieldAlert, MessageSquare, User, LayoutGrid, PieChart, Landmark, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const MobileBottomNav = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  
  const residentTabs = [
    { id: 'overview', icon: <Home size={22} />, label: 'Home' },
    { id: 'security', icon: <ShieldAlert size={22} />, label: 'Safety' },
    { id: 'chat', icon: <MessageSquare size={22} />, label: 'Chat' },
    { id: 'staff', icon: <User size={22} />, label: 'Staff' },
  ];

  const adminTabs = [
    { id: 'overview', icon: <LayoutGrid size={22} />, label: 'HQ' },
    { id: 'complaints', icon: <Megaphone size={22} />, label: 'Alerts' },
    { id: 'financials', icon: <Landmark size={22} />, label: 'Bank' },
    { id: 'staff', icon: <User size={22} />, label: 'Team' },
  ];

  const tabs = user?.role === 'Society-Admin' ? adminTabs : residentTabs;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[5000] lg:hidden w-[90%] max-w-sm">
      <nav className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-4 py-2 shadow-2xl flex justify-between items-center relative overflow-hidden">
        {/* Animated Background Highlight */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {tabs.map((tab, idx) => (
                    activeTab === tab.id && (
                        <motion.div
                            key="pill"
                            layoutId="activePill"
                            className="absolute h-10 w-[22%] bg-blue-600 rounded-2xl"
                            style={{ left: `${(idx * 25) + 2}%`, top: '10px' }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )
                ))}
            </AnimatePresence>
        </div>

        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center p-2 relative z-10 w-full"
            >
              <motion.div 
                animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0 
                }}
                className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}
              >
                {tab.icon}
              </motion.div>
              <span className={`text-[9px] font-bold mt-1 tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomNav;
