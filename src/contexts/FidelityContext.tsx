'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type NavigationFidelityMode = 'realistic' | 'low-fidelity';

interface FidelityContextType {
  navigationFidelityMode: NavigationFidelityMode;
  setNavigationFidelityMode: (mode: NavigationFidelityMode) => void;
  isBlackAndWhite: boolean;
  setIsBlackAndWhite: (enabled: boolean) => void;
  isMonospace: boolean;
  setIsMonospace: (enabled: boolean) => void;
}

const FidelityContext = createContext<FidelityContextType | undefined>(undefined);

export function FidelityProvider({ children }: { children: React.ReactNode }) {
  const [navigationFidelityMode, setNavigationFidelityModeState] = useState<NavigationFidelityMode>('realistic');
  const [isBlackAndWhite, setIsBlackAndWhiteState] = useState<boolean>(false);
  const [isMonospace, setIsMonospaceState] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedNavigationMode = localStorage.getItem('navigation-fidelity-mode') as NavigationFidelityMode;
    if (savedNavigationMode && (savedNavigationMode === 'realistic' || savedNavigationMode === 'low-fidelity')) {
      setNavigationFidelityModeState(savedNavigationMode);
    }

    const savedIsBlackAndWhite = localStorage.getItem('is-black-and-white');
    if (savedIsBlackAndWhite) {
      setIsBlackAndWhiteState(savedIsBlackAndWhite === 'true');
    }

    const savedIsMonospace = localStorage.getItem('is-monospace');
    if (savedIsMonospace) {
      setIsMonospaceState(savedIsMonospace === 'true');
    }
  }, []);

  const setNavigationFidelityMode = (mode: NavigationFidelityMode) => {
    setNavigationFidelityModeState(mode);
    localStorage.setItem('navigation-fidelity-mode', mode);
  };

  const setIsBlackAndWhite = (enabled: boolean) => {
    setIsBlackAndWhiteState(enabled);
    localStorage.setItem('is-black-and-white', enabled.toString());
  };

  const setIsMonospace = (enabled: boolean) => {
    setIsMonospaceState(enabled);
    localStorage.setItem('is-monospace', enabled.toString());
  };

  return (
    <FidelityContext.Provider value={{ 
      navigationFidelityMode, 
      setNavigationFidelityMode, 
      isBlackAndWhite, 
      setIsBlackAndWhite,
      isMonospace,
      setIsMonospace
    }}>
      {children}
    </FidelityContext.Provider>
  );
}

export function useFidelity() {
  const context = useContext(FidelityContext);
  if (context === undefined) {
    throw new Error('useFidelity must be used within a FidelityProvider');
  }
  return context;
} 