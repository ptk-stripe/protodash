import React, { createContext, useContext, useEffect, useState } from 'react';

interface SailUIContextType {
  sailComponents: any;
  isLoaded: boolean;
}

const SailUIContext = createContext<SailUIContextType>({
  sailComponents: null,
  isLoaded: false,
});

export const useSailUI = () => useContext(SailUIContext);

export function SailUIProvider({ children }: { children: React.ReactNode }) {
  const [sailComponents, setSailComponents] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Sail UI components once at the app level
    // import('@sail/ui')
    //   .then((ui) => {
    //     setSailComponents(ui);
    //     setIsLoaded(true);
    //   })
    //   .catch(console.error);
    
    // For now, provide mock Sail components
    const mockSailComponents = {
      Page: ({ children, header }: any) => (
        <div className="p-6">
          {header && <div className="mb-6">{header}</div>}
          {children}
        </div>
      ),
      PageHeader: ({ title, description, breadcrumbs }: any) => (
        <div className="mb-6">
          {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      ),
      PageSection: ({ children, layout }: any) => (
        <div className="mb-6">{children}</div>
      ),
      PageModule: ({ children, title, hideHeaderDivider }: any) => (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
          {children}
        </div>
      ),
      Breadcrumbs: ({ children }: any) => (
        <nav className="text-sm text-gray-500">{children}</nav>
      ),
      Link: ({ href, children }: any) => (
        <a href={href} className="text-blue-600 hover:text-blue-800 underline">
          {children}
        </a>
      ),
      Button: ({ children, type, onClick }: any) => {
        const baseClasses = "px-4 py-2 rounded font-medium";
        const typeClasses = {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
          destructive: "bg-red-600 text-white hover:bg-red-700"
        };
        return (
          <button 
            className={`${baseClasses} ${typeClasses[type as keyof typeof typeClasses] || typeClasses.secondary}`}
            onClick={onClick}
          >
            {children}
          </button>
        );
      },
      Badge: ({ children, type }: any) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        const typeClasses = {
          info: "bg-blue-100 text-blue-800",
          positive: "bg-green-100 text-green-800",
          warning: "bg-yellow-100 text-yellow-800",
          negative: "bg-red-100 text-red-800"
        };
        return (
          <span className={`${baseClasses} ${typeClasses[type as keyof typeof typeClasses] || "bg-gray-100 text-gray-800"}`}>
            {children}
          </span>
        );
      },
      Banner: ({ type, title, description }: any) => {
        const baseClasses = "p-4 rounded-lg border";
        const typeClasses = {
          caution: "bg-yellow-50 border-yellow-200 text-yellow-800",
          info: "bg-blue-50 border-blue-200 text-blue-800",
          positive: "bg-green-50 border-green-200 text-green-800",
          negative: "bg-red-50 border-red-200 text-red-800"
        };
        return (
          <div className={`${baseClasses} ${typeClasses[type as keyof typeof typeClasses] || typeClasses.info}`}>
            <h4 className="font-semibold mb-1">{title}</h4>
            {description && <p>{description}</p>}
          </div>
        );
      },
      InlineFeedback: ({ children }: any) => (
        <div className="text-sm text-gray-600">{children}</div>
      ),
      createView: (element: string, config: any) => {
        return ({ children, ...props }: any) => {
          const Element = element as any;
          return <Element {...props}>{children}</Element>;
        };
      },
      Spinner: ({ size }: any) => (
        <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${
          size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'
        }`} />
      )
    };
    
    setSailComponents(mockSailComponents);
    setIsLoaded(true);
  }, []);

  return (
    <SailUIContext.Provider value={{ sailComponents, isLoaded }}>
      {children}
    </SailUIContext.Provider>
  );
} 