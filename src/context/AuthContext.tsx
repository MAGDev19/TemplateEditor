import { createContext, useContext, useState, type ReactNode } from 'react';
import { storage } from '../utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => storage.get<User | null>('user_data', null));

  const [token, setToken] = useState<string | null>(() => storage.get<string | null>('auth_token', null));

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    storage.set('auth_token', newToken);
    storage.set('user_data', userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    storage.remove('auth_token');
    storage.remove('user_data');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return context;
};
