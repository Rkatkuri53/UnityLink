import React, { useState } from 'react';
import { ShieldCheck, FileText, MapPin, Users, Info, Check, Upload, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SocietyRegistration = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    societyName: '',
    regType: 'Housing',
    address: '',
    state: 'Maharashtra', // Default for demonstration
    district: '',
    memberCount: '',
    chairman: '',
    secretary: '',
    treasurer: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24">
      {/* State Progress Bar */}
      <div className="flex justify-between items-center px-4">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex flex-col items-center gap-2 group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step >= s ? 'bg-emerald-500 border-emerald-500 text-black font-black' : 'border-white/10 text-slate-500'}`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <span className={`text-[8px] font-black uppercase tracking-widest ${step >= s ? 'text-emerald-500' : 'text-slate-600'}`}>
                {s === 1 ? 'IDENTITY' : s === 2 ? 'LOCATION' : s === 3 ? 'COMMITTEE' : 'DOCUMENTS'}
            </span>
          </div>
        ))}
      </div>

      <div className="glass-card p-12 border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={200} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
                key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
            >
                <div>
                   <h3 className="text-3xl font-black mb-2">Registration Identity</h3>
                   <p className="text-slate-400 text-sm">Basic information as per state government rules.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Society Full Name" placeholder="e.g. Skyline Heights CHS" value={formData.societyName} onChange={v => setFormData({...formData, societyName: v})} />
                    <SelectField label="Society Category" options={['Housing', 'Commercial', 'Mixed Use', 'Villa Community']} value={formData.regType} onChange={v => setFormData({...formData, regType: v})} />
                    <InputField label="Total Units/Flats" placeholder="e.g. 120" type="number" value={formData.memberCount} onChange={v => setFormData({...formData, memberCount: v})} />
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-3">
                        <Info size={20} className="text-blue-500 shrink-0" />
                        <p className="text-[10px] text-slate-400 leading-normal">Registration rule: Any complex with 10+ owners must register a Cooperative Housing Society (CHS).</p>
                    </div>
                </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
                key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
            >
                <div>
                   <h3 className="text-3xl font-black mb-2">Location & Jurisdiction</h3>
                   <p className="text-slate-400 text-sm">Determines the taxing and compliance node.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Registered Address" placeholder="Street, Plot No, Block" full value={formData.address} onChange={v => setFormData({...formData, address: v})} />
                    <InputField label="District" placeholder="e.g. Mumbai Suburban" value={formData.district} onChange={v => setFormData({...formData, district: v})} />
                    <InputField label="State" placeholder="Maharashtra" value={formData.state} disabled />
                </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
                key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
            >
                <div>
                   <h3 className="text-3xl font-black mb-2">Elected Committee</h3>
                   <p className="text-slate-400 text-sm">The legal signatories for society resolutions.</p>
                </div>

                <div className="space-y-4">
                    <InputField label="Chairman Name" placeholder="Full legal name" value={formData.chairman} onChange={v => setFormData({...formData, chairman: v})} />
                    <InputField label="Secretary Name" placeholder="Full legal name" value={formData.secretary} onChange={v => setFormData({...formData, secretary: v})} />
                    <InputField label="Treasurer Name" placeholder="Full legal name" value={formData.treasurer} onChange={v => setFormData({...formData, treasurer: v})} />
                </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
                key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
            >
                <div>
                   <h3 className="text-3xl font-black mb-2">Compliance Vault</h3>
                   <p className="text-slate-400 text-sm">Upload mandatory legal documents.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocUpload label="Society Registration Cert" />
                    <DocUpload label="PAN Card of Society" />
                    <DocUpload label="Approved Bye-Laws" />
                    <DocUpload label="Land Title / Sale Deed" />
                </div>

                <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex gap-4">
                    <AlertCircle size={24} className="text-amber-500 shrink-0" />
                    <div>
                        <h4 className="font-bold text-sm">Aadhaar Verification Pending</h4>
                        <p className="text-[10px] text-slate-500">Signatories will receive an OTP for e-KYC after form submission to verify committee validity.</p>
                    </div>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between">
            <button 
                onClick={prevStep} 
                disabled={step === 1}
                className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${step === 1 ? 'opacity-0' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}
            >
                Back
            </button>
            <button 
                onClick={step === 4 ? onComplete : nextStep}
                className="px-12 py-3 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_#10b98133]"
            >
                {step === 4 ? 'Verify & Finalize' : 'Continue'}
            </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, type = 'text', full, value, onChange, disabled }) => (
    <div className={full ? 'md:col-span-2' : ''}>
        <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            className={`w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
    </div>
);

const SelectField = ({ label, options, value, onChange }) => (
    <div>
        <label className="text-[10px] font-black uppercase text-slate-500 block mb-2">{label}</label>
        <select 
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-all appearance-none"
        >
            {options.map(opt => <option key={opt} value={opt} className="bg-[#020617]">{opt}</option>)}
        </select>
    </div>
);

const DocUpload = ({ label }) => (
    <div className="border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:border-emerald-500/30 transition-all cursor-pointer bg-white/5">
        <div className="flex items-center gap-3">
             <div className="p-2 bg-white/5 rounded-lg text-slate-500 group-hover:text-emerald-500">
                <FileText size={18} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-tight text-slate-400">{label}</span>
        </div>
        <Upload size={16} className="text-slate-600" />
    </div>
);

export default SocietyRegistration;
