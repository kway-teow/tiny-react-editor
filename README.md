# Tiny React Editor

<div align="text">
  <a href="README.md"><img src="https://img.shields.io/badge/Language-English-blue.svg" alt="English" /></a>
</div>

A React rich text editor component based on TinyMCE, providing complete editor functionality and read-only mode.

## Installation

```bash
npm install @kwayteow/tiny-react-editor
# or
yarn add @kwayteow/tiny-react-editor
# or
pnpm add @kwayteow/tiny-react-editor
```

## Prerequisites

You need to install the following dependencies in your project:

```bash
npm install react react-dom @tinymce/tinymce-react tinymce
```

Dependency version requirements:

- React: ^17.0.0 or ^18.0.0
- React DOM: ^17.0.0 or ^18.0.0
- @tinymce/tinymce-react: ^6.0.0
- tinymce: ^7.0.0

## Usage

### Editor Component

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
        tinymceScriptSrc="/tinymce/tinymce.min.js" // TinyMCE script path
        contentCss="/css/editor-content.css" // Content stylesheet
      />
    </div>
  );
}
```

### Read-Only Mode

```jsx
import React from "react";
import { TinyEditorReadOnly } from "@kwayteow/tiny-react-editor";

function ReadOnlyView() {
  return (
    <div>
      <TinyEditorReadOnly
        content="<p>This is read-only content</p>"
        height={500}
        tinymceScriptSrc="/tinymce/tinymce.min.js" // TinyMCE script path
        contentCss="/css/editor-content.css" // Content stylesheet
      />
    </div>
  );
}
```

### Loading Content from URL

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

### Custom Font Family

```jsx
import React from "react";
import { TinyEditor } from "@kwayteow/tiny-react-editor";

function CustomFonts() {
  // Custom font family configuration
  const customFontFamily =
    "Arial=arial,helvetica,sans-serif; SimSun=simsun; Microsoft YaHei=microsoft yahei,sans-serif; SimHei=simhei; KaiTi=kaiti; FangSong=fangsong; DengXian=dengxian; CustomFont=CustomFont,sans-serif";

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

### Custom Editor Configuration

```jsx
import React from "react";
import { TinyEditor } from "@kwayteow/tiny-react-editor";

function CustomConfig() {
  // Custom editor configuration
  const editorConfig = {
    images_upload_url: "/api/upload-image",
    file_picker_types: "image",
    automatic_uploads: true,
    // Other TinyMCE configuration options
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

| Property          | Type                      | Default                                                                                                                                                                | Description                             |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| value             | string                    | -                                                                                                                                                                      | Editor content                          |
| initialValue      | string                    | ''                                                                                                                                                                     | Initial content                         |
| height            | number \| string          | 500                                                                                                                                                                    | Editor height                           |
| disabled          | boolean                   | false                                                                                                                                                                  | Whether disabled                        |
| placeholder       | string                    | -                                                                                                                                                                      | Placeholder text                        |
| style             | CSSProperties             | -                                                                                                                                                                      | Custom style                            |
| className         | string                    | -                                                                                                                                                                      | Custom class name                       |
| onChange          | (content: string) => void | -                                                                                                                                                                      | Content change callback                 |
| onReady           | (editor: any) => void     | -                                                                                                                                                                      | Editor instance ready callback          |
| licenseKey        | string                    | ''                                                                                                                                                                     | TinyMCE license key                     |
| toolbar           | string[]                  | -                                                                                                                                                                      | Custom toolbar configuration            |
| plugins           | string[]                  | -                                                                                                                                                                      | Custom plugins configuration            |
| editorConfig      | Record<string, any>       | -                                                                                                                                                                      | Editor configuration, passed to TinyMCE |
| tinymceScriptSrc  | string                    | '/tinymce/tinymce.min.js'                                                                                                                                              | TinyMCE script path                     |
| contentCss        | string                    | '/css/editor-content.css'                                                                                                                                              | Content stylesheet                      |
| fontFamilyFormats | string                    | 'Arial=arial,helvetica,sans-serif; SimSun=simsun; Microsoft YaHei=microsoft yahei,sans-serif; SimHei=simhei; KaiTi=kaiti; FangSong=fangsong; DengXian=dengxian'        | Font family configuration               |
| fontSizeFormats   | string                    | '12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 56px 72px'                                                                                                          | Font size configuration                 |
| lineHeightFormats | string                    | '1 1.2 1.4 1.6 2'                                                                                                                                                      | Line height configuration               |
| blockFormats      | string                    | 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Blockquote=blockquote; Preformatted=pre; Address=address; Code=code' | Block format configuration              |

### TinyEditorReadOnly Props

| Property         | Type                     | Default                   | Description                             |
| ---------------- | ------------------------ | ------------------------- | --------------------------------------- |
| content          | string                   | -                         | Display content                         |
| contentUrl       | string                   | -                         | Content URL, if provided, load from URL |
| height           | number \| string         | 500                       | Viewer height                           |
| style            | CSSProperties            | -                         | Custom style                            |
| className        | string                   | -                         | Custom class name                       |
| errorText        | string                   | 'Failed to load content'  | Error text when loading fails           |
| indicator        | ReactNode                | -                         | Custom loading indicator                |
| spinComponent    | React.ComponentType<any> | -                         | Custom loading component                |
| tinymceScriptSrc | string                   | '/tinymce/tinymce.min.js' | TinyMCE script path                     |
| contentCss       | string                   | '/css/editor-content.css' | Content stylesheet                      |

### Spinner Component

The library also exports a `Spinner` component that can be used to create custom loading states:

```jsx
import { Spinner } from "@kwayteow/tiny-react-editor";

function LoadingComponent() {
  return (
    <Spinner spinning={true} tip="Loading...">
      <div>Content area</div>
    </Spinner>
  );
}
```

## Notes

1. Before use, make sure TinyMCE resource files are correctly loaded. Set `tinymceScriptSrc` to point to the TinyMCE root directory.
2. By default, the editor looks for `/css/editor-content.css` as the content stylesheet. If you need to customize styles, specify them using the `contentCss` property.
3. If you need to use advanced features (such as image upload), configure them through the `editorConfig` property.
4. The TinyMCE editor defaults to Chinese (zh_CN) interface. For other languages, configure through the `language` property in `editorConfig`.

## License

MIT
