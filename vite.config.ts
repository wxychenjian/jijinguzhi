import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from 'vite-plugin-trae-solo-badge';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: 'hidden',
  },
  server: {
    proxy: {
      '/api/fund': {
        target: 'http://fundgz.1234567.com.cn/js',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fund/, ''),
      },
    },
  },
  preview: {
    proxy: {
      '/api/fund': {
        target: 'http://fundgz.1234567.com.cn/js',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fund/, ''),
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    traeBadgePlugin({
      variant: 'dark',
      position: 'bottom-right',
      prodOnly: true,
      clickable: true,
      clickUrl: 'https://www.trae.ai/solo?showJoin=1',
      autoTheme: true,
      autoThemeTarget: '#root'
    }), 
    tsconfigPaths()
  ],
})
