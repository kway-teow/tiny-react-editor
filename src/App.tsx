import { useState } from 'react';
import { TinyEditor, TinyEditorReadOnly } from '@kwayteow/tiny-react-editor';
import './App.css';

/**
 * Main application component
 */
const App = () => {
  const [content, setContent] = useState('<p>Hello, TinyMCE Editor!</p>');

  return (
    <div className="app-container">
      <h1>TinyMCE React Editor Demo</h1>
      
      <div className="editor-container">
        <h2>编辑器</h2>
        <TinyEditor 
          value={content}
          onChange={setContent}
          height={300}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          contentCss="/css/editor-content.css"
        />
      </div>
      
      <div className="preview-container">
        <h2>预览</h2>
        <TinyEditorReadOnly 
          content={content}
          height={300}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          contentCss="/css/editor-content.css"
        />
      </div>
      
      <div className="raw-html">
        <h2>HTML 源码</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default App;