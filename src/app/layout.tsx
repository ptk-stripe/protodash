'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// Import all of Sail UI to ensure components and CSS are loaded server-side
// import '@sail/ui';
import BackgroundGradient from '@/components/BackgroundGradient/BackgroundGradient';
// import { ViewTransitions } from 'next-view-transitions'; // Removed to disable fade transitions
import { useEffect, useRef, useState } from 'react';
import styles from './layout.module.css';
import { SailUIProvider } from '@/contexts/SailUIContext';
import { FidelityProvider } from '@/contexts/FidelityContext';

// Sail UI components are imported directly where needed

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  // Set initial to `false` if you want to show intro gradient, `true` to hide it.
  const [isHidden, setIsHidden] = useState(true);

  return (
      <html lang='en'>
        <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <SailUIProvider>
          <FidelityProvider>
            <div
              className={`${styles.backgroundGradientContainer} ${
                isHidden ? styles.isHidden : ''
              }`}
              ref={containerRef}
              onClick={(e) => {
                setIsHidden(true);
              }}
            >
              <BackgroundGradient
                containerRef={containerRef}
                isHidden={isHidden}
              />
            </div>
            {children}
          </FidelityProvider>
        </SailUIProvider>
        </body>
      </html>
  );
}
