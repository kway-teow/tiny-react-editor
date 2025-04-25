import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import * as dotenv from 'dotenv'

// 加载.env文件
dotenv.config()

// 包名
const PACKAGE_NAME = '@kwayteow/tiny-react-editor'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/components/editor/**/*'],
      outDir: 'dist',
      staticImport: true,
      insertTypesEntry: true,
      tsconfigPath: 'tsconfig.lib.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/editor/index.tsx'),
      name: 'TinyReactEditor',
      fileName: 'index'
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', '@tinymce/tinymce-react', 'tinymce'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@tinymce/tinymce-react': 'TinyMCEReact',
          'tinymce': 'tinymce'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      [PACKAGE_NAME]: process.env.PACKAGE_PATH === 'src'
        ? resolve(__dirname, 'src/components/editor')
        : process.env.PACKAGE_PATH === 'dist'
          ? resolve(__dirname, 'dist')
          : PACKAGE_NAME
    }
  }
})
