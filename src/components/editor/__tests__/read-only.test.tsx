import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TinyEditorReadOnly } from '../read-only';

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return import('../../../test/__mocks__/@tinymce/tinymce-react');
});

// 模拟fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('TinyEditorReadOnly', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('应该正确渲染查看器', () => {
    render(<TinyEditorReadOnly content="<p>只读内容</p>" />);
    expect(screen.getByTestId('mock-tinymce-editor')).toBeInTheDocument();
  });

  it('应该使用传入的内容', () => {
    const content = '<p>只读内容</p>';
    render(<TinyEditorReadOnly content={content} />);

    const textarea = screen.getByTestId('mock-tinymce-textarea');
    expect(textarea).toHaveValue(content);
  });

  it('应该从URL加载内容', async () => {
    const urlContent = '<p>从URL加载的内容</p>';
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(urlContent),
    });

    render(<TinyEditorReadOnly contentUrl="https://example.com/content.html" />);

    // 验证fetch被调用
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/content.html');

    // 等待内容加载
    await waitFor(() => {
      const textarea = screen.getByTestId('mock-tinymce-textarea');
      expect(textarea).toHaveValue(urlContent);
    });
  });

  it('应该处理URL加载失败的情况', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<TinyEditorReadOnly contentUrl="https://example.com/error-content.html" />);

    // 验证fetch被调用
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/error-content.html');

    // 等待错误消息
    await waitFor(() => {
      const textarea = screen.getByTestId('mock-tinymce-textarea');
      expect(textarea).toHaveValue('加载内容失败');
    });
  });

  it('应该显示自定义错误文本', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const customError = '无法获取内容，请稍后再试';

    render(
      <TinyEditorReadOnly
        contentUrl="https://example.com/error-content.html"
        errorText={customError}
      />
    );

    // 等待自定义错误消息
    await waitFor(() => {
      const textarea = screen.getByTestId('mock-tinymce-textarea');
      expect(textarea).toHaveValue(customError);
    });
  });

  it('应该使用英文错误消息当语言为英文', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <TinyEditorReadOnly
        contentUrl="https://example.com/error-content.html"
        language="en"
      />
    );

    // 等待英文错误消息
    await waitFor(() => {
      const textarea = screen.getByTestId('mock-tinymce-textarea');
      expect(textarea).toHaveValue('Failed to load content');
    });
  });

  it('应该应用自定义高度', () => {
    const customHeight = 300;
    render(<TinyEditorReadOnly height={customHeight} />);

    expect(screen.getByTestId('mock-tinymce-editor')).toBeInTheDocument();
  });
});
