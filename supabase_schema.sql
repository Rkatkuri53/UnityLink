-- UnityLink Production Schema (PostgreSQL/Supabase)

-- 1. Societies Table (Multi-tenancy)
CREATE TABLE societies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT,
    registration_status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Profiles Table (Residents, Admins, Guards)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('Resident', 'Society-Admin', 'Gate-Guard')) NOT NULL,
    unit_no TEXT,
    society_id UUID REFERENCES societies(id),
    eco_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Complaints Table
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resident_id UUID REFERENCES profiles(id),
    category TEXT NOT NULL,
    description TEXT,
    urgency TEXT CHECK (urgency IN ('Low', 'Medium', 'High', 'Emergency')),
    status TEXT DEFAULT 'Open',
    assigned_to UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Expenses Table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id UUID REFERENCES societies(id),
    vendor TEXT,
    amount DECIMAL(12,2),
    category TEXT,
    verified BOOLEAN DEFAULT FALSE,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Staff Table
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id UUID REFERENCES societies(id),
    name TEXT NOT NULL,
    role TEXT,
    phone TEXT,
    verification_status TEXT DEFAULT 'Pending',
    rating DECIMAL(2,1) DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Amenities Table
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id UUID REFERENCES societies(id),
    name TEXT NOT NULL,
    rules JSONB,
    availability BOOLEAN DEFAULT TRUE
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Logic for RLS: Residents can only see their own society's expenses
CREATE POLICY "Residents see society expenses" ON expenses
    FOR SELECT USING (
        auth.uid() IN (SELECT id FROM profiles WHERE society_id = expenses.society_id)
    );
