import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src'],
  outDir: 'dist',
  loader: {
    '.prisma': 'file',
    '.toml': 'file',
    '.sql': 'file',
  },
})
