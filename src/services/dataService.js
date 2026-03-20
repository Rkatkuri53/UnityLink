import { supabase } from './supabase';

const isSimulation = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

const MOCK_DATA = {
    complaints: [
        { id: 'c1', category: 'Plumbing', description: 'Leaking pipe in B-Wing basement', status: 'Pending', time: new Date().toISOString(), resident: 'Mr. Sharma (B-101)', assignedTo: 'Plumber Team' },
        { id: 'c2', category: 'Security', description: 'Gate #2 sensor malfunction', status: 'Resolved', time: new Date().toISOString(), resident: 'Security Head', assignedTo: 'Maintenance Mgr' },
        { id: 'c3', category: 'Noise', description: 'Late night party in A-901', status: 'Pending', time: new Date().toISOString(), resident: 'Mrs. Kapoor (A-902)', assignedTo: 'Security Head' }
    ],
    expenses: [
        { id: 'e1', title: 'Water Tank Cleaning', amount: 8500, category: 'Maintenance', date: '2026-03-15', status: 'Approved' },
        { id: 'e2', title: 'Garden Landscaping', amount: 12000, category: 'Aesthetics', date: '2026-03-18', status: 'Pending' }
    ],
    staff: [
        { id: 1, name: 'Ravi Singh', role: 'Security Head', status: 'On Duty' },
        { id: 2, name: 'Anita Rao', role: 'Accountant', status: 'On Leave' }
    ]
};

const DataService = {
    getComplaints: async () => {
        if (isSimulation) return MOCK_DATA.complaints;
        const { data, error } = await supabase.from('complaints').select('*, profiles(name, unit)').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    updateComplaint: async (id, updates) => {
        if (isSimulation) {
            const idx = MOCK_DATA.complaints.findIndex(c => c.id === id);
            if (idx !== -1) MOCK_DATA.complaints[idx] = { ...MOCK_DATA.complaints[idx], ...updates };
            return MOCK_DATA.complaints[idx];
        }
        const { data, error } = await supabase.from('complaints').update(updates).eq('id', id).select();
        if (error) throw error;
        return data[0];
    },

    addComplaint: async (complaint) => {
        if (isSimulation) {
            const newC = { id: Math.random().toString(), ...complaint, time: new Date().toISOString(), status: 'Pending' };
            MOCK_DATA.complaints.push(newC);
            return newC;
        }
        const { data, error } = await supabase.from('complaints').insert([complaint]).select();
        if (error) throw error;
        return data[0];
    },

    getExpenses: async () => {
        if (isSimulation) return MOCK_DATA.expenses;
        const { data, error } = await supabase.from('expenses').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    getStaff: async () => {
        if (isSimulation) return MOCK_DATA.staff;
        const { data, error } = await supabase.from('staff').select('*');
        if (error) throw error;
        return data;
    }
};

export default DataService;
