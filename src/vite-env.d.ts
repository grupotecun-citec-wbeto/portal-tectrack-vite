/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// This file is used to define types for Vite and PWA client features.
// It ensures that TypeScript recognizes the types for Vite's environment variables
// and the PWA client functionalities, such as service worker registration and updates.
/*declare module 'virtual:pwa-register/react' {
  export function useRegisterSW(options?: any): {
    offlineReady: [boolean, (value: boolean) => void];
    needRefresh: [boolean, (value: boolean) => void];
    updateServiceWorker: (reloadPage?: boolean) => void;
  };
}

declare module 'virtual:pwa-register' {
  export function useRegisterSW(options?: any): {
    offlineReady: [boolean, (value: boolean) => void];
    needRefresh: [boolean, (value: boolean) => void];
    updateServiceWorker: (reloadPage?: boolean) => void;
  };
}*/

/*declare module 'virtual:pwa-register/react' {
  export * from 'vite-plugin-pwa/client'
}*/

// Additional global types can be defined here if needed.

// This file is automatically included in the TypeScript compilation process
// and provides type definitions for Vite and PWA functionalities used in the project.

// Note: Ensure that the paths and types match your project's structure and dependencies.
// You may need to adjust the types based on the actual implementation of your PWA features.

// This file should be placed in the `src` directory of your Vite project
// and referenced in your `tsconfig.json` or `tsconfig.app.json` under the "include" section.
// Example:
// "include": ["src", "src/vite-env.d.ts"]

