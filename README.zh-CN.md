# Tiny React 编辑器

[英文](README.md)

<div align="center">
  <a href="https://www.npmjs.com/package/@kwayteow/tiny-react-editor"><img src="https://img.shields.io/npm/v/@kwayteow/tiny-react-editor.svg" alt="版本" /></a>
  <a href="https://www.npmjs.com/package/@kwayteow/tiny-react-editor"><img src="https://img.shields.io/npm/dm/@kwayteow/tiny-react-editor.svg" alt="下载量" /></a>
  <a href="https://www.npmjs.com/package/@kwayteow/tiny-react-editor"><img src="https://img.shields.io/npm/l/@kwayteow/tiny-react-editor.svg" alt="许可证" /></a>
</div>

基于 TinyMCE 的 React 富文本编辑器组件，提供了完整的编辑器功能和只读模式。

## 安装

```bash
npm install @kwayteow/tiny-react-editor
# 或
yarn add @kwayteow/tiny-react-editor
# 或
pnpm add @kwayteow/tiny-react-editor
```

## 前提条件

您需要在项目中安装以下依赖：

```bash
npm install react react-dom @tinymce/tinymce-react tinymce
```

依赖版本要求：

- React: ^17.0.0 或 ^18.0.0
- React DOM: ^17.0.0 或 ^18.0.0
- @tinymce/tinymce-react: ^6.0.0
- tinymce: ^7.0.0

## 使用方法

### 编辑器组件

```jsx
import React, { useState } from "react";
import { TinyEditor } from "@kwayteow/tiny-react-editor";

function App() {
  const [content, setContent] = useState("<p>Hello, World!</p>");

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
import React from "react";
import { TinyEditorReadOnly } from "@kwayteow/tiny-react-editor";

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

### 从 URL 加载内容

```jsx
import React from "react";
import { TinyEditorReadOnly } from "@kwayteow/tiny-react-editor";

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

### 自定义字体族

```jsx
import React from "react";
import { TinyEditor } from "@kwayteow/tiny-react-editor";

function CustomFonts() {
  // 自定义字体族配置
  const customFontFamily =
    "Arial=arial,helvetica,sans-serif; 宋体=simsun; 微软雅黑=microsoft yahei,sans-serif; 黑体=simhei; 楷体=kaiti; 仿宋=fangsong; 等线=dengxian; 自定义字体=CustomFont,sans-serif";

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

### 自定义编辑器配置

```jsx
import React from "react";
import { TinyEditor } from "@kwayteow/tiny-react-editor";

function CustomConfig() {
  // 自定义编辑器配置
  const editorConfig = {
    images_upload_url: "/api/upload-image",
    file_picker_types: "image",
    automatic_uploads: true,
    // 其他 TinyMCE 配置项
  };

  return (
    <div>
      <TinyEditor
        editorConfig={editorConfig}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
      />
    </div>
  );
}
```

## API

### TinyEditor Props

| 属性              | 类型                      | 默认值                                                                                                                                      | 描述                           |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| value             | string                    | -                                                                                                                                           | 编辑器内容                     |
| initialValue      | string                    | ''                                                                                                                                          | 初始内容                       |
| height            | number \| string          | 500                                                                                                                                         | 编辑器高度                     |
| disabled          | boolean                   | false                                                                                                                                       | 是否禁用                       |
| placeholder       | string                    | -                                                                                                                                           | 占位符文本                     |
| style             | CSSProperties             | -                                                                                                                                           | 自定义样式                     |
| className         | string                    | -                                                                                                                                           | 自定义类名                     |
| onChange          | (content: string) => void | -                                                                                                                                           | 内容变化回调                   |
| onReady           | (editor: any) => void     | -                                                                                                                                           | 编辑器实例准备就绪的回调       |
| licenseKey        | string                    | ''                                                                                                                                          | TinyMCE 许可证密钥             |
| toolbar           | string[]                  | -                                                                                                                                           | 自定义工具栏配置               |
| plugins           | string[]                  | -                                                                                                                                           | 自定义插件配置                 |
| editorConfig      | Record<string, any>       | -                                                                                                                                           | 编辑器配置，直接传递给 TinyMCE |
| tinymceScriptSrc  | string                    | '/tinymce/tinymce.min.js'                                                                                                                   | TinyMCE 脚本路径               |
| contentCss        | string                    | '/css/editor-content.css'                                                                                                                   | 内容样式表                     |
| fontFamilyFormats | string                    | 'Arial=arial,helvetica,sans-serif; 宋体=simsun; 微软雅黑=microsoft yahei,sans-serif; 黑体=simhei; 楷体=kaiti; 仿宋=fangsong; 等线=dengxian' | 字体族配置                     |
| fontSizeFormats   | string                    | '12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 56px 72px'                                                                               | 字体大小配置                   |
| lineHeightFormats | string                    | '1 1.2 1.4 1.6 2'                                                                                                                           | 行高配置                       |
| blockFormats      | string                    | '段落=p; 标题 1=h1; 标题 2=h2; 标题 3=h3; 标题 4=h4; 标题 5=h5; 标题 6=h6; 引用=blockquote; 预格式化=pre; 地址=address; 代码=code'          | 块格式配置                     |

### TinyEditorReadOnly Props

| 属性             | 类型                     | 默认值                    | 描述                                |
| ---------------- | ------------------------ | ------------------------- | ----------------------------------- |
| content          | string                   | -                         | 显示内容                            |
| contentUrl       | string                   | -                         | 内容 URL，如果提供则从 URL 加载内容 |
| height           | number \| string         | 500                       | 查看器高度                          |
| style            | CSSProperties            | -                         | 自定义样式                          |
| className        | string                   | -                         | 自定义类名                          |
| errorText        | string                   | '加载内容失败'            | 加载失败时的提示文本                |
| indicator        | ReactNode                | -                         | 自定义加载指示符                    |
| spinComponent    | React.ComponentType<any> | -                         | 自定义加载组件                      |
| tinymceScriptSrc | string                   | '/tinymce/tinymce.min.js' | TinyMCE 脚本路径                    |
| contentCss       | string                   | '/css/editor-content.css' | 内容样式表                          |

### Spinner 组件

库还导出了一个 `Spinner` 组件，可用于创建自定义加载状态：

```jsx
import { Spinner } from "@kwayteow/tiny-react-editor";

function LoadingComponent() {
  return (
    <Spinner spinning={true} tip="正在加载...">
      <div>内容区域</div>
    </Spinner>
  );
}
```

## 注意事项

1. 使用前必须确保 TinyMCE 资源文件已正确加载，设置`tinymceScriptSrc`指向 TinyMCE 的根目录。
2. 默认情况下，编辑器会查找`/css/editor-content.css`作为内容样式表，如果需要自定义样式，请通过`contentCss`属性指定。
3. 如果需要使用高级特性（如图片上传等），需要通过`editorConfig`属性进行配置。
4. TinyMCE 编辑器默认使用中文（zh_CN）界面，如需其他语言，请通过`editorConfig`中的`language`属性配置。

## 许可证

MIT
