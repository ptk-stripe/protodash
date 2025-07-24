import React, { createContext, ReactNode, useState } from 'react';
import { DEFAULT_FEATURE_FLAGS, FeatureFlags } from '../types/feature-flags';

interface FeatureFlagsContextType {
  flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
}

export const FeatureFlagsContext = createContext<
  FeatureFlagsContextType | undefined
>(undefined);

interface FeatureFlagsProviderProps {
  children: ReactNode;
  initialFlags?: Partial<FeatureFlags>;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({
  children,
  initialFlags = {},
}) => {
  const [flags, setFlags] = useState<FeatureFlags>({
    ...DEFAULT_FEATURE_FLAGS,
    ...initialFlags,
  });

  const setFlag = (key: keyof FeatureFlags, value: boolean) => {
    setFlags((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FeatureFlagsContext.Provider value={{ flags, setFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
