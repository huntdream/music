import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    server: { open: true },
    plugins: [react(), svgrPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
