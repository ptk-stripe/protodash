import { useContext } from 'react';
import { FeatureFlagsContext } from '../contexts/FeatureFlagsContext';
import { FeatureFlags } from '../types/feature-flags';

export const useFlags = () => {
  const context = useContext(FeatureFlagsContext);

  if (context === undefined) {
    throw new Error('useFlags must be used within a FeatureFlagsProvider');
  }

  return {
    flags: context.flags,
    setFlag: context.setFlag,
    isEnabled: (flag: keyof FeatureFlags) => context.flags[flag],
  };
};
