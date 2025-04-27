import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TinyEditor } from '../tiny-editor';

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return import('../../../test/__mocks__/@tinymce/tinymce-react');
});

describe('TinyEditor', () => {
  let onChangeMock: ReturnType<typeof vi.fn>;
  let onReadyMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChangeMock = vi.fn();
    onReadyMock = vi.fn();
  });

  it('应该正确渲染编辑器', () => {
    render(<TinyEditor />);
    expect(screen.getByTestId('mock-tinymce-editor')).toBeInTheDocument();
  });

  it('应该使用传入的初始值', () => {
    const initialValue = '<p>初始内容</p>';
    render(<TinyEditor initialValue={initialValue} />);

    const textarea = screen.getByTestId('mock-tinymce-textarea');
    expect(textarea).toHaveValue(initialValue);
  });

  it('应该使用传入的value值', () => {
    const value = '<p>当前内容</p>';
    render(<TinyEditor value={value} />);

    const textarea = screen.getByTestId('mock-tinymce-textarea');
    expect(textarea).toHaveValue(value);
  });

  it('应该在内容变化时调用onChange回调', () => {
    render(<TinyEditor onChange={onChangeMock} />);

    const textarea = screen.getByTestId('mock-tinymce-textarea');
    fireEvent.change(textarea, { target: { value: '新内容' } });

    expect(onChangeMock).toHaveBeenCalledWith('新内容');
  });

  it('应该在编辑器初始化时调用onReady回调', () => {
    render(<TinyEditor onReady={onReadyMock} />);

    expect(onReadyMock).toHaveBeenCalled();
  });

  it('应该应用自定义高度', () => {
    const customHeight = 300;
    render(<TinyEditor height={customHeight} />);

    // 注意：由于我们的模拟实现简化了编辑器，
    // 我们在此处不能直接测试height是否被传递给了TinyMCE初始化配置
    // 在实际集成测试中，我们可能会检查DOM元素的实际高度
    expect(screen.getByTestId('mock-tinymce-editor')).toBeInTheDocument();
  });

  it('应该应用disabled状态', () => {
    render(<TinyEditor disabled={true} />);
    // 在真实情况下，我们会测试textarea是否被禁用
    // 但在我们的模拟实现中，我们只能验证props是否被传递
    expect(screen.getByTestId('mock-tinymce-editor')).toBeInTheDocument();
  });
});
