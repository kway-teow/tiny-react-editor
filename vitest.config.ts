import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'public/**',
        '**/*.config.js',
        '**/*.config.ts',
        'env-setup.js',
        'postinstall.js',
        'cli/**',
        'src/App.tsx',
        'src/main.tsx',
        '**/*.d.ts',
        'node_modules/**',
        'src/components/editor/index.tsx'
      ],
      include: ['src/components/editor/**/*.tsx']
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
