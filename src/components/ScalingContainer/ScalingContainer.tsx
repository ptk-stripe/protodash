'use client';

import React, { useEffect } from 'react';
import styles from './ScalingContainer.module.css';

export default function Home({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const scaleContainer = () => {
      const scale = window.innerWidth / 1290;
      document.body.style.setProperty('--scale', `${scale}`);
    };
    scaleContainer();
    window.addEventListener('resize', () => {
      scaleContainer();
    });
  }, []);
  return <div className={styles.scalingContainer}>{children}</div>;
}
