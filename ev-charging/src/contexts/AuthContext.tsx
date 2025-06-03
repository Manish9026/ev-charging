import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/User';
import { API_URL } from '../config';
import { useLazyLogoutQuery, useLazyVerifyUserQuery, useLoginMutation, useRegisterMutation } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

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
  const [userRegister,{isLoading:registerLoading}]=useRegisterMutation();
  const [userLogin,{isLoading:loginLoading}]=useLoginMutation();
  const [verifyUser]=useLazyVerifyUserQuery({
    refetchOnFocus:true,
    refetchOnReconnect:true
  })
  const navigate=useNavigate();
  const [userLogout]=useLazyLogoutQuery({
    refetchOnFocus:true,
    refetchOnReconnect:true
  })
  // Initialize auth state
  useEffect(() => {
  //  console.log(user,"user");
   if(!user?.isLoggedIn){
     checkAuth();
   }

  },[]);
   const checkAuth = async () => {


      verifyUser({}).unwrap().then(res=>{
        console.log(res);
        setUser({...res?.user,isLoggedIn:true})  
      }).catch(err=>{
        console.log(err);
        
      })
      
    
      
      setLoading(false);
    };
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call for demo
      // In a real app: const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      setLoading(true)
      await userLogin({email, password}).unwrap().then(res=>{


        console.log(res);
        
        setUser({...res?.user,isLoggedIn:true})
        navigate(-1)
      setLoading(false)

        
      }).catch((err)=>{
        setUser(null);
        console.log(err);
      setLoading(false)

        
      })
      // Demo user data
      // let userData;
      
      // if (email === 'admin@example.com' && password === 'password') {
      //   userData = {
      //     _id: '1',
      //     name: 'Admin User',
      //     email: 'admin@example.com',
      //     isAdmin: true,
      //   };
      // } else if (email === 'user@example.com' && password === 'password') {
      //   userData = {
      //     _id: '2',
      //     name: 'Test User',
      //     email: 'user@example.com',
      //     isAdmin: false,
      //   };
      // } else {
      //   throw new Error('Invalid credentials');
      // }
      
      // const token = 'demo-token-' + Math.random().toString(36).substring(2);
      
      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(userData));
      
      // setUser(userData);
    } catch (error) {
      setLoading(false)
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call for demo
      // In a real app: const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      setLoading(true)
      await userRegister({email,password,name}).unwrap().then(res=>{
        console.log(res);
        
        navigate("/login")
         setLoading(false)
      }).catch(err=>{
        console.log(err);
         setLoading(false)
      })

      // const userData = {
      //   _id: '3',
      //   name,
      //   email,
      //   isAdmin: false,
      // };
      
      // const token = 'demo-token-' + Math.random().toString(36).substring(2);
      
      // localStorage.setItem('token', token);
      // localStorage.setItem('user', JSON.stringify(userData));
      
      // setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async() => {

    await userLogout({}).unwrap().then((res)=>{

      if(res.status){
    setUser(null);
    navigate("/login")
      }
    }).catch(err=>{

    })

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