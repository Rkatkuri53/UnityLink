import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ResidentDashboard from './pages/ResidentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BillViewer from './components/BillViewer';
import { Users, Shield, Lock } from 'lucide-react';
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
  const [activeModule, setActiveModule] = useState('overview');
  return (
    <AuthProvider>
      <MainContent activeModule={activeModule} setActiveModule={setActiveModule} />
    </AuthProvider>
  );
}

function MainContent({ activeModule, setActiveModule }) {
  const { user } = useAuth();
  const [selectedBill, setSelectedBill] = useState(null);

  const renderContent = () => {
    switch(activeModule) {
      case 'overview': 
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
      <RoleSwitcher />
    </Layout>
  );
}

function RoleSwitcher() {
  const { loginAs, user } = useAuth();
  return (
    <div className="fixed bottom-32 lg:bottom-10 right-8 flex gap-3 bg-white border border-slate-200 shadow-2xl z-[5000] rounded-3xl p-3">
      <button onClick={() => loginAs('Resident')} className={`p-3 rounded-2xl transition-all ${user.role === 'Resident' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}><Users size={20} /></button>
      <button onClick={() => loginAs('Admin')} className={`p-3 rounded-2xl transition-all ${user.role === 'Society-Admin' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}><Shield size={20} /></button>
      <button onClick={() => loginAs('Guard')} className={`p-3 rounded-2xl transition-all ${user.role === 'Gate-Guard' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}><Lock size={20} /></button>
    </div>
  );
}

export default App;
