import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ResidentDashboard from './pages/ResidentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GateSecurity from './pages/GateSecurity';
import Login from './pages/Login';
import BillViewer from './components/BillViewer';
import { Users, Shield, Lock, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Feature Modules
import ComplaintSystem from './components/ComplaintSystem';
import AdminComplaints from './components/AdminComplaints';
import ExpenditureLedger from './components/ExpenditureLedger';
import PLGenerator from './components/PLGenerator';
import StaffManagement from './components/StaffManagement';
import AmenityHub from './components/AmenityHub';
import IoTDashboard from './components/IoTDashboard';

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { user, loading, isOnboarding } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');

  if (loading) return null;

  if (!user) {
    return <Login />;
  }

  // If user is logged in but not onboarded
  if (!user.onboarded) {
    if (user.role === 'Society-Admin') return <SocietyRegistration />;
    return <ResidentOnboarding />;
  }

  return (
    <MainContent activeModule={activeModule} setActiveModule={setActiveModule} />
  );
}

function MainContent({ activeModule, setActiveModule }) {
  const { user, logout } = useAuth();
  const [selectedBill, setSelectedBill] = useState(null);

  const renderContent = () => {
    switch(activeModule) {
      case 'overview': 
        if (user.role === 'Gate-Guard') return <GateSecurity />;
        return user.role === 'Society-Admin' ? <AdminDashboard /> : <ResidentDashboard onShowBill={setSelectedBill} />;
      case 'complaints':
        return user.role === 'Society-Admin' ? <AdminComplaints /> : <ComplaintSystem />;
      case 'financials':
        return user.role === 'Society-Admin' ? <PLGenerator /> : <ExpenditureLedger onViewBill={setSelectedBill} />;
      case 'staff':
        return <StaffManagement />;
      case 'amenities':
        return <AmenityHub />;
      case 'iot':
        return <IoTDashboard />;
      default:
        return <ResidentDashboard onShowBill={setSelectedBill} />;
    }
  };

  return (
    <Layout activeTab={activeModule} onTabChange={setActiveModule}>
      <AnimatePresence mode="wait">
        <motion.div
           key={activeModule + '-' + user.role}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: -20 }}
           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
           className="w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      
      <BillViewer bill={selectedBill} onClose={() => setSelectedBill(null)} />
      
      {/* Dev Role Switcher + Logout */}
      <div className="fixed bottom-32 lg:bottom-10 right-8 flex flex-col gap-3 z-[5000]">
          <button 
            onClick={logout}
            className="w-14 h-14 bg-white border border-slate-200 shadow-2xl rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
          >
            <LogOut size={20} />
          </button>
      </div>
    </Layout>
  );
}

export default App;
