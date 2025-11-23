import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // required for Render
  },
  server: {
    port: 5173, // optional for local dev
  },
  define: {
    'process.env': process.env, // allows VITE_API_URL usage
  },
});
