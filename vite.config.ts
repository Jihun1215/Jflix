import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: 'src', replacement: '/src' },
      { find: 'assets', replacement: '/src/assets' },
      { find: 'components', replacement: '/src/components' },
      { find: 'pages', replacement: '/src/pages' },
      { find: 'styles', replacement: '/src/styles' },
      { find: 'shared', replacement: '/src/shared' },
      // { find: "element", replacement: "/src/element" },
      { find: 'state', replacement: '/src/state' },
      { find: 'type', replacement: '/src/type' },
      { find: 'utils', replacement: '/src/utils' },
    ],
  },
});
