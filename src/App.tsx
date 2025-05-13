import { TinyEditor, TinyEditorReadOnly } from '@kwayteow/tiny-react-editor';
import { useEffect, useState } from 'react';
import './App.css';

/**
 * Main application component
 */
const App = () => {
  // 丰富的编辑器初始内容，展示各种功能
  const initialContent = `
    <h1 style="text-align: center; color: #4a86e8;">Tiny 编辑器全功能展示</h1>

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

  // 英文版的初始内容
  const initialContentEn = `
    <h1 style="text-align: center; color: #4a86e8;">Tiny Editor Full Feature Demo</h1>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Basic Text Formatting</h2>
    <p><strong>Bold text</strong>, <em>Italic text</em>, <u>Underlined text</u>, <span style="text-decoration: line-through;">Strikethrough</span>, <sub>Subscript</sub>, <sup>Superscript</sup></p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Fonts and Sizes</h2>
    <p><span style="font-family: Arial;">Arial font</span>, <span style="font-family: 'Times New Roman';">Times New Roman font</span>, <span style="font-family: Courier;">Courier font</span></p>
    <p><span style="font-size: 8pt;">8pt text</span>, <span style="font-size: 12pt;">12pt text</span>, <span style="font-size: 18pt;">18pt text</span>, <span style="font-size: 24pt;">24pt text</span></p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Alignment and Spacing</h2>
    <p style="text-align: left; margin-left: 20px;">Left-aligned text (indented)</p>
    <p style="text-align: center;">Center-aligned text</p>
    <p style="text-align: right;">Right-aligned text</p>
    <p style="text-align: justify; line-height: 2;">Justified text - this paragraph is long enough to demonstrate justification effects, with 2x line height. When the width is sufficient, the text will automatically adjust spacing to align both edges. This paragraph is long enough to demonstrate justification effects.</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">List Styles</h2>
    <p>Unordered list (bullets):</p>
    <ul style="list-style-type: disc;">
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
    </ul>

    <p>Unordered list (squares):</p>
    <ul style="list-style-type: square;">
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
    </ul>

    <p>Ordered list (numbers):</p>
    <ol style="list-style-type: decimal;">
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
    </ol>

    <p>Ordered list (letters):</p>
    <ol style="list-style-type: lower-alpha;">
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
    </ol>

    <p>Ordered list (roman numerals):</p>
    <ol style="list-style-type: upper-roman;">
        <li>Chapter one</li>
        <li>Chapter two</li>
        <li>Chapter three</li>
    </ol>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Indentation Control</h2>
    <p>Normal paragraph</p>
    <p style="padding-left: 30px;">First level indent</p>
    <p style="padding-left: 60px;">Second level indent</p>
    <p style="padding-left: 90px;">Third level indent</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Tables and Borders</h2>
    <table style="border-collapse: collapse; width: 100%; border: 2px solid #4a86e8;">
        <thead>
            <tr style="background-color: #d9e2f3;">
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Header 1</th>
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Header 2</th>
                <th style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Header 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 1</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 2</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 3</td>
            </tr>
            <tr style="background-color: #f3f6fc;">
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 4</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 5</td>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 6</td>
            </tr>
            <tr>
                <td style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Data 7</td>
                <td colspan="2" style="border: 1px solid #4a86e8; padding: 8px; text-align: center;">Merged cell</td>
            </tr>
        </tbody>
    </table>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Dividers</h2>
    <p>Content above</p>
    <hr style="border-top: 1px dashed #4a86e8;">
    <p>Dashed divider</p>
    <hr style="border-top: 2px solid #4a86e8;">
    <p>Solid divider</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Links and Anchors</h2>
    <p><a href="https://www.tiny.cloud" target="_blank" style="color: #4a86e8; text-decoration: none;">This is an external link</a> (opens in new window)</p>
    <p><a href="#section1">In-page anchor link</a></p>
    <p id="section1">This is the anchor target location</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Media Embedding</h2>
    <p>Video embed example (iframe):</p>
    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Code Blocks</h2>
    <pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-family: Consolas, Monaco, 'Courier New', monospace;"><code>// JavaScript example
function helloWorld() {
  console.log("Hello, World!");
  return true;
}

// Call the function
helloWorld();</code></pre>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Blockquotes</h2>
    <blockquote style="border-left: 4px solid #4a86e8; margin-left: 0; padding-left: 15px; color: #666;">
        <p>This is a blockquote text, which can be used for quoted content. Multiple levels of quotes can be nested.</p>
        <blockquote style="border-left: 4px solid #ea9999; margin-left: 10px; padding-left: 15px;">
            <p>This is a second-level nested quote.</p>
        </blockquote>
    </blockquote>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Text Colors and Backgrounds</h2>
    <p>
        <span style="color: #ff0000;">Red text</span>,
        <span style="color: #00ff00;">Green text</span>,
        <span style="color: #0000ff;">Blue text</span>,
        <span style="color: #ff00ff;">Purple text</span>,
        <span style="color: #ff9900;">Orange text</span>
    </p>
    <p>
        <span style="background-color: #ffff00; padding: 2px 5px;">Yellow background</span>
        <span style="background-color: #00ffff; padding: 2px 5px;">Cyan background</span>
        <span style="background-color: #ffcccc; padding: 2px 5px;">Light red background</span>
        <span style="background-color: #ccffcc; padding: 2px 5px;">Light green background</span>
    </p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Special Characters</h2>
    <p>Copyright symbols: &copy; &reg; &trade;</p>
    <p>Math symbols: &plusmn; &times; &divide; &radic; &infin; &sum;</p>
    <p>Greek letters: &alpha; &beta; &gamma; &delta; &omega;</p>
    <p>Arrows: &larr; &rarr; &uarr; &darr; &harr;</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Emoji</h2>
    <p>😀 😂 😍 🤔 👍 👎 👏 🎉 ❤️ 🚀 💡 🔔 📊 📈 🏆</p>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Complex Layout</h2>
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
        <div style="flex: 1; background-color: #d9e2f3; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0;">Left Column</h3>
            <p>This is the left content area created using flexbox layout.</p>
        </div>
        <div style="flex: 1; background-color: #e2f0d9; padding: 15px; border-radius: 5px;">
            <h3 style="margin-top: 0;">Right Column</h3>
            <p>This is the right content area created using flexbox layout.</p>
        </div>
    </div>

    <h2 style="border-bottom: 2px solid #4a86e8; padding-bottom: 5px;">Custom Styles</h2>
    <p class="custom-highlight" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 10px; border-radius: 0 5px 5px 0;">This is a paragraph with custom highlight styling.</p>
    <p class="custom-note" style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 10px; border-radius: 0 5px 5px 0;">This is a paragraph with custom note styling.</p>
    <p class="custom-warning" style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 10px; border-radius: 0 5px 5px 0;">This is a paragraph with custom warning styling.</p>
  `;

  // 添加语言状态和文本翻译
  const [language, setLanguage] = useState<'zh_CN' | 'en'>('zh_CN');
  const [content, setContent] = useState(initialContent);
  const [viewMode, setViewMode] = useState('edit');
  // 添加一个key状态，用于强制重新渲染编辑器
  const [editorKey, setEditorKey] = useState(0);

  // 语言翻译文本
  const translations = {
    zh_CN: {
      appTitle: 'TinyMCE React 编辑器演示',
      editMode: '编辑模式',
      readOnlyMode: '只读模式',
      editor: '编辑器',
      readOnlyView: '只读视图',
      htmlSource: 'HTML 源码',
      switchLanguage: 'English',
    },
    en: {
      appTitle: 'TinyMCE React Editor Demo',
      editMode: 'Edit Mode',
      readOnlyMode: 'Read-only Mode',
      editor: 'Editor',
      readOnlyView: 'Read-only View',
      htmlSource: 'HTML Source',
      switchLanguage: '中文',
    },
  };

  // 当语言改变时更新内容和重置编辑器
  useEffect(() => {
    if (language === 'zh_CN') {
      setContent(initialContent);
    } else {
      setContent(initialContentEn);
    }
    // 增加key以强制重新创建编辑器组件
    setEditorKey((prev) => prev + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  // 切换语言
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'zh_CN' ? 'en' : 'zh_CN'));
  };

  const t = translations[language];

  return (
    <div className="app-container">
      <div className="app-header">
        <img src="/logo.png" alt="Logo" className="app-logo" />
        <h1>{t.appTitle}</h1>
        <button className="language-switch-btn" onClick={toggleLanguage}>
          {t.switchLanguage}
        </button>
      </div>

      <div className="view-controls">
        <button
          className={viewMode === 'edit' ? 'active' : ''}
          onClick={() => setViewMode('edit')}
        >
          {t.editMode}
        </button>
        <button
          className={viewMode === 'readonly' ? 'active' : ''}
          onClick={() => setViewMode('readonly')}
        >
          {t.readOnlyMode}
        </button>
      </div>

      <div className="editor-container">
        {viewMode === 'edit' ? (
          <>
            <h2>{t.editor}</h2>
            <TinyEditor
              key={editorKey} // 添加key属性来强制重新渲染
              value={content}
              onChange={setContent}
              height={700}
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              contentCss="/css/editor-content.css"
              language={language}
              licenseKey='vmasvxldzz4t22e3y8vdm5i458vb7zl0ajvotosf47w9bvzw'
            />
          </>
        ) : (
          <>
            <h2>{t.readOnlyView}</h2>
            <TinyEditorReadOnly
              key={editorKey} // 也为只读组件添加key
              content={content}
              height={700}
              tinymceScriptSrc="/tinymce/tinymce.min.js"
              contentCss="/css/editor-content.css"
              language={language}
            />
          </>
        )}
      </div>

      <div className="raw-html">
        <h2>{t.htmlSource}</h2>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default App;
