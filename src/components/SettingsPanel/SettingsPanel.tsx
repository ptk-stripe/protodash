import React from 'react';
import { createPortal } from 'react-dom';
import { useSailUI } from '@/contexts/SailUIContext';
import { useFidelity } from '@/contexts/FidelityContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { sailComponents, isLoaded } = useSailUI();
  const { 
    navigationFidelityMode, 
    setNavigationFidelityMode, 
    isBlackAndWhite,
    setIsBlackAndWhite,
    isMonospace,
    setIsMonospace
  } = useFidelity();

  // Loading state
  if (!isLoaded || !sailComponents) {
    return null;
  }

  // Extract the components from sailComponents
  const { Switch, createView: sailCreateView } = sailComponents;

  // Custom styled components
  const Panel = sailCreateView('div', {
    css: {
      position: 'fixed',
      top: '80px',
      right: '24px',
      width: '320px',
      backgroundColor: 'surface',
      borderRadius: 'large',
      boxShadow: 'large',
      zIndex: 1000,
      padding: 'large',
      // Reset any filters applied by parent elements
      filter: 'none',
    },
  });

  const Header = sailCreateView('div', {
    css: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 'small',
    },
  });

  const Title = sailCreateView('h3', {
    css: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '700',
      color: 'text.primary',
    },
  });

  const CloseButton = sailCreateView('button', {
    css: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 'small',
      borderRadius: 'small',
    },
  });



  if (!isOpen) {
    return null;
  }

  // Calculate toggle states based on current fidelity modes
  const isLowFidelityNav = navigationFidelityMode === 'low-fidelity';

  // Use portal to render outside the filtered container
  return createPortal(
    <Panel className="resetFilters">
      <Header>
        <Title>Wireframe Settings</Title>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </Header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          label="Low fidelity nav"
          checked={isLowFidelityNav}
          onChange={() => setNavigationFidelityMode(isLowFidelityNav ? 'realistic' : 'low-fidelity')}
        />

        <Switch
          label="Black and white"
          checked={isBlackAndWhite}
          onChange={() => setIsBlackAndWhite(!isBlackAndWhite)}
        />

        <Switch
          label="Monospace font"
          checked={isMonospace}
          onChange={() => setIsMonospace(!isMonospace)}
        />
      </div>
    </Panel>,
    document.body
  );
} 