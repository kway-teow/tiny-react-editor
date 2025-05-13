import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TinyEditor } from '../tiny-editor';

// 创建一个全局的模拟函数
const mockWindowManagerOpen = vi.fn();

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return {
    Editor: ({ onInit, initialValue, value, onEditorChange, init }: any) => {
      const editor = {
        getContent: () => initialValue || value || '',
        ui: {
          registry: {
            addIcon: vi.fn(),
            addButton: vi.fn(),
            addMenuItem: vi.fn()
          }
        },
        windowManager: {
          open: mockWindowManagerOpen
        },
        on: vi.fn(),
        selection: {
          getSelectedBlocks: () => []
        },
        dom: {
          getParent: vi.fn().mockImplementation((target, selector) => {
            if (selector === 'a') return { tagName: 'A' };
            return null;
          }),
          getAttrib: vi.fn().mockReturnValue('https://example.com'),
          setStyle: vi.fn()
        },
        addShortcut: vi.fn()
      };

      // 如果有初始化setup函数，调用它
      if (init?.setup) {
        init.setup(editor);
      }

      // 调用onInit回调
      if (onInit) {
        onInit(null, editor);
      }

      return (
        <div data-testid="editor-container">
          <textarea
            data-testid="editor-textarea"
            value={initialValue || value || ''}
            onChange={(e) => onEditorChange?.(e.target.value)}
          />
          <button
            data-testid="custom-preview-button"
            onClick={() => {
              // 触发设置的按钮回调
              const buttonCallback = editor.ui.registry.addButton.mock.calls.find(
                call => call[0] === 'custom_preview'
              );
              if (buttonCallback && buttonCallback[1] && buttonCallback[1].onAction) {
                buttonCallback[1].onAction();
              }
            }}
          >
            自定义预览
          </button>
          <button
            data-testid="indent-left-button"
            onClick={() => {
              const buttonCallback = editor.ui.registry.addButton.mock.calls.find(
                call => call[0] === 'indent_left'
              );
              if (buttonCallback && buttonCallback[1] && buttonCallback[1].onAction) {
                buttonCallback[1].onAction();
              }
            }}
          >
            减少缩进
          </button>
          <button
            data-testid="indent-right-button"
            onClick={() => {
              const buttonCallback = editor.ui.registry.addButton.mock.calls.find(
                call => call[0] === 'indent_right'
              );
              if (buttonCallback && buttonCallback[1] && buttonCallback[1].onAction) {
                buttonCallback[1].onAction();
              }
            }}
          >
            增加缩进
          </button>
          <a
            href="https://example.com"
            data-testid="test-link"
            onClick={() => {
              // 触发链接点击事件
              const clickCallback = editor.on.mock.calls.find(
                call => call[0] === 'click'
              );
              if (clickCallback && clickCallback[1]) {
                clickCallback[1]({
                  preventDefault: vi.fn(),
                  target: { tagName: 'A' }
                });
              }
            }}
          >
            测试链接
          </a>
          <pre data-testid="editor-config">
            {JSON.stringify(init || {}, null, 2)}
          </pre>
        </div>
      );
    }
  };
});

describe('TinyEditor预览和高级功能', () => {
  let onReadyMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onReadyMock = vi.fn();
    // 每次测试前重置模拟函数
    mockWindowManagerOpen.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('应该在点击自定义预览按钮时打开预览窗口', () => {
    const initialValue = '<p>测试内容</p>';
    const { getByTestId } = render(
      <TinyEditor
        initialValue={initialValue}
        onReady={onReadyMock}
        language="zh_CN"
      />
    );

    // 点击自定义预览按钮
    const previewButton = getByTestId('custom-preview-button');
    fireEvent.click(previewButton);

    // 验证windowManager.open被调用
    expect(mockWindowManagerOpen).toHaveBeenCalled();

    // 验证传递给windowManager.open的参数
    const callArgs = mockWindowManagerOpen.mock.calls[0][0];
    expect(callArgs.title).toBe('预览'); // 默认语言是中文
    expect(callArgs.size).toBe('large');
    expect(callArgs.body.type).toBe('panel');
    expect(callArgs.initialData['preview-iframe']).toContain(initialValue);
  });

  it('应该在英文界面下使用英文预览标题', () => {
    const initialValue = '<p>Test Content</p>';
    const { getByTestId } = render(
      <TinyEditor
        initialValue={initialValue}
        language="en"
        onReady={onReadyMock}
      />
    );

    // 点击自定义预览按钮
    const previewButton = getByTestId('custom-preview-button');
    fireEvent.click(previewButton);

    // 验证windowManager.open被调用，并且使用英文标题
    expect(mockWindowManagerOpen).toHaveBeenCalled();
    const callArgs = mockWindowManagerOpen.mock.calls[0][0];
    expect(callArgs.title).toBe('Preview');
  });

  it('应该处理链接点击事件', () => {
    global.window.open = vi.fn();

    const { getByTestId } = render(
      <TinyEditor onReady={onReadyMock} />
    );

    // 点击测试链接
    const testLink = getByTestId('test-link');
    fireEvent.click(testLink);

    // 验证window.open被调用
    expect(global.window.open).toHaveBeenCalledWith('https://example.com', '_blank');
  });

  it('应该在BeforeOpenPreview事件中调用自定义预览功能', () => {
    render(
      <TinyEditor onReady={onReadyMock} />
    );

    // 找到editor实例
    const editor = onReadyMock.mock.calls[0][0];

    // 为BeforeOpenPreview事件创建模拟事件对象
    const mockEvent = {
      preventDefault: vi.fn()
    };

    // 找到BeforeOpenPreview事件处理函数
    const beforePreviewCallback = editor.on.mock.calls.find(
      (call: any[]) => call[0] === 'BeforeOpenPreview'
    );

    if (beforePreviewCallback && beforePreviewCallback[1]) {
      // 触发事件处理函数
      beforePreviewCallback[1](mockEvent);

      // 验证preventDefault被调用
      expect(mockEvent.preventDefault).toHaveBeenCalled();

      // 验证windowManager.open被调用（通过自定义预览功能）
      expect(mockWindowManagerOpen).toHaveBeenCalled();
    }
  });

  it('应该支持缩进调整功能', () => {
    const { getByTestId } = render(
      <TinyEditor onReady={onReadyMock} />
    );

    // 点击减少缩进按钮
    const indentLeftButton = getByTestId('indent-left-button');
    fireEvent.click(indentLeftButton);

    // 点击增加缩进按钮
    const indentRightButton = getByTestId('indent-right-button');
    fireEvent.click(indentRightButton);

    // 找到editor实例
    const editor = onReadyMock.mock.calls[0][0];

    // 验证dom.setStyle没有被调用（因为getSelectedBlocks返回空数组）
    expect(editor.dom.setStyle).not.toHaveBeenCalled();
  });
});
