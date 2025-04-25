import fse from 'fs-extra';
import path from 'path';
import fs from 'fs';

async function main() {
  try {
    const topDir = path.join(import.meta.dirname, '..');
    console.log('Top directory:', topDir);

    const publicTinyMCEDir = path.join(topDir, 'public', 'tinymce');
    let nodeTinyMCEDir = path.join(topDir, 'node_modules', 'tinymce');

    // 解析软链接到真实路径
    nodeTinyMCEDir = await fs.promises.realpath(nodeTinyMCEDir);
    console.log('Resolved real path:', nodeTinyMCEDir);

    // 确保源目录存在并且是一个目录
    const sourceStats = await fse.stat(nodeTinyMCEDir);
    if (!sourceStats.isDirectory()) {
      throw new Error('Source tinymce is not a directory');
    }

    // 确保目标父目录存在
    await fse.ensureDir(path.join(topDir, 'public'));
    
    // 如果目标目录存在，先完全删除它
    if (await fse.pathExists(publicTinyMCEDir)) {
      await fse.remove(publicTinyMCEDir);
    }

    // 创建新的空目标目录
    await fse.ensureDir(publicTinyMCEDir);

    console.log('Copying from:', nodeTinyMCEDir);
    console.log('Copying to:', publicTinyMCEDir);

    // 复制文件，使用 dereference 选项来复制软链接指向的实际内容
    await fse.copy(nodeTinyMCEDir, publicTinyMCEDir, {
      overwrite: true,
      errorOnExist: false,
      preserveTimestamps: true,
      dereference: true  // 这会复制软链接指向的实际内容，而不是复制软链接本身
    });

    console.log('TinyMCE files copied successfully');
  } catch (error) {
    console.error('Error during postinstall:', error);
    process.exit(1);
  }
}

main();