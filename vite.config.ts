import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  publicDir: false,
  plugins: [dts()],

  build: {
    target: 'es2020',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LightWeightGridLayout',
      formats: ['es'],
      fileName: (format) => `lightweight-grid-layout.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
  },
});
