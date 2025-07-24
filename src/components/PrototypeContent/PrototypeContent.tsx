import React from 'react';
import styles from './PrototypeContent.module.css';
// import { Link } from '@sail/ui';
// import { Link } from '../../mocks/sail-ui';

export default function PrototypeContent() {
  return (
    <div className={styles.prototypeContainer}>
      <h1 className={styles.welcomeTitle}>Stripe Protodash</h1>
      <p className={styles.welcomeDescription}>
        This is a blank canvas for prototyping Stripe experiences in the dashboard. To get started, visit the <a href="/prototype/example-dashboard">example prototype</a>. 
      </p>
    </div>
  );
} 