import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOnboarding, setIsOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from storage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('unitylink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (role, phone) => {
    const rolesMap = {
      Resident: { id: 'res-101', name: 'John Doe', role: 'Resident', society: 'Skyline Heights', unit: 'B-1402', phone },
      Admin: { id: 'adm-001', name: 'Alice Smith', role: 'Society-Admin', society: 'Skyline Heights', phone },
      Guard: { id: 'grd-07', name: 'Officer Singh', role: 'Gate-Guard', society: 'Skyline Heights', phone }
    };
    const userData = rolesMap[role] || rolesMap['Resident'];
    setUser(userData);
    localStorage.setItem('unitylink_user', JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('unitylink_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unitylink_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isOnboarding, setIsOnboarding }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
