'use client';

import PrototypeContent from '@/components/PrototypeContent/PrototypeContent';
import FakeDashboard from '@/components/FakeDashboard';
import { FeatureFlagsProvider } from '@/contexts/FeatureFlagsContext';
import { I18nProvider } from '@/contexts/I18nContext';
import React from 'react';

export default function Dashboard() {
  return (
    <I18nProvider locale='en'>
      <FeatureFlagsProvider>
        <FakeDashboard>
          <PrototypeContent />
        </FakeDashboard>
      </FeatureFlagsProvider>
    </I18nProvider>
  );
} 