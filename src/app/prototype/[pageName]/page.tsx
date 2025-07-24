
import FakeDashboard from '@/components/FakeDashboard';
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext';
import { I18nProvider } from '@/contexts/I18nContext';
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSailUI } from '@/contexts/SailUIContext';

interface PrototypePageProps {
  params: Promise<{
    pageName: string;
  }>;
}

// Required for static export with dynamic routes
export async function generateStaticParams() {
  return [
    { pageName: "example-dashboard" },
    // Add more prototypes here as they are created
  ];
}

export default function PrototypePage({ params }: PrototypePageProps) {
  const { pageName } = React.use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [PrototypeComponent, setPrototypeComponent] = useState<React.ComponentType | null>(null);
  const importInProgress = useRef<string | null>(null);
  const { sailComponents, isLoaded: sailLoaded } = useSailUI();

  console.log('🔄 PrototypePage render:', { pageName, isLoading, hasComponent: !!PrototypeComponent });

  // Determine what to render
  const shouldShowSpinner = isLoading;
  const shouldShowComponent = !isLoading && PrototypeComponent;
  console.log('🎨 Render decision:', { shouldShowSpinner, shouldShowComponent, isLoading, hasComponent: !!PrototypeComponent });

  useEffect(() => {
    console.log('🚀 useEffect triggered for pageName:', pageName);
    
    // Prevent double execution for the same pageName
    if (importInProgress.current === pageName) {
      console.log('⚠️ Import already in progress for:', pageName, '- skipping');
      return;
    }
    
    // Reset state when pageName changes
    console.log('📝 Resetting state...');
    setIsLoading(true);
    setPrototypeComponent(null);
    importInProgress.current = pageName;
    
    console.log('📦 Starting import for:', pageName);
    // Only load the prototype component now
    import(`@/prototypes/${pageName}/index`)
      .then((module) => {
        console.log('✅ Import successful for:', pageName, module);
        // Force re-evaluation of the module
        const Component = module.default;
        setPrototypeComponent(() => Component);
        setIsLoading(false);
        importInProgress.current = null;
        console.log('🎯 Component set and loading finished for:', pageName);
      })
      .catch((error) => {
        console.log('❌ Import failed for:', pageName, error);
        console.log('🔄 Trying fallback component...');
        import('@/components/PrototypeContent/PrototypeContent')
          .then((fallbackModule) => {
            console.log('✅ Fallback import successful');
            setPrototypeComponent(() => fallbackModule.default);
            setIsLoading(false);
            importInProgress.current = null;
          })
          .catch((fallbackError) => {
            console.log('❌ Fallback import failed:', fallbackError);
            // Final fallback
            setPrototypeComponent(() => () => (
              <div style={{ padding: '2rem' }}>
                <h1>Prototype Not Found</h1>
                <p>The prototype "{pageName}" could not be loaded.</p>
              </div>
            ));
            setIsLoading(false);
            importInProgress.current = null;
          });
      });
  }, [pageName]);

  // Show loading spinner while Sail UI or prototype is loading
  if (!sailLoaded || shouldShowSpinner) {
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
          {shouldShowComponent && <PrototypeComponent key={pageName} />}
        </FakeDashboard>
      </FeatureFlagsProvider>
    </I18nProvider>
  );
}
