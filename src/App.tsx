import { useState } from "react";
import { TinyEditor, TinyEditorReadOnly } from "@kwayteow/tiny-react-editor";
import "./App.css";

/**
 * Main application component
 */
const App = () => {
  // 丰富的编辑器初始内容，展示各种功能
  const initialContent = `
    <h1>TinyMCE 编辑器功能展示</h1>

    <h2>文本格式</h2>
    <p><strong>粗体文本</strong>, <em>斜体文本</em>, <u>下划线文本</u>, <span style="text-decoration: line-through;">删除线</span>.</p>

    <h2>对齐方式</h2>
    <p style="text-align: left;">左对齐文本</p>
    <p style="text-align: center;">居中对齐文本</p>
    <p style="text-align: right;">右对齐文本</p>
    <p style="text-align: justify;">两端对齐文本 - 这段文字较长以展示两端对齐效果，在宽度足够的情况下，文本会自动调整间距使得两端对齐。</p>

    <h2>列表</h2>
    <p>无序列表:</p>
    <ul>
        <li>项目一</li>
        <li>项目二</li>
        <li>项目三</li>
    </ul>

    <p>有序列表:</p>
    <ol>
        <li>第一步</li>
        <li>第二步</li>
        <li>第三步</li>
    </ol>

    <h2>表格</h2>
    <table style="border-collapse: collapse; width: 100%;">
        <thead>
            <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">表头1</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">表头2</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">表头3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">数据1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">数据2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">数据3</td>
            </tr>
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">数据4</td>
                <td style="border: 1px solid #ddd; padding: 8px;">数据5</td>
                <td style="border: 1px solid #ddd; padding: 8px;">数据6</td>
            </tr>
        </tbody>
    </table>

    <h2>链接和图片</h2>
    <p><a href="https://www.tiny.cloud" target="_blank">这是一个链接</a></p>

    <h2>代码</h2>
    <pre><code>function helloWorld() {
  console.log("Hello, World!");
}</code></pre>

    <h2>引用</h2>
    <blockquote>
        <p>这是一段引用文本，可以用来表示引用内容。</p>
    </blockquote>

    <h2>颜色和背景</h2>
    <p><span style="color: #ff0000;">红色文本</span>, <span style="color: #00ff00;">绿色文本</span>, <span style="color: #0000ff;">蓝色文本</span></p>
    <p><span style="background-color: #ffff00;">黄色背景</span>, <span style="background-color: #00ffff;">青色背景</span></p>
  `;

  const [content, setContent] = useState(initialContent);
  const [viewMode, setViewMode] = useState("edit");

  return (
    <div className="app-container">
      <h1>TinyMCE React Editor Demo</h1>

      <div className="view-controls">
        <button
          className={viewMode === "edit" ? "active" : ""}
          onClick={() => setViewMode("edit")}
        >
          编辑模式
        </button>
        <button
          className={viewMode === "readonly" ? "active" : ""}
          onClick={() => setViewMode("readonly")}
        >
          只读模式
        </button>
      </div>

      <div className="editor-container">
        {viewMode === "edit" ? (
          <>
            <h2>编辑器</h2>
            <TinyEditor
              initialValue={initialContent}
              value={content}
              onChange={setContent}
              height={500}
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              contentCss="/css/editor-content.css"
            />
          </>
        ) : (
          <>
            <h2>只读视图</h2>
            <TinyEditorReadOnly
              content={content}
              height={500}
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              contentCss="/css/editor-content.css"
            />
          </>
        )}
      </div>

      <div className="raw-html">
        <h2>HTML 源码</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default App;
