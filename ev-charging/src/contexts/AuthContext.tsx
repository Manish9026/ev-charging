import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/User';
import { API_URL } from '../config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // For demo purposes, simulating an API response
          // In a real app, you would verify the token with your backend
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          setUser(user);
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call for demo
      // In a real app: const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      // Demo user data
      let userData;
      
      if (email === 'admin@example.com' && password === 'password') {
        userData = {
          _id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true,
        };
      } else if (email === 'user@example.com' && password === 'password') {
        userData = {
          _id: '2',
          name: 'Test User',
          email: 'user@example.com',
          isAdmin: false,
        };
      } else {
        throw new Error('Invalid credentials');
      }
      
      const token = 'demo-token-' + Math.random().toString(36).substring(2);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call for demo
      // In a real app: const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      const userData = {
        _id: '3',
        name,
        email,
        isAdmin: false,
      };
      
      const token = 'demo-token-' + Math.random().toString(36).substring(2);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      // Simulate API call for demo
      // In a real app: const response = await axios.put(`${API_URL}/users/profile`, userData);
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};