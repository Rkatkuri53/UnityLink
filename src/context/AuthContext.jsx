import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 'res-101',
    name: 'John Doe',
    role: 'Resident',
    society: 'Skyline Heights',
    unit: 'B-1402'
  });

  const loginAs = (role) => {
    const rolesMap = {
      Resident: { id: 'res-101', name: 'John Doe', role: 'Resident', society: 'Skyline Heights', unit: 'B-1402' },
      Admin: { id: 'adm-001', name: 'Alice Smith', role: 'Society-Admin', society: 'Skyline Heights' },
      Guard: { id: 'grd-07', name: 'Officer Singh', role: 'Gate-Guard', society: 'Skyline Heights' },
      Collector: { id: 'col-99', name: 'Robert Green', role: 'Collector', society: 'Skyline Heights' }
    };
    setUser(rolesMap[role]);
  };

  return (
    <AuthContext.Provider value={{ user, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
