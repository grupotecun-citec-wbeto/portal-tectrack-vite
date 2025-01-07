import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.js';

export default defineConfig((env) => {
  const extendedConfig = {
    base : '/portal-tectrack-vite/',
  };

  return mergeConfig(baseConfig, extendedConfig);
});