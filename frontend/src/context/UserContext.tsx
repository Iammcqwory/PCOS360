import React, { createContext, useContext, useState } from 'react';

export interface UserProfileState {
  name: string;
  email: string;
  isGuest: boolean;
  age: number;
  heightCm: number;
  weightKg: number;
  waistCm: number;
  diagnosedPCOS: 'Yes' | 'No';
  tryingToConceive: 'Yes' | 'No';
  dietStyle: string;
  primaryGoal: string;
  waterGoalGlasses: number;
  exerciseGoalMins: number;
  notificationsEnabled: boolean;
}

const DEFAULT_PROFILE: UserProfileState = {
  name: 'Amina Bello',
  email: 'amina.bello@pcos360.app',
  isGuest: false,
  age: 26,
  heightCm: 165,
  weightKg: 70,
  waistCm: 84,
  diagnosedPCOS: 'Yes',
  tryingToConceive: 'No',
  dietStyle: 'African Low-GI',
  primaryGoal: 'Manage Insulin & Weight',
  waterGoalGlasses: 8,
  exerciseGoalMins: 25,
  notificationsEnabled: true,
};

interface UserContextType {
  user: UserProfileState;
  updateProfile: (updates: Partial<UserProfileState>) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  resetToDemo: () => void;
}

const UserContext = createContext<UserContextType>({
  user: DEFAULT_PROFILE,
  updateProfile: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  resetToDemo: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfileState>(DEFAULT_PROFILE);

  const updateProfile = (updates: Partial<UserProfileState>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const loginUser = (email: string, name?: string) => {
    setUser(prev => ({
      ...prev,
      email,
      name: name || (email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Amina Bello'),
      isGuest: false,
    }));
  };

  const logoutUser = () => {
    setUser({
      ...DEFAULT_PROFILE,
      name: 'Guest User',
      email: 'guest@pcos360.app',
      isGuest: true,
    });
  };

  const resetToDemo = () => {
    setUser(DEFAULT_PROFILE);
  };

  return (
    <UserContext.Provider value={{ user, updateProfile, loginUser, logoutUser, resetToDemo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
