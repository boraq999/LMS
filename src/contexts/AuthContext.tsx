'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  username: string;
  role: 'admin' | 'student';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, role: 'admin' | 'student') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('edumate-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('edumate-user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((username: string, role: 'admin' | 'student') => {
    const newUser: User = { username, role };
    setUser(newUser);
    localStorage.setItem('edumate-user', JSON.stringify(newUser));
    if (role === 'student') {
        router.push('/student');
    } else {
        router.push('/admin');
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('edumate-user');
    router.push('/login');
  }, [router]);
  
  // Redirect if user is logged in and tries to access /login
  useEffect(() => {
    if (!loading && user && pathname === '/login') {
       if (user.role === 'student') {
        router.replace('/student');
      } else {
        router.replace('/admin');
      }
    }
  }, [user, loading, pathname, router]);


  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
