import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'Admin' | 'Lecturer' | 'Student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string; 
}

interface AuthContextType {
  user: User | null; 
  isLoading: boolean; 
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true); 
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = {
      id: '1', 
      name: role === 'Admin' ? 'Admin User' : role === 'Lecturer' ? 'Dr. Jane Smith' : 'John Doe',
      email: email, 
      role: role, 
    };
    setUser(mockUser);
    setIsLoading(false); 
  };

  const logout = () => {
    setUser(null);
    setIsLoading(false); 
  };

  const value = { user, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {}
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};