import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import BillViewer from './components/BillViewer';
import ResidentDashboard from './pages/ResidentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GateSecurity from './pages/GateSecurity';
import SocietyRegistration from './components/SocietyRegistration';
import { Users, LayoutDashboard, Shield, Lock, FileCode } from 'lucide-react';
import './index.css';

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
  const [isOnboarding, setIsOnboarding] = useState(false);

  // One-time Setup View
  if (isOnboarding) {
    return (
        <div className="min-h-screen bg-[#020617] text-white p-8">
            <div className="max-w-4xl mx-auto flex items-center gap-4 mb-12">
                <FileCode size={32} className="text-emerald-500" />
                <h1 className="text-2xl font-black uppercase tracking-tighter">UnityLink <span className="text-slate-500">Registration</span></h1>
            </div>
            <SocietyRegistration onComplete={() => setIsOnboarding(false)} />
        </div>
    );
  }

  // If guard, show the gate app without the standard layout (it's a dedicated terminal)
  if (user.role === 'Gate-Guard') {
    return (
        <>
            <GateSecurity />
            <RoleSwitcher onOnboard={() => setIsOnboarding(true)} />
        </>
    );
  }

  return (
    <Layout activeTab={activeModule} onTabChange={setActiveModule}>
      {user.role === 'Society-Admin' ? (
        <AdminDashboard activeModule={activeModule} setActiveModule={setActiveModule} />
      ) : (
        <ResidentDashboard onShowBill={setSelectedBill} activeModule={activeModule} setActiveModule={setActiveModule} />
      )}
      
      <BillViewer bill={selectedBill} onClose={() => setSelectedBill(null)} />
      <RoleSwitcher onOnboard={() => setIsOnboarding(true)} />
    </Layout>
  );
}

function RoleSwitcher({ onOnboard }) {
  const { loginAs, user } = useAuth();
  
  return (
    <div className="fixed bottom-6 right-6 flex gap-2 glass-card p-2 border-white/10 shadow-2xl z-[5000]">
      <button 
        onClick={onOnboard}
        className="p-2 rounded-md hover:bg-emerald-500/20 text-emerald-500 transition-all"
        title="Setup New Society"
      >
        <FileCode size={18} />
      </button>
      <div className="w-px h-6 bg-white/10 mx-1"></div>
      <button 
        onClick={() => loginAs('Resident')} 
        className={`p-2 rounded-md transition-all ${user.role === 'Resident' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        title="Resident View"
      >
        <Users size={18} />
      </button>
      <button 
        onClick={() => loginAs('Admin')} 
        className={`p-2 rounded-md transition-all ${user.role === 'Society-Admin' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        title="Admin View"
      >
        <Shield size={18} />
      </button>
      <button 
        onClick={() => loginAs('Guard')} 
        className={`p-2 rounded-md transition-all ${user.role === 'Gate-Guard' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        title="Gate Guard Terminal"
      >
        <Lock size={18} />
      </button>
    </div>
  );
}

export default App;
