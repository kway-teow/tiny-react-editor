import { Editor } from "@tinymce/tinymce-react";
import { useRef, CSSProperties } from "react";

export interface TinyEditorProps {
  /** 初始内容 */
  initialValue?: string;
  /** 编辑器高度 */
  height?: number | string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 占位符文本 */
  placeholder?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** className */
  className?: string;
  /** 编辑器配置 */
  editorConfig?: Record<string, any>;
  /** 内容变化回调 */
  onChange?: (content: string) => void;
  /** 编辑器实例准备就绪的回调 */
  onReady?: (editor: any) => void;
  /** license key */
  licenseKey?: string;
  /** 值 */
  value?: string;
  /** 自定义工具栏配置，会与默认工具栏合并 */
  toolbar?: string[];
  /** 自定义插件配置，会与默认插件合并 */
  plugins?: string[];
  /** 自定义 TinyMCE 脚本路径 */
  tinymceScriptSrc?: string;
  /** 自定义内容样式表 */
  contentCss?: string;
  /** 字体系列配置 */
  fontFamilyFormats?: string;
  /** 字体大小配置 */
  fontSizeFormats?: string;
  /** 行高配置 */
  lineHeightFormats?: string;
  /** 块格式配置 */
  blockFormats?: string;
}

export function TinyEditor({
  value,
  initialValue,
  height = 500,
  disabled,
  placeholder,
  style,
  className,
  editorConfig,
  onChange,
  onReady,
  licenseKey = "",
  toolbar,
  plugins,
  tinymceScriptSrc = "/tinymce/tinymce.min.js",
  contentCss = "/css/editor-content.css",
  fontFamilyFormats,
  fontSizeFormats,
  lineHeightFormats,
  blockFormats,
}: TinyEditorProps) {
  const editorRef = useRef<any>(null);

  const defaultPlugins = [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "preview",
    "help",
    "wordcount",
    "quickbars",
    "noneditable",
    "pagebreak",
    "emoticons",
    "hr",
    "print",
  ];

  const defaultToolbar = [
    "undo redo | formatselect | fontfamily fontsizeselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify",
    "bullist numlist outdent indent | link image media table | emoticons charmap hr insertdatetime | searchreplace code preview fullscreen | pagebreak print removeformat help",
  ];

  // 合并插件配置
  const mergedPlugins = plugins
    ? [...defaultPlugins, ...plugins]
    : defaultPlugins;

  // 合并工具栏配置
  const mergedToolbar = toolbar
    ? [...defaultToolbar, ...toolbar]
    : defaultToolbar;

  // 默认字体设置
  const defaultFontFamilyFormats =
    "Arial=arial,helvetica,sans-serif; 宋体=simsun; 微软雅黑=microsoft yahei,sans-serif; 黑体=simhei; 楷体=kaiti; 仿宋=fangsong; 等线=dengxian";
  const defaultFontSizeFormats =
    "12px 14px 16px 18px 20px 24px 28px 32px 36px 48px 56px 72px";
  const defaultLineHeightFormats = "1 1.2 1.4 1.6 2";
  const defaultBlockFormats =
    "段落=p; 标题 1=h1; 标题 2=h2; 标题 3=h3; 标题 4=h4; 标题 5=h5; 标题 6=h6; 引用=blockquote; 预格式化=pre; 地址=address; 代码=code";

  return (
    <div style={style} className={className}>
      <Editor
        tinymceScriptSrc={tinymceScriptSrc}
        licenseKey={licenseKey}
        disabled={disabled}
        onInit={(_e: any, editor: any) => {
          editorRef.current = editor;
          onReady?.(editor);
        }}
        onEditorChange={(content: string) => {
          onChange?.(content);
        }}
        initialValue={initialValue}
        value={value}
        init={{
          height,
          menubar: true,
          menu: {
            file: { title: "文件", items: "newdocument restoredraft print" },
            edit: {
              title: "编辑",
              items:
                "undo redo | cut copy paste pastetext | selectall | searchreplace",
            },
            view: { title: "视图", items: "code | preview fullscreen" },
            insert: {
              title: "插入",
              items:
                "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
            },
            format: {
              title: "格式",
              items:
                "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat",
            },
            tools: {
              title: "工具",
              items: "spellchecker spellcheckerlanguage | code wordcount",
            },
            table: {
              title: "表格",
              items: "inserttable | cell row column | tableprops deletetable",
            },
            help: { title: "帮助", items: "help" },
          },
          language: "zh_CN",
          elementpath: false,
          branding: false,
          promotion: false,
          highlight_on_focus: false,
          pagebreak_split_block: true,
          placeholder,
          help_tabs: ["shortcuts", "keyboardnav", "plugins"],
          plugins: mergedPlugins,
          toolbar: mergedToolbar,
          content_css: contentCss,
          noneditable_class: "mceNonEditable",
          noneditable_regexp: [/\{[^}]*\}/g],
          line_height_formats: lineHeightFormats || defaultLineHeightFormats,
          font_family_formats: fontFamilyFormats || defaultFontFamilyFormats,
          font_size_formats: fontSizeFormats || defaultFontSizeFormats,
          block_formats: blockFormats || defaultBlockFormats,
          images_upload_url: "",
          images_reuse_filename: true,
          ...editorConfig,
        }}
      />
    </div>
  );
}
