import AddCircleFilled from '@/components/icons/addCircleFilled';
import Apps from '@/components/icons/apps';
import Help from '@/components/icons/help';
import Notifications from '@/components/icons/notifications';
import Settings from '@/components/icons/settings';
import NavBar from '@/components/NavBar';
import Search from '@/components/Search/Search';
import SettingsPanel from '@/components/SettingsPanel';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFidelity } from '@/contexts/FidelityContext';
import styles from './FakeDashboard.module.css';

export default function FakeDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isBlackAndWhite, isMonospace } = useFidelity();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  // Get the appropriate CSS classes based on component fidelity mode
  const getComponentFidelityClasses = () => {
    const classes = [];
    if (isBlackAndWhite) {
      classes.push('blackAndWhiteMode');
    }
    if (isMonospace) {
      classes.push('monospaceMode');
    }
    return classes.join(' ');
  };

  return (
    <div className={`${styles.dashboardRoot} ${getComponentFidelityClasses()}`}>
      <NavBar />
      <div className={styles.dashboardBody}>
        <div className={styles.dashboardTopNav}>
          <Search />
          <div className={styles.toolbarContainer}>
            <div className={styles.toolbarContainer}>
              <div className={styles.iconWrapper}>
                <Apps />
              </div>
              <div className={styles.iconWrapper}>
                <Help />
              </div>
              <div className={styles.iconWrapper}>
                <Notifications />
              </div>
              <div 
                className={styles.iconWrapper} 
                onClick={handleSettingsClick}
                onMouseEnter={() => setIsSettingsHovered(true)}
                onMouseLeave={() => setIsSettingsHovered(false)}
                style={{ position: 'relative' }}
              >
                <Settings />
                {isSettingsHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-35px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'black',
                      color: 'white',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      fontSize: '13.2px',
                      whiteSpace: 'nowrap',
                      zIndex: 1001,
                      pointerEvents: 'none',
                    }}
                  >
                    Prototype Settings
                  </div>
                )}
              </div>
              <div className={`${styles.iconWrapper} ${styles.addCircle}`}>
                <AddCircleFilled />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dashboardContent}>{children}</div>
      </div>
      
      <SettingsPanel 
        isOpen={isSettingsPanelOpen} 
        onClose={() => setIsSettingsPanelOpen(false)} 
      />
    </div>
  );
}
