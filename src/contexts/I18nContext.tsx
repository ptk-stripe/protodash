import messages from '@/constants/messages.json';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type SupportedLocale = 'en' | 'fr';

const supportedLocales: SupportedLocale[] = ['en', 'fr'];

interface I18nContextType {
  locale: SupportedLocale;
  getMessage: (key: string, params?: Record<string, string | number>) => string;
  formatNumber: (num: number, sigFigs?: number) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: 'en' as SupportedLocale,
  getMessage: () => '',
  formatNumber: () => '',
});

const followPath = (obj: any, path: string[]) => {
  return path.reduce((acc, key) => acc && acc[key], obj);
};

export const I18nProvider = ({
  children,
  locale: initialLocale = 'en',
}: {
  children: React.ReactNode;
  locale?: SupportedLocale;
}) => {
  const [locale, setLocale] = useState<SupportedLocale>(initialLocale);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
      setLocale((prev) => {
        const nextIndex =
          (supportedLocales.indexOf(prev) + 1) % supportedLocales.length;
        return supportedLocales[nextIndex];
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const formatNumber = (num: number, sigFigs?: number) => {
    return num.toLocaleString(locale, {
      minimumFractionDigits: sigFigs,
      maximumFractionDigits: sigFigs,
    });
  };

  const getMessage = (
    key: string,
    params?: Record<string, string | number>
  ) => {
    const path = key.split('.');
    let i18nizedValue = followPath(messages[locale], path);
    if (params && i18nizedValue) {
      Object.entries(params).forEach(([key, value]) => {
        i18nizedValue = i18nizedValue.replace(`{${key}}`, value.toString());
      });
    }
    if (!i18nizedValue) {
      console.warn(`Message not found: ${key}`);
    }
    return i18nizedValue || key;
  };

  return (
    <I18nContext.Provider
      value={{ locale, getMessage, formatNumber }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
