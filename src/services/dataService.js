import { supabase } from './supabase';

/**
 * UnityLink Production Data Service
 * Connects to Supabase PostgreSQL for real-time society management.
 */

const DataService = {
    // 1. Residents / Profiles
    getResidents: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*');
        if (error) throw error;
        return data;
    },

    // 2. Expenses / Finance
    getExpenses: async () => {
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    addExpense: async (expense) => {
        const { data, error } = await supabase
            .from('expenses')
            .insert([expense])
            .select();
        if (error) throw error;
        return data[0];
    },

    // 3. Complaints / Governance
    getComplaints: async () => {
        const { data, error } = await supabase
            .from('complaints')
            .select('*, profiles(full_name, unit_no)')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    addComplaint: async (complaint) => {
        const { data, error } = await supabase
            .from('complaints')
            .insert([complaint])
            .select();
        if (error) throw error;
        return data[0];
    },

    updateComplaint: async (id, updates) => {
        const { data, error } = await supabase
            .from('complaints')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    // 4. Staff Management
    getStaff: async () => {
        const { data, error } = await supabase
            .from('staff')
            .select('*');
        if (error) throw error;
        return data;
    },

    // 5. Amenity Hub
    getAmenities: async () => {
        const { data, error } = await supabase
            .from('amenities')
            .select('*');
        if (error) throw error;
        return data;
    },

    // 6. IoT Streams (Simulated via Realtime subscription logic)
    onIoTUpdate: (callback) => {
        const subscription = supabase
            .channel('iot_updates')
            .on('broadcast', { event: 'sensor_data' }, (payload) => callback(payload))
            .subscribe();
        return () => supabase.removeChannel(subscription);
    }
};

export default DataService;
