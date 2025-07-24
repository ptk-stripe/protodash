export interface PrototypeConfig {
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface PrototypePage {
  id: string;
  config: PrototypeConfig;
  path: string;
}

const formatDirName = (dir: string): string => 
  dir.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

// Auto-discover all prototype directories using Webpack's require.context
const discoverPrototypes = (): string[] => {
  const prototypes: string[] = [];
  
  try {
    // Use require.context to get all directories in the prototypes folder
    // This works at build time and gives us true auto-discovery
    const prototypeContext = (require as any).context('@/prototypes', true, /^\.\/[^/]+\/index\.(tsx?|jsx?)$/);
    
    prototypeContext.keys().forEach((key: string) => {
      // Extract directory name from paths like "./example-dashboard/index.tsx"
      const match = key.match(/^\.\/([^/]+)\/index\./);
      if (match) {
        const dirName = match[1];
        if (!prototypes.includes(dirName)) {
          prototypes.push(dirName);
        }
      }
    });
  } catch (error) {
    console.warn('Failed to auto-discover prototypes, falling back to empty array:', error);
  }
  
  return prototypes;
};

const tryLoadPrototype = (dir: string): PrototypePage | null => {
  try {
    // Try to load the config
    const configModule = require(`@/prototypes/${dir}/config`);
    const config = configModule.config || configModule.prototypeConfig || configModule.default;
    
    // Validate that we have a valid config with required fields
    if (!config || typeof config !== 'object') {
      throw new Error('Invalid config object');
    }

    // Ensure all required fields exist with defaults
    const validatedConfig = {
      name: config.name || formatDirName(dir),
      description: config.description || `${formatDirName(dir)} prototype`,
      icon: config.icon || 'product',
      order: typeof config.order === 'number' ? config.order : 999
    };
    
    return {
      id: dir,
      config: validatedConfig,
      path: `/prototype/${dir}`,
    };
  } catch (error) {
    // Try to see if the prototype exists by checking for the main file
    try {
      require(`@/prototypes/${dir}/index`);
      // If the require succeeds, create a default config
      return {
        id: dir,
        config: {
          name: formatDirName(dir),
          description: `${formatDirName(dir)} prototype`,
          icon: 'product',
          order: 999
        },
        path: `/prototype/${dir}`,
      };
    } catch {
      // Prototype doesn't exist
      return null;
    }
  }
};

// Get all prototypes with true auto-discovery
export const getPrototypes = (): PrototypePage[] => {
  const prototypes: PrototypePage[] = [];
  const discoveredDirs = discoverPrototypes();
  
  // Load each discovered prototype
  discoveredDirs.forEach(dir => {
    const prototype = tryLoadPrototype(dir);
    if (prototype) {
      prototypes.push(prototype);
    }
  });

  // Sort by order field, then alphabetically by name
  return prototypes.sort((a, b) => {
    // Safety checks for config properties
    const aOrder = typeof a.config?.order === 'number' ? a.config.order : 999;
    const bOrder = typeof b.config?.order === 'number' ? b.config.order : 999;
    const aName = a.config?.name || a.id;
    const bName = b.config?.name || b.id;
    
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    return aName.localeCompare(bName);
  });
};

// Alias for backwards compatibility
export const getPrototypesSync = getPrototypes; 