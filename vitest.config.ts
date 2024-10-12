import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: ['**/__tests__', '**/*.test.{ts,tsx}'],
    },
  },
});
