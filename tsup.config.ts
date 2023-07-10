import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  clean: true,
  loader: {
    '.prisma': 'file',
    '.toml': 'file',
    '.sql': 'file',
  },
});
