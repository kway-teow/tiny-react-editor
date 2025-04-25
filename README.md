# TinyMCE React 编辑器

基于 TinyMCE 的 React 富文本编辑器组件，提供了完整的编辑器功能和只读模式。

## 安装

```bash
npm install tinymce-react-editor
# 或
yarn add tinymce-react-editor
# 或
pnpm add tinymce-react-editor
```

## 前提条件

您需要在项目中安装以下依赖：

```bash
npm install react react-dom @tinymce/tinymce-react tinymce
```

## 使用方法

### 编辑器组件

```jsx
import React, { useState } from 'react';
import { TinyEditor } from 'tinymce-react-editor';

function App() {
  const [content, setContent] = useState('<p>Hello, World!</p>');

  return (
    <div>
      <TinyEditor 
        value={content}
        onChange={setContent}
        height={500}
        tinymceScriptSrc="/tinymce/tinymce.min.js" // TinyMCE脚本路径
        contentCss="/css/editor-content.css" // 内容样式表
      />
    </div>
  );
}
```

### 只读模式

```jsx
import React from 'react';
import { TinyEditorReadOnly } from 'tinymce-react-editor';

function ReadOnlyView() {
  return (
    <div>
      <TinyEditorReadOnly 
        content="<p>这是只读内容</p>"
        height={500}
        tinymceScriptSrc="/tinymce/tinymce.min.js" // TinyMCE脚本路径
        contentCss="/css/editor-content.css" // 内容样式表
      />
    </div>
  );
}
```

### 从URL加载内容

```jsx
import React from 'react';
import { TinyEditorReadOnly } from 'tinymce-react-editor';

function LoadFromUrl() {
  return (
    <div>
      <TinyEditorReadOnly 
        contentUrl="https://example.com/content.html"
        height={500}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        contentCss="/css/editor-content.css"
      />
    </div>
  );
}
```

## 自定义字体族

```jsx
import React from 'react';
import { TinyEditor } from 'tinymce-react-editor';

function CustomFonts() {
  // 自定义字体族配置
  const customFontFamily = 'Arial=arial,helvetica,sans-serif; 宋体=simsun; 微软雅黑=microsoft yahei,sans-serif; 黑体=simhei; 楷体=kaiti; 仿宋=fangsong; 等线=dengxian; 自定义字体=CustomFont,sans-serif';

  return (
    <div>
      <TinyEditor 
        fontFamilyFormats={customFontFamily}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
      />
    </div>
  );
}
```

## API

### TinyEditor Props

| 属性             | 类型                   | 默认值 | 描述                           |
| --------------- | ---------------------- | ------ | ------------------------------ |
| value           | string                 | -      | 编辑器内容                      |
| initialValue    | string                 | ''     | 初始内容                       |
| height          | number \| string       | 500    | 编辑器高度                      |
| disabled        | boolean                | false  | 是否禁用                       |
| placeholder     | string                 | -      | 占位符文本                      |
| style           | CSSProperties          | -      | 自定义样式                      |
| className       | string                 | -      | 自定义类名                      |
| onChange        | (content: string) => void | -  | 内容变化回调                     |
| onReady         | (editor: any) => void  | -      | 编辑器实例准备就绪的回调         |
| licenseKey      | string                 | ''     | TinyMCE 许可证密钥              |
| toolbar         | string[]               | -      | 自定义工具栏配置                 |
| plugins         | string[]               | -      | 自定义插件配置                   |
| editorConfig    | Record<string, any>    | -      | 编辑器配置                      |
| tinymceScriptSrc| string                 | '/tinymce/tinymce.min.js' | TinyMCE脚本路径 |
| contentCss      | string                 | '/css/editor-content.css' | 内容样式表     |
| fontFamilyFormats| string                | -      | 字体族配置                      |
| fontSizeFormats | string                 | -      | 字体大小配置                     |
| lineHeightFormats| string                | -      | 行高配置                        |
| blockFormats    | string                 | -      | 块格式配置                      |

### TinyEditorReadOnly Props

| 属性             | 类型                   | 默认值 | 描述                           |
| --------------- | ---------------------- | ------ | ------------------------------ |
| content         | string                 | -      | 显示内容                       |
| contentUrl      | string                 | -      | 内容URL，如果提供则从URL加载内容 |
| height          | number \| string       | 500    | 查看器高度                     |
| style           | CSSProperties          | -      | 自定义样式                     |
| className       | string                 | -      | 自定义类名                     |
| errorText       | string                 | '加载内容失败' | 加载失败时的提示文本    |
| indicator       | ReactNode              | -      | 自定义加载指示符               |
| spinComponent   | React.ComponentType<any> | -    | 自定义加载组件                 |
| tinymceScriptSrc| string                 | '/tinymce/tinymce.min.js' | TinyMCE脚本路径 |
| contentCss      | string                 | '/css/editor-content.css' | 内容样式表     |

## 注意事项

1. 使用前必须确保TinyMCE资源文件已正确加载，设置`tinymceScriptSrc`指向TinyMCE的根目录。
2. 默认情况下，编辑器会查找`/css/editor-content.css`作为内容样式表，如果需要自定义样式，请通过`contentCss`属性指定。
3. 如果需要使用高级特性（如图片上传等），需要自定义`editorConfig`属性。

## 许可证

MIT
