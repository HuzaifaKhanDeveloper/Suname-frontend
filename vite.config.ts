import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion', 'react-parallax-tilt'],
          'audio-vendor': ['howler', 'tone'],
          'three-vendor': ['three'],
        },
      },
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});