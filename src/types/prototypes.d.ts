// Prototype module declarations
// This file helps TypeScript recognize all prototype modules automatically

// Allow any prototype index file to be imported
declare module '@/prototypes/*/index' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

// Allow any prototype config file to be imported
declare module '@/prototypes/*/config' {
  import { PrototypeConfig } from '@/utils/prototype-discovery';
  export const config: PrototypeConfig;
  export const prototypeConfig: PrototypeConfig;
  const defaultConfig: PrototypeConfig;
  export default defaultConfig;
}

// Allow any prototype subpage to be imported
declare module '@/prototypes/*/subpages/*' {
  import React from 'react';
  const Component: React.ComponentType<any>;
  export default Component;
}

// Specific declarations for existing prototypes (this helps with better IntelliSense)
declare module '@/prototypes/example-dashboard/index' {
  import React from 'react';
  const ExampleDashboard: React.ComponentType;
  export default ExampleDashboard;
}

declare module '@/prototypes/page-template/index' {
  import React from 'react';
  const PageTemplate: React.ComponentType;
  export default PageTemplate;
}
