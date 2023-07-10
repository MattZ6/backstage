import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

function resolvePath(folder: string) {
  return resolve(__dirname, 'src', folder);
}

export default defineConfig({
  resolve: {
    alias: [
      { find: '@domain', replacement: resolvePath('domain') },
      { find: '@application', replacement: resolvePath('application') },
      { find: '@infra', replacement: resolvePath('infra') },
      { find: '@presentation', replacement: resolvePath('presentation') },
      { find: '@main', replacement: resolvePath('main') },
    ],
  },
  test: {
    clearMocks: true,
    include: ['**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts']
    }
  },
});
