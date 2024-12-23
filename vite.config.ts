import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.build.json'
    }),
    libCss()
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'zeformv',
      fileName: 'zeformv'
    },
    rollupOptions: {
      external: ['vue', 'element-plus']
    }
  }
})
