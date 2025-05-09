import { FC, useEffect, useRef, useState } from 'react';
import { vi } from 'vitest';

export interface EditorProps {
  onInit?: (editor: any) => void;
  onEditorChange?: (content: string) => void;
  value?: string;
  initialValue?: string;
  init?: any;
  className?: string;
  disabled?: boolean;
}

export const MockEditorComponent: FC<EditorProps> = ({
  onInit,
  onEditorChange,
  value,
  initialValue,
  init,
  className,
  disabled
}) => {
  const [content, setContent] = useState(initialValue || value || '');
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (value !== undefined) {
      setContent(value);
    }
  }, [value]);

  useEffect(() => {
    // 创建一个模拟的editor对象
    const mockEditor = {
      getContent: () => content,
      setContent: (newContent: string) => {
        setContent(newContent);
        onEditorChange?.(newContent);
      },
      on: (event: string, callback: (e: any) => void) => callback,
      off: vi.fn(),
      destroy: vi.fn(),
      getDoc: () => document,
      getBody: () => document.body,
      selection: {
        getContent: () => content,
      },
      // 添加更多方法
      dom: {
        getParent: vi.fn(),
        getAttrib: vi.fn()
      }
    };

    editorRef.current = mockEditor;
    onInit?.(mockEditor);

    // 处理init中的setup函数
    if (init?.setup) {
      init.setup(mockEditor);
    }

    return () => {
      mockEditor.destroy();
    };
  }, [onInit]);

  return (
    <div className={className || 'tinymce-editor-spinner-content'} style={init?.style}>
      <textarea
        data-testid="mock-tinymce-textarea"
        value={content}
        onChange={(e) => {
          const newContent = e.target.value;
          setContent(newContent);
          onEditorChange?.(newContent);
        }}
        disabled={disabled}
      />
      {init && (
        <pre data-testid="mock-tinymce-config">
          {JSON.stringify({
            ...init,
            disabled: disabled
          }, null, 2)}
        </pre>
      )}
      <div data-testid="mock-tinymce-editor"></div>
    </div>
  );
};

export const Editor = MockEditorComponent;

// 导出模拟函数以便测试
export const mockFunctions = {
  init: vi.fn(),
  setup: vi.fn(),
  remove: vi.fn(),
};
