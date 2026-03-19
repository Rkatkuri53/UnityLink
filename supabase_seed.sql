-- UnityLink Seed Data (Run AFTER supabase_schema.sql)

-- 1. Insert Initial Society
INSERT INTO societies (name, address, registration_status)
VALUES ('Skyline Heights', '123 Azure Lane, Tech City', 'Registered');

-- 2. Note: Profiles are created automatically via Supabase Auth.
-- However, for the demo, you can manually insert if you have a User ID.
-- For now, let's seed non-auth tables.

-- 3. Seed Staff
INSERT INTO staff (name, role, phone, verification_status, rating)
VALUES 
('Raju Kumar', 'Maid/Housekeeping', '+91 98765-00001', 'Verified', 4.8),
('Suresh Singh', 'Security Guard', '+91 98765-00002', 'Verified', 4.9),
('Anita Devi', 'Baby Sitter', '+91 98765-00003', 'Verified', 4.7);

-- 4. Seed Amenities
INSERT INTO amenities (name, availability, rules)
VALUES 
('Infinity Pool', true, '{"max_hours": 2, "requires_booking": true}'),
('Elite Clubhouse', true, '{"max_capacity": 50, "booking_fee": 500}'),
('Gymnasium', true, '{"open_hours": "06:00-22:00"}');
