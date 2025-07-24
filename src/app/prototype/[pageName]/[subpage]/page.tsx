'use client';

import FakeDashboard from '@/components/FakeDashboard';
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext';
import { I18nProvider } from '@/contexts/I18nContext';
import { useSailUI } from '@/contexts/SailUIContext';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface PrototypeSubpageProps {
  params: {
    pageName: string;
    subpage: string;
  };
}

export default function PrototypeSubpage({ params }: PrototypeSubpageProps) {
  const { pageName, subpage } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [SubpageComponent, setSubpageComponent] = useState<React.ComponentType | null>(null);
  const importInProgress = useRef<string | null>(null);
  const { sailComponents, isLoaded: sailLoaded } = useSailUI();

  useEffect(() => {
    const importKey = `${pageName}/${subpage}`;
    
    // Prevent double execution for the same subpage
    if (importInProgress.current === importKey) {
      return;
    }
    
    importInProgress.current = importKey;

  // Dynamically import the subpage component
    import(`@/prototypes/${pageName}/subpages/${subpage}`)
      .then((module) => {
        setSubpageComponent(() => module.default);
        setIsLoading(false);
        importInProgress.current = null;
      })
      .catch(() => {
      // Fallback component for missing subpages
        setSubpageComponent(() => () => (
        <div style={{ padding: '2rem' }}>
          <h1>Subpage Not Found</h1>
          <p>The subpage "{subpage}" for prototype "{pageName}" could not be found.</p>
        </div>
        ));
        setIsLoading(false);
        importInProgress.current = null;
      });
  }, [pageName, subpage]);

  // Show loading spinner while Sail UI or subpage is loading
  if (!sailLoaded || isLoading) {
    const Spinner = sailComponents?.Spinner;
    return (
      <I18nProvider locale='en'>
        <FeatureFlagsProvider>
          <FakeDashboard>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '200px',
              padding: '2rem'
            }}>
              {Spinner ? <Spinner size="medium" /> : <div>Loading...</div>}
            </div>
          </FakeDashboard>
        </FeatureFlagsProvider>
      </I18nProvider>
    );
  }

  return (
    <I18nProvider locale='en'>
      <FeatureFlagsProvider>
        <FakeDashboard>
          {SubpageComponent && <SubpageComponent />}
        </FakeDashboard>
      </FeatureFlagsProvider>
    </I18nProvider>
  );
} 