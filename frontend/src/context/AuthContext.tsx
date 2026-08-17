import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role;
  token: string | null;
  login: (email: string, role: Role, name?: string) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('patient');
  const [token, setToken] = useState<string | null>(localStorage.getItem('lifeline_token'));
  const [user, setUser] = useState<User | null>({
    id: 1,
    email: 'patient@lifeline.com',
    full_name: 'John Doe (Patient)',
    role: 'patient',
    is_verified: true
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    let name = 'John Doe';
    let email = `${newRole}@lifeline.com`;
    if (newRole === 'driver') name = 'Capt. Alex Vance';
    if (newRole === 'doctor') name = 'Dr. Sarah Jenkins';
    if (newRole === 'hospital_admin') name = 'Marcus Aurelius (Admin)';
    if (newRole === 'super_admin') name = 'System Super Admin';

    setUser({
      id: Math.floor(Math.random() * 100) + 1,
      email,
      full_name: name,
      role: newRole,
      is_verified: true
    });
  };

  const login = (email: string, userRole: Role, name = 'User') => {
    const fakeToken = 'jwt-token-demo-lifeline-2026';
    localStorage.setItem('lifeline_token', fakeToken);
    setToken(fakeToken);
    setRoleState(userRole);
    setUser({
      id: 1,
      email,
      full_name: name,
      role: userRole,
      is_verified: true
    });
  };

  const logout = () => {
    localStorage.removeItem('lifeline_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
