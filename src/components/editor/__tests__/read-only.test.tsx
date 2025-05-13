import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TinyEditorReadOnly } from '../read-only';

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return import('../../../test/__mocks__/@tinymce/tinymce-react');
});

// 模拟fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// 模拟window.open
const windowOpenMock = vi.fn();
global.window.open = windowOpenMock;

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

  it('应该处理服务器返回非200状态码的情况', async () => {
    // 模拟服务器返回404状态码
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    render(<TinyEditorReadOnly contentUrl="https://example.com/not-found.html" />);

    // 验证fetch被调用
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/not-found.html');

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

  describe('链接点击处理', () => {
    // 测试链接点击处理函数
    let handleClick: (e: any) => void;
    let mockEditorDoc: any;

    beforeEach(() => {
      // 创建模拟的目标元素
      const mockTargetElement = {
        scrollIntoView: vi.fn()
      };

      // 创建模拟的文档对象
      mockEditorDoc = {
        body: { tagName: 'BODY' },
        getElementById: vi.fn().mockReturnValue(mockTargetElement)
      };

      // 重置模拟函数
      windowOpenMock.mockClear();

      // 创建点击处理函数
      handleClick = (e: any) => {
        // 找到最近的a元素
        let target = e.target;
        let linkFound = false;

        // 向上查找到a标签
        while (target && target.tagName !== 'A' && target !== mockEditorDoc.body) {
          target = target.parentElement;
        }

        if (target && target.tagName === 'A') {
          linkFound = true;
          const href = target.getAttribute('href');
          if (href) {
            e.preventDefault();
            e.stopPropagation();

            if (href.startsWith('#')) {
              // 内部锚点链接
              const targetId = href.substring(1);
              const targetElement = mockEditorDoc.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              // 外部链接
              window.open(href, '_blank');
            }
          }
        }

        // 如果点击的不是链接，阻止事件继续传播
        if (!linkFound) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
    });

    it('应该处理外部链接点击', () => {
      // 模拟点击外部链接事件
      const mockEvent = {
        target: {
          tagName: 'A',
          getAttribute: vi.fn().mockReturnValue('https://example.com'),
          parentElement: null
        },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      };

      // 调用点击处理函数
      handleClick(mockEvent);

      // 验证阻止默认行为和事件传播
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // 验证window.open被调用
      expect(windowOpenMock).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('应该处理内部锚点链接点击', () => {
      // 模拟点击内部锚点链接事件
      const mockEvent = {
        target: {
          tagName: 'A',
          getAttribute: vi.fn().mockReturnValue('#section1'),
          parentElement: null
        },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      };

      // 调用点击处理函数
      handleClick(mockEvent);

      // 验证阻止默认行为和事件传播
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // 验证scrollIntoView被调用
      expect(mockEditorDoc.getElementById().scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

      // 验证window.open未被调用
      expect(windowOpenMock).not.toHaveBeenCalled();
    });

    it('应该向上遍历DOM查找链接元素', () => {
      // 创建一个嵌套的DOM结构进行测试
      const mockParentLink = {
        tagName: 'A',
        getAttribute: vi.fn().mockReturnValue('https://example.com'),
        parentElement: mockEditorDoc.body
      };

      const mockSpan = {
        tagName: 'SPAN',
        parentElement: mockParentLink
      };

      // 模拟点击嵌套在链接中的span元素
      const mockEvent = {
        target: mockSpan,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      };

      // 调用点击处理函数
      handleClick(mockEvent);

      // 验证阻止默认行为和事件传播
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // 验证window.open被调用
      expect(windowOpenMock).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('应该处理非链接元素点击', () => {
      // 模拟点击非链接元素
      const mockEvent = {
        target: {
          tagName: 'P',
          parentElement: mockEditorDoc.body
        },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      };

      // 调用点击处理函数
      handleClick(mockEvent);

      // 验证阻止默认行为和事件传播
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();

      // 验证window.open未被调用
      expect(windowOpenMock).not.toHaveBeenCalled();
    });
  });
});
