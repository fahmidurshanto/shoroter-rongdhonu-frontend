'use client';

import React, { createContext, useSyncExternalStore, useContext } from 'react';
import { UserState } from '../types';

interface UserContextType {
  user: UserState | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
});

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('token-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('token-change', callback);
  };
}

function getSnapshot(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

function getServerSnapshot(): null {
  return null;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const user: UserState | null = token ? { isAuthenticated: true, token } : null;

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    window.dispatchEvent(new Event('token-change'));
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('token-change'));
  };

  return (
    <UserContext.Provider value={{ user, isLoading: false, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
