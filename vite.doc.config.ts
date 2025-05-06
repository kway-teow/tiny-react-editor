import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

// 包名
const PACKAGE_NAME = '@kwayteow/tiny-react-editor';

// 加载.env文件
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  // 配置开发服务器
  server: {
    port: 10023, // 设置默认端口为8080
    host: true, // 监听所有地址，包括局域网和公网地址
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      [PACKAGE_NAME]: resolve(__dirname, 'src/components/editor')
    },
  },
  build: {
    outDir: 'docs',
  },
});
