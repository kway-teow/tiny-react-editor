import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Spinner from '../spinner';

describe('Spinner', () => {
  it('应该正确渲染加载中状态', () => {
    render(<Spinner spinning={true} />);
    // 检查容器是否存在
    expect(document.querySelector('.tinymce-editor-spinner-container')).toBeInTheDocument();
  });

  it('当不加载时不应该显示任何内容', () => {
    const { container } = render(<Spinner spinning={false} />);
    // 检查容器是否为空
    expect(container.firstChild).toBeNull();
  });

  it('应该正确渲染带有子元素的加载状态', () => {
    render(
      <Spinner spinning={true}>
        <div data-testid="spinner-child">内容</div>
      </Spinner>
    );

    // 检查子元素是否存在
    expect(screen.getByTestId('spinner-child')).toBeInTheDocument();
    // 检查加载层是否存在
    expect(document.querySelector('.tinymce-editor-spinner-wrapper')).toBeInTheDocument();
  });

  it('当不加载时应该显示子元素', () => {
    render(
      <Spinner spinning={false}>
        <div data-testid="spinner-child">内容</div>
      </Spinner>
    );

    // 检查子元素是否存在
    expect(screen.getByTestId('spinner-child')).toBeInTheDocument();
    // 加载层不应该存在
    expect(document.querySelector('.tinymce-editor-spinner-wrapper div[style*="position: absolute"]')).not.toBeInTheDocument();
  });

  it('应该显示提示文本', () => {
    render(
      <Spinner spinning={true} tip="加载中...">
        <div>内容</div>
      </Spinner>
    );

    // 检查提示文本是否存在
    expect(screen.getByText('加载中...')).toBeInTheDocument();
  });

  it('应该使用自定义指示符', () => {
    const customIndicator = <div data-testid="custom-indicator">自定义指示符</div>;

    render(
      <Spinner spinning={true} indicator={customIndicator}>
        <div>内容</div>
      </Spinner>
    );

    // 检查自定义指示符是否存在
    expect(screen.getByTestId('custom-indicator')).toBeInTheDocument();
  });
});
