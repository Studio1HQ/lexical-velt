"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AppUser {
  userId: string;
  name: string;
  email: string;
  photoUrl?: string;
  organizationId?: string;
}

interface AppUserContextType {
  user: AppUser | null;
  setUser: (user: AppUser | null) => void;
  isLoggedIn: boolean;
}

const AppUserContext = createContext<AppUserContextType | undefined>(undefined);

export function AppUserProvider({ children }: { children: ReactNode }) {
  // [Velt] Mock user for demonstration
  // In a real app, this would come from your auth system (NextAuth, Clerk, etc.)
  const [user, setUser] = useState<AppUser | null>({
    userId: 'user001',
    name: 'Nany',
    email: 'user1@example.com',
    photoUrl: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany',
    organizationId: 'demo-org',
  });

  const isLoggedIn = !!user;

  return (
    <AppUserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </AppUserContext.Provider>
  );
}

export function useAppUser() {
  const context = useContext(AppUserContext);
  if (context === undefined) {
    throw new Error('useAppUser must be used within an AppUserProvider');
  }
  return context;
}
