/// <reference types="vite/client" />

// Electron API types
interface Window {
  electronAPI?: {
    getAppVersion: () => Promise<string>;
    getAppPath: () => Promise<string>;
    platform: string;
    isElectron: boolean;
  };
}
