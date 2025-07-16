import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // 1) demo용 index.html 무시
  publicDir: false,

  // 2) 라이브러리 모드
  build: {
    target: 'es2020',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'LightWeightGridLayout',
      formats: ['es'],         // 필요에 따라 'cjs','umd' 추가
      fileName: (format) => `lightweight-grid-layout.${format}.js`
    },
    rollupOptions: {
      external: [],            // peerDependencies 가 있으면 여기에
      output: { globals: {} }
    }
  },
})
