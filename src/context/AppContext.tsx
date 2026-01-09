import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AutomationResult } from '../types';

interface AppContextType {
  activeBlueprint: AutomationResult | null;
  setActiveBlueprint: (blueprint: AutomationResult | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeBlueprint, setActiveBlueprint] = useState<AutomationResult | null>(null);

  return (
    <AppContext.Provider value={{ activeBlueprint, setActiveBlueprint }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
