import { Editor } from "@tinymce/tinymce-react";
import { CSSProperties, useEffect, useState, ReactNode } from "react";
import Spinner from "./spinner";

export interface TinyEditorReadOnlyProps {
  /** 内容 */
  content?: string;
  /** 内容URL，如果提供则从URL加载内容 */
  contentUrl?: string;
  /** 查看器高度 */
  height?: number | string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** className */
  className?: string;
  /** 加载失败时的提示文本 */
  errorText?: string;
  /** 自定义加载指示符 */
  indicator?: ReactNode;
  /** 自定义加载组件 */
  spinComponent?: React.ComponentType<any>;
  /** 自定义 TinyMCE 路径 */
  tinymceScriptSrc?: string;
  /** 自定义内容样式表 */
  contentCss?: string;
  /** 编辑器界面语言 */
  language?: string;
}

export function TinyEditorReadOnly({
  content,
  contentUrl,
  height = 500,
  style,
  className,
  errorText = "加载内容失败",
  indicator,
  spinComponent: CustomSpin,
  tinymceScriptSrc = "/tinymce/tinymce.min.js",
  contentCss = "/css/editor-content.css",
  language = "zh_CN",
}: TinyEditorReadOnlyProps) {
  const [displayContent, setDisplayContent] = useState(content || "");
  const [loading, setLoading] = useState(false);

  // 根据语言设置错误文本
  const getLocalizedErrorText = () => {
    if (errorText && errorText !== "加载内容失败") {
      return errorText; // 如果用户提供了自定义错误文本，优先使用
    }

    // 根据语言设置默认错误信息
    if (language && language.startsWith("zh")) {
      return "加载内容失败";
    }
    return "Failed to load content";
  };

  // 本地化加载提示
  const getLoadingTip = () => {
    if (language && language.startsWith("zh")) {
      return "加载中...";
    }
    return "Loading...";
  };

  useEffect(() => {
    const loadContent = async () => {
      if (contentUrl) {
        setLoading(true);
        try {
          const response = await fetch(contentUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch content");
          }
          const result = await response.text();
          setDisplayContent(result);
        } catch (error) {
          console.error("Failed to load content:", error);
          setDisplayContent(getLocalizedErrorText());
        } finally {
          setLoading(false);
        }
      }
    };

    if (contentUrl) {
      loadContent();
    } else {
      setDisplayContent(content || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentUrl, content, errorText, language]); // 添加language作为依赖

  // 使用用户提供的Spin组件或默认的Spinner组件
  const SpinComponent = CustomSpin || Spinner;

  return (
    <div style={style} className={className}>
      <SpinComponent
        spinning={loading}
        tip={getLoadingTip()}
        indicator={indicator}
      >
        <Editor
          tinymceScriptSrc={tinymceScriptSrc}
          disabled={true}
          value={displayContent}
          init={{
            height,
            menubar: false,
            toolbar: false,
            statusbar: false,
            language,
            elementpath: false,
            branding: false,
            highlight_on_focus: false,
            plugins: ["link"],
            content_css: contentCss,
            body_class: "readonly-content",
            link_assume_external_targets: true,
            link_context_toolbar: false,
            extended_valid_elements: "a[href|target=_blank]",
            setup: (editor) => {
              editor.on("click", (e) => {
                const dom = editor.dom;
                const anchorElm = dom.getParent(e.target, "a");
                if (anchorElm) {
                  const href = dom.getAttrib(anchorElm, "href");
                  if (href) {
                    e.preventDefault();
                    if (href.startsWith("#")) {
                      const targetId = href.substring(1);
                      const target = editor.getDoc().getElementById(targetId);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    } else {
                      window.open(href, "_blank");
                    }
                    return false;
                  }
                }
              });
            },
          }}
        />
      </SpinComponent>
    </div>
  );
}
