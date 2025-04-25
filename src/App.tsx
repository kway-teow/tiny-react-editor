import { useState } from "react";
import { TinyEditor, TinyEditorReadOnly } from "@kwayteow/tiny-react-editor";
import "./App.css";

/**
 * Main application component
 */
const App = () => {
  // 丰富的编辑器初始内容，展示各种功能
  const initialContent = `
    <h1 style="text-align: center; color: #4a86e8;">TinyMCE 编辑器全功能展示</h1>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">基础文本格式</h2>
    <p><strong>粗体文本</strong>, <em>斜体文本</em>, <u>下划线文本</u>, <span style="text-decoration: line-through;">删除线</span>, <sub>下标</sub>, <sup>上标</sup></p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">字体与大小</h2>
    <p><span style="font-family: Arial;">Arial 字体</span>, <span style="font-family: 'Times New Roman';">Times New Roman 字体</span>, <span style="font-family: Courier;">Courier 字体</span></p>
    <p><span style="font-size: 8pt;">8pt 文字</span>, <span style="font-size: 12pt;">12pt 文字</span>, <span style="font-size: 18pt;">18pt 文字</span>, <span style="font-size: 24pt;">24pt 文字</span></p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">对齐方式与间距</h2>
    <p style="text-align: left; margin-left: 20px;">左对齐文本（缩进）</p>
    <p style="text-align: center;">居中对齐文本</p>
    <p style="text-align: right;">右对齐文本</p>
    <p style="text-align: justify; line-height: 2;">两端对齐文本 - 这段文字较长以展示两端对齐效果，行高2倍，在宽度足够的情况下，文本会自动调整间距使得两端对齐。这段文字较长以展示两端对齐效果，在宽度足够的情况下，文本会自动调整间距使得两端对齐。</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">列表样式</h2>
    <p>无序列表（圆点）:</p>
    <ul style="list-style-type: disc;">
        <li>项目一</li>
        <li>项目二</li>
        <li>项目三</li>
    </ul>

    <p>无序列表（方块）:</p>
    <ul style="list-style-type: square;">
        <li>项目一</li>
        <li>项目二</li>
        <li>项目三</li>
    </ul>

    <p>有序列表（数字）:</p>
    <ol style="list-style-type: decimal;">
        <li>第一步</li>
        <li>第二步</li>
        <li>第三步</li>
    </ol>

    <p>有序列表（字母）:</p>
    <ol style="list-style-type: lower-alpha;">
        <li>第一项</li>
        <li>第二项</li>
        <li>第三项</li>
    </ol>

    <p>有序列表（罗马数字）:</p>
    <ol style="list-style-type: upper-roman;">
        <li>第一章</li>
        <li>第二章</li>
        <li>第三章</li>
    </ol>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">缩进控制</h2>
    <p>正常段落</p>
    <p style="padding-left: 30px;">第一级缩进</p>
    <p style="padding-left: 60px;">第二级缩进</p>
    <p style="padding-left: 90px;">第三级缩进</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">表格与边框</h2>
    <table style="border-collapse: collapse; width: 100%; border: 2px solid #4a86e8;">
        <thead>
            <tr style="background-color: #d9e2f3;">
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">表头1</th>
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">表头2</th>
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">表头3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据1</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据2</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据3</td>
            </tr>
            <tr style="background-color: #f3f6fc;">
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据4</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据5</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据6</td>
            </tr>
            <tr>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">数据7</td>
                <td colspan="2" style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">合并单元格</td>
            </tr>
        </tbody>
    </table>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">分割线</h2>
    <p>上方内容</p>
    <hr style="border-top: 1px dashed #4a86e8;">
    <p>虚线分割线</p>
    <hr style="border-top: 2px solid #4a86e8;">
    <p>实线分割线</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">链接与锚点</h2>
    <p><a href="https://www.tiny.cloud" target="_blank" style="color: #4a86e8; text-decoration: none;">这是一个外部链接</a> (在新窗口打开)</p>
    <p><a href="#section1">页内锚点链接</a></p>
    <p id="section1">这是锚点目标位置</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">多媒体嵌入</h2>
    <p>视频嵌入示例（iframe）:</p>
    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">代码块</h2>
    <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-family: Consolas, Monaco, 'Courier New', monospace;"><code>// JavaScript 示例
function helloWorld() {
  console.log("Hello, World!");
  return true;
}

// 调用函数
helloWorld();</code></pre>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">引用样式</h2>
    <blockquote style="border-left: 4px solid #4a86e8; margin-left: 0; padding-left: 15px; color: #666;">
        <p>这是一段引用文本，可以用来表示引用内容。可以嵌套使用多层引用。</p>
        <blockquote style="border-left: 4px solid #ea9999; margin-left: 10px; padding-left: 15px;">
            <p>这是第二层嵌套引用。</p>
        </blockquote>
    </blockquote>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">文本颜色与背景</h2>
    <p>
        <span style="color: #ff0000;">红色文本</span>,
        <span style="color: #00ff00;">绿色文本</span>,
        <span style="color: #0000ff;">蓝色文本</span>,
        <span style="color: #ff00ff;">紫色文本</span>,
        <span style="color: #ff9900;">橙色文本</span>
    </p>
    <p>
        <span style="background-color: #ffff00; padding: 2px 5px;">黄色背景</span>
        <span style="background-color: #00ffff; padding: 2px 5px;">青色背景</span>
        <span style="background-color: #ffcccc; padding: 2px 5px;">浅红色背景</span>
        <span style="background-color: #ccffcc; padding: 2px 5px;">浅绿色背景</span>
    </p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">特殊符号</h2>
    <p>版权符号: &copy; &reg; &trade;</p>
    <p>数学符号: &plusmn; &times; &divide; &radic; &infin; &sum;</p>
    <p>希腊字母: &alpha; &beta; &gamma; &delta; &omega;</p>
    <p>箭头: &larr; &rarr; &uarr; &darr; &harr;</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">表情符号</h2>
    <p>😀 😂 😍 🤔 👍 👎 👏 🎉 ❤️ 🚀 💡 🔔 📊 📈 🏆</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">复杂布局</h2>
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; background-color: #d9e2f3; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0;">左侧栏</h3>
            <p>这是使用弹性布局创建的左侧内容区域。</p>
        </div>
        <div style="flex: 1; background-color: #e2f0d9; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0;">右侧栏</h3>
            <p>这是使用弹性布局创建的右侧内容区域。</p>
        </div>
    </div>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">自定义样式</h2>
    <p class="custom-highlight" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; border-radius: 0 5px 5px 0;">这是一个自定义高亮样式的段落。</p>
    <p class="custom-note" style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 10px; border-radius: 0 5px 5px 0;">这是一个自定义笔记样式的段落。</p>
    <p class="custom-warning" style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 10px; border-radius: 0 5px 5px 0;">这是一个自定义警告样式的段落。</p>
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
              value={content}
              onChange={setContent}
              height={700}
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              contentCss="/css/editor-content.css"
            />
          </>
        ) : (
          <>
            <h2>只读视图</h2>
            <TinyEditorReadOnly
              content={content}
              height={700}
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
