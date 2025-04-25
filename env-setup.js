/**
 * 这个脚本用于设置环境变量，方便在不同环境下引用@kwayteow/tiny-react-editor库
 * 
 * 用法:
 * 开发环境: node env-setup.js src
 * 生产环境: node env-setup.js dist
 * 默认(npm包): node env-setup.js
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __dirname = dirname(fileURLToPath(import.meta.url));

// 获取命令行参数
const packagePath = process.argv[2] || '';

// 验证参数
if (packagePath && !['src', 'dist'].includes(packagePath)) {
  console.error('Invalid package path. Use "src", "dist", or no argument for npm package.');
  process.exit(1);
}

// 创建或更新.env文件
const envContent = `# 这个文件由env-setup.js自动生成
# 指定@kwayteow/tiny-react-editor包的路径
PACKAGE_PATH=${packagePath}
`;

writeFileSync(resolve(__dirname, '.env'), envContent);

console.log(`Environment set up successfully. PACKAGE_PATH=${packagePath || 'npm package'}`); 