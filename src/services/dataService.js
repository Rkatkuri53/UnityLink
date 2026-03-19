/**
 * UnityLink Persistent Data Service
 * Simulates a Production Backend/Database using LocalStorage
 */

const STORAGE_KEY = 'unitylink_v1_data';

const initialData = {
    residents: [
        { id: 'res-101', name: 'John Doe', unit: 'B-1402', status: 'Paid', wallet: 42.50 },
        { id: 'res-102', name: 'Alice Smith', unit: 'A-901', status: 'Unpaid', wallet: 10.00 },
    ],
    expenses: [
        { id: 1, date: '2026-03-15', desc: 'Water Tank Cleaning', category: 'Maintenance', amount: 450, status: 'Verified' },
        { id: 2, date: '2026-03-12', desc: 'Security Staff Salary', category: 'Security', amount: 2400, status: 'Verified' },
    ],
    marketplace: [
        { id: 1, name: "The Gourmet Crust", owner: "Aditi S.", type: "Food", rating: 4.8, desc: "Artisan sourdough and healthy desserts baked at Home B-1402.", priceRange: "$$" },
    ],
    complaints: [
        { id: 1, resident: 'A-901', category: 'Nuisance: Pets', desc: 'Frequent barking late at night.', status: 'Pending', assignedTo: 'Security Head', time: '2026-03-18' },
    ],
    staff: [
        { id: 's1', name: 'Raju Kumar', role: 'Maid', entryTime: '08:45 AM', rating: 4.5, units: ['B-1402', 'A-901'] },
        { id: 's2', name: 'Surendra Singh', role: 'Driver', entryTime: '09:15 AM', rating: 4.8, units: ['B-1402'] },
    ],
    amenities: [
        { id: 'a1', name: 'Squash Court', slots: ['6AM-7AM', '7AM-8AM', '6PM-7PM'], active: true },
        { id: 'a2', name: 'Mini Theater', slots: ['4PM-7PM', '7PM-10PM'], active: true },
    ],
    iot: {
        water: 72,
        fuel: 45
    }
};

const DataService = {
    // Initialize Data
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
    },

    // Generic Get
    getData: () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

    // Generic Update
    saveData: (data) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Broadcast change for multi-component reactivity
        window.dispatchEvent(new Event('unitylink_data_changed'));
    },

    // Specialized Methods
    getResidents: () => DataService.getData().residents,
    addResident: (resident) => {
        const db = DataService.getData();
        db.residents.push({ ...resident, id: Date.now().toString() });
        DataService.saveData(db);
    },

    getExpenses: () => DataService.getData().expenses,
    addExpense: (expense) => {
        const db = DataService.getData();
        db.expenses.push({ ...expense, id: Date.now() });
        DataService.saveData(db);
    },

    // Marketplace
    getMarketplace: () => DataService.getData().marketplace,

    // Complaints
    getComplaints: () => DataService.getData().complaints,
    addComplaint: (complaint) => {
        const db = DataService.getData();
        db.complaints.unshift({ ...complaint, id: Date.now(), status: 'Pending', time: new Date().toISOString() });
        DataService.saveData(db);
    },
    updateComplaint: (id, updates) => {
        const db = DataService.getData();
        const index = db.complaints.findIndex(c => c.id === id);
        if (index !== -1) {
            db.complaints[index] = { ...db.complaints[index], ...updates };
            DataService.saveData(db);
        }
    },
    
    // Auth Helper
    getCurrentUser: () => {
        const role = localStorage.getItem('unitylink_role') || 'Resident';
        const db = DataService.getData();
        return db.residents.find(r => r.role === role) || db.residents[0];
    }
};

export default DataService;
