import { useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { vi } from 'vitest';

// 模拟Editor组件
const MockEditorComponent: ForwardRefRenderFunction<any, any> = (props, ref) => {
  const { onInit, onEditorChange, value, initialValue } = props;

  useEffect(() => {
    // 模拟编辑器初始化
    if (onInit) {
      const mockEditor = {
        getContent: () => value || initialValue || '',
        setContent: vi.fn(),
        on: vi.fn(),
        off: vi.fn(),
        destroy: vi.fn(),
      };

      onInit(null, mockEditor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 模拟文本区域，简单展示内容
  return (
    <div data-testid="mock-tinymce-editor" ref={ref}>
      <textarea
        data-testid="mock-tinymce-textarea"
        value={value || initialValue || ''}
        onChange={(e) => {
          if (onEditorChange) {
            onEditorChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export const Editor = forwardRef(MockEditorComponent);

// 导出模拟函数以便在测试中验证
export const mockFunctions = {
  init: vi.fn(),
  setContent: vi.fn(),
  getContent: vi.fn(),
};
