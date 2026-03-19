import React, { useState } from 'react';
import { Users, Upload, Megaphone, Plus, Search, Trash2, Eye, ShieldCheck, Globe, Zap, BarChart3, Loader2, MessageSquareWarning, Activity, PieChart } from 'lucide-react';
import AdvertiserPortal from '../components/AdvertiserPortal';
import AdminComplaints from '../components/AdminComplaints';
import SystemHealth from '../components/SystemHealth';
import SocietyAnalytics from '../components/SocietyAnalytics';
import { toast } from 'react-hot-toast';

const AdminDashboard = ({ activeModule, setActiveModule }) => {
  const activeTab = activeModule;
  const setActiveTab = setActiveModule;
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedBill, setExtractedBill] = useState(null);

  const simulateAIExtraction = () => {
      setIsExtracting(true);
      setExtractedBill(null);
      
      setTimeout(() => {
          setIsExtracting(false);
          setExtractedBill({
              vendor: 'Roof-Tech Solutions',
              amount: '₹42,500',
              category: 'Maintenance',
              gst: '₹7,650 (18%)',
              confidence: '98.2%'
          });
          toast.success('AI: Bill Data Extracted Successfully!');
      }, 3500);
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">Admin Hub</h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Skyline Heights Management Core</p>
        </div>
        
        <div className="flex gap-2">
            <AdminNavTab active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<PieChart size={16}/>} label="Insights" />
            <AdminNavTab active={activeTab === 'health'} onClick={() => setActiveTab('health')} icon={<Activity size={16}/>} label="Resilience" />
            <AdminNavTab active={activeTab === 'residents'} onClick={() => setActiveTab('residents')} icon={<Users size={16}/>} label="User Base" />
            <AdminNavTab active={activeTab === 'expenses'} onClick={() => setActiveTab('expenses')} icon={<Upload size={16}/>} label="Bills & Audit" />
            <AdminNavTab active={activeTab === 'complaints'} onClick={() => setActiveTab('complaints')} icon={<MessageSquareWarning size={16}/>} label="Grievances" />
            <AdminNavTab active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} icon={<Globe size={16}/>} label="Ad Portal" />
            <AdminNavTab active={activeTab === 'notices'} onClick={() => setActiveTab('notices')} icon={<Megaphone size={16}/>} label="Broadcaster" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Residents" value="452" trend="+12 this month" />
        <MetricCard label="Unpaid Dues" value="$1,240" trend="-15% from Feb" color="rose" />
        <MetricCard label="Ad Revenue Net" value="$12,450" trend="+40% YoY" color="emerald" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'analytics' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <SocietyAnalytics />
            </div>
        )}

        {activeTab === 'health' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <SystemHealth />
            </div>
        )}

        {activeTab === 'residents' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                Resident Management
              </h3>
              <div className="flex gap-3">
                 <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
                   <Search size={16} className="text-slate-500" />
                   <input type="text" placeholder="Search Unit/Name" className="bg-transparent border-none outline-none text-xs" />
                 </div>
                 <button className="glow-btn flex items-center gap-2"><Plus size={16}/> Add Resident</button>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-[10px] font-black uppercase text-slate-500 tracking-widest border-b border-white/10">
                            <th className="p-4">Unit</th>
                            <th className="p-4">Resident</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Dues</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <ResidentRow unit="B-1402" name="John Doe" phone="+91 98XXX XXX01" status="Paid" />
                        <ResidentRow unit="A-901" name="Alice Smith" phone="+91 98XXX XXX99" status="Unpaid" />
                        <ResidentRow unit="C-22" name="Bob Brown" phone="+91 98XXX XXX45" status="Paid" />
                    </tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-8">
            <div 
                onClick={simulateAIExtraction}
                className="glass-card p-12 border-dashed border-white/20 text-center bg-white/5 hover:bg-emerald-500/5 transition-all cursor-pointer group"
            >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform">
                    {isExtracting ? <Loader2 size={32} className="text-emerald-500 animate-spin" /> : <Upload size={32} className="text-slate-500 group-hover:text-emerald-500" />}
                </div>
                <h4 className="text-lg font-bold mb-2">{isExtracting ? 'AI is Analyzing...' : 'Upload Society Expense Bill'}</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">Drop PDFs or Photos here. Our AI will automatically extract Category, Amount, and GST details.</p>
                <div className="flex gap-4 justify-center">
                    <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest">Manual Entry</button>
                    <button className="glow-btn">Select Files</button>
                </div>
            </div>

            {extractedBill && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">AI Extraction Result</h4>
                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md border border-emerald-400/20">CONFIDENCE: {extractedBill.confidence}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <BillField label="Vendor" value={extractedBill.vendor} />
                        <BillField label="Amount" value={extractedBill.amount} />
                        <BillField label="Category" value={extractedBill.category} />
                        <BillField label="GST Det." value={extractedBill.gst} />
                    </div>
                    <div className="mt-8 flex gap-3">
                        <button className="flex-1 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-lg">Approve & Log</button>
                        <button className="px-6 py-3 border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-white/5">Retry</button>
                    </div>
                </motion.div>
            )}
          </div>
        )}

        {activeTab === 'complaints' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <AdminComplaints />
            </div>
        )}

        {activeTab === 'marketplace' && (
            <div className="space-y-8">
                <AdvertiserPortal />
            </div>
        )}

        {activeTab === 'notices' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-xl font-bold">Broadcast New Notice</h3>
            <div className="glass-card p-8 space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Subject</label>
                   <input type="text" placeholder="e.g. Annual Maintenance Schedule" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">Message Body</label>
                   <textarea rows="6" placeholder="Write your announcement here..." className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none transition-all"></textarea>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="email" className="accent-emerald-500" />
                        <label htmlFor="email" className="text-xs font-bold text-slate-400">Send Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="sms" className="accent-emerald-500" />
                        <label htmlFor="sms" className="text-xs font-bold text-slate-400">Push Notification</label>
                    </div>
                </div>
                <button className="glow-btn w-full py-4 text-xs">Publish Broadcast</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BillField = ({ label, value }) => (
    <div>
        <p className="text-[9px] font-black uppercase text-slate-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
    </div>
);

const MetricCard = ({ label, value, trend, color = 'slate' }) => {
    const colors = {
        slate: 'border-white/5 text-white',
        rose: 'border-rose-500/20 text-rose-500 bg-rose-500/5',
        emerald: 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5'
    };
    return (
        <div className={`glass-card p-6 border transition-all hover:scale-105 ${colors[color]}`}>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">{label}</p>
            <p className="text-3xl font-black mb-1">{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{trend}</p>
        </div>
    );
};

const AdminNavTab = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`p-2 flex flex-col items-center gap-1 rounded-lg transition-all min-w-[80px] group ${active ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
        <div className={`p-2 rounded-lg transition-all ${active ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/5 border border-white/10 group-hover:border-emerald-500/30'}`}>
            {icon}
        </div>
        <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
    </button>
);

const ResidentRow = ({ unit, name, phone, status }) => (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-all text-slate-300">
        <td className="p-4 font-black">{unit}</td>
        <td className="p-4 font-bold">{name}</td>
        <td className="p-4 text-xs font-mono opacity-60">{phone}</td>
        <td className="p-4">
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                {status}
            </span>
        </td>
        <td className="p-4 text-right">
            <div className="flex justify-end gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 group"><Eye size={16} className="group-hover:text-emerald-500" /></button>
                <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 group"><Trash2 size={16} className="group-hover:text-rose-500" /></button>
            </div>
        </td>
    </tr>
);

export default AdminDashboard;
