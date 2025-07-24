import ArrowsLoop from '@/components/icons/arrowsLoop';
import Balance from '@/components/icons/balance';
import Billing from '@/components/icons/billing';
import ChevronDown from '@/components/icons/chevronDown';
import Clock from '@/components/icons/clock';
import DevTools from '@/components/icons/devTools';
import Home from '@/components/icons/home';
import More from '@/components/icons/more';
import Person from '@/components/icons/person';
import Pin from '@/components/icons/pin';
import Platform from '@/components/icons/platform';
import Product from '@/components/icons/product';
import Reporting from '@/components/icons/reporting';
import Wallet from '@/components/icons/wallet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useI18n } from '@/contexts/I18nContext';
import { useFidelity } from '@/contexts/FidelityContext';
import { MERCHANT_NAME } from '@/utils/fakes';
import { getPrototypes } from '@/utils/prototype-discovery';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [navPopoverOpen, setNavPopoverOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { getMessage } = useI18n();
  const { navigationFidelityMode } = useFidelity();
  const prototypes = getPrototypes();

  // Icon mapping for prototypes - TODO handle with Sail Icons
  const getPrototypeIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      clock: <Clock />,
      balance: <Balance />,
      home: <Home />,
      person: <Person />,
      product: <Product />,
      platform: <Platform />,
      wallet: <Wallet />,
      billing: <Billing />,
      reporting: <Reporting />,
      devtools: <DevTools />,
      more: <More />,
    };
    return iconMap[iconName] || <Clock />; // Default to Clock if icon not found
  };

  const handleNavigate = () => {
    // Navigation simplified for prototyping environment
    console.log('Navigation placeholder loaded for prototyping');
  };

  // Helper function to render text or blob based on fidelity mode
  const renderNavText = (text: string, isSelected: boolean = false) => {
    if (navigationFidelityMode === 'realistic' || isSelected) {
      return <span className={styles.labelMedium}>{text}</span>;
    } else {
      return <div className={styles.textBlob} />;
    }
  };

  // Helper function to render spacer or nothing based on fidelity mode
  const renderSpacer = (isSelected: boolean = false) => {
    if (navigationFidelityMode === 'realistic' || isSelected) {
      return <span className={styles.spacer}></span>;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.navBar}>
      <DropdownMenu open={navPopoverOpen} onOpenChange={setNavPopoverOpen}>
        <DropdownMenuTrigger asChild>
          <div className={styles.merchantSelection}>
            <Image
              src="/images/tofu.png"
              width={24}
              height={24}
              alt="Tofu Treasury"
              style={{ borderRadius: '4px' }}
            />
            <span className={styles.merchantName}>{MERCHANT_NAME}</span>
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleNavigate}>
            Go to {path === '/' ? 'UXR' : 'Demo'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={styles.productSection}>
        <div>
          <div 
              className={`${styles.navBarItem} ${path === '/dashboard' ? styles.selectedItemContainer : ''}`}
              onClick={() => router.push('/dashboard')}
              style={{ cursor: 'pointer' }}>
            <Home />
            {renderNavText(getMessage('navBar.home'), path === '/dashboard')}
          </div>
          <div
            className={`${styles.navBarItem}`}
          >
            <Balance />
            {renderNavText(getMessage('navBar.balances'))}
          </div>
          <div className={styles.navBarItem}>
            <ArrowsLoop />
            {renderNavText(getMessage('navBar.transactions'))}
          </div>
          <div className={styles.navBarItem}>
            <Person />
            {renderNavText(getMessage('navBar.customers'))}
          </div>
          <div className={styles.navBarItem}>
            <Product />
            {renderNavText(getMessage('navBar.productCatalog'))}
          </div>

          <div className={styles.productsLabel}>
            {getMessage('navBar.shortcuts')}
          </div>
          {/* Dynamic Prototypes */}
          {prototypes.map((prototype) => (
            <div 
              key={prototype.id}
              className={`${styles.navBarItem} ${path === prototype.path ? styles.selectedItemContainer : ''}`}
              onClick={() => router.push(prototype.path)}
              style={{ cursor: 'pointer' }}
            >
              {getPrototypeIcon(prototype.config.icon)}
              {renderNavText(prototype.config.name, path === prototype.path)}
              {renderSpacer(path === prototype.path)}
              <Pin className={styles.pinIcon} />
            </div>
          ))}

          <div className={styles.productsLabel}>
            {getMessage('navBar.products')}
          </div>
          <div className={styles.navBarItem}>
            <Platform />
            {renderNavText(getMessage('navBar.connect'))}
            {renderSpacer()}
            <ChevronDown />
          </div>
          <div className={styles.navBarItem}>
            <Wallet />
            {renderNavText(getMessage('navBar.payments'))}
            {renderSpacer()}
            <ChevronDown />
          </div>
          <div className={styles.navBarItem}>
            <Billing />
            {renderNavText(getMessage('navBar.billing'))}
            {renderSpacer()}
            <ChevronDown />
          </div>
          <div className={styles.navBarItem}>
            <Reporting />
            {renderNavText(getMessage('navBar.reporting'))}
            {renderSpacer()}
            <ChevronDown />
          </div>
          <div className={styles.navBarItem}>
            <More />
            {renderNavText(getMessage('navBar.more'))}
            {renderSpacer()}
            <ChevronDown />
          </div>
        </div>
        <div className={styles.navBarItem}>
          <DevTools />
          {renderNavText(getMessage('navBar.developers'))}
        </div>
      </div>
    </div>
  );
}
