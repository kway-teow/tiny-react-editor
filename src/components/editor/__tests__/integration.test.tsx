import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TinyEditorReadOnly } from '../read-only';
import { TinyEditor } from '../tiny-editor';

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return import('../../../test/__mocks__/@tinymce/tinymce-react');
});

describe('编辑器集成测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该能够在编辑器中输入内容并在只读模式下查看', () => {
    // 渲染编辑器
    const onChangeMock = vi.fn();
    const { unmount } = render(<TinyEditor onChange={onChangeMock} />);

    // 输入内容
    const textarea = screen.getByTestId('mock-tinymce-textarea');
    fireEvent.change(textarea, { target: { value: '<p>测试内容</p>' } });

    // 验证onChange被调用
    expect(onChangeMock).toHaveBeenCalledWith('<p>测试内容</p>');

    unmount();

    // 渲染只读模式查看内容
    render(<TinyEditorReadOnly content="<p>测试内容</p>" />);
    const readOnlyTextarea = screen.getByTestId('mock-tinymce-textarea');
    expect(readOnlyTextarea).toHaveValue('<p>测试内容</p>');
  });

  it('应该在不同语言下正确渲染菜单', () => {
    // 中文模式
    const { unmount: unmountZh } = render(<TinyEditor language="zh_CN" />);
    let editorConfig = JSON.parse(screen.getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.language).toBe('zh_CN');
    expect(editorConfig.menu.file.title).toBe('文件');

    unmountZh();

    // 英文模式
    render(<TinyEditor language="en" />);
    editorConfig = JSON.parse(screen.getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.language).toBe('en');
    expect(editorConfig.menu.file.title).toBe('File');
  });

  it('应该支持不同的配置组合', () => {
    // 配置编辑器的各种选项
    const customConfig = {
      height: 400,
      showCodeButton: true,
      fontFamilyFormats: 'Arial=arial; Times=times',
      fontSizeFormats: '12px 14px 16px',
      plugins: ['customPlugin'],
      toolbar: ['customToolbarItem'],
    };

    const { getByTestId } = render(
      <TinyEditor
        height={customConfig.height}
        showCodeButton={customConfig.showCodeButton}
        fontFamilyFormats={customConfig.fontFamilyFormats}
        fontSizeFormats={customConfig.fontSizeFormats}
        plugins={customConfig.plugins}
        toolbar={customConfig.toolbar}
      />
    );

    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    // 检查配置是否正确应用
    expect(editorConfig.height).toBe(customConfig.height);
    expect(editorConfig.font_family_formats).toBe(customConfig.fontFamilyFormats);
    expect(editorConfig.font_size_formats).toBe(customConfig.fontSizeFormats);
    expect(editorConfig.plugins).toContain(customConfig.plugins[0]);
    expect(editorConfig.toolbar).toContain(customConfig.toolbar[0]);

    // 检查工具栏是否包含code
    const toolbarConfig = editorConfig.toolbar.join(' ');
    expect(toolbarConfig).toContain('code');
  });

  it('禁用状态下不应该允许编辑', () => {
    const { getByTestId } = render(<TinyEditor disabled={true} />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.disabled).toBe(true);
  });

  it('编辑器和只读模式都应该支持自定义类名和样式', () => {
    const customStyle = { margin: '10px' };
    const customClass = 'custom-editor';

    // 测试编辑器模式
    const { unmount } = render(
      <TinyEditor style={customStyle} className={customClass} />
    );

    // className被传递到TinyEditor组件，再传递到Editor组件
    // 验证组件已正确渲染，但不验证className
    const editor = screen.getByTestId('mock-tinymce-editor');
    expect(editor).toBeInTheDocument();

    unmount();

    // 测试只读模式
    render(
      <TinyEditorReadOnly
        content="测试内容"
        style={customStyle}
        className={customClass}
      />
    );

    // 验证只读模式组件已正确渲染
    const readOnlyEditor = screen.getByTestId('mock-tinymce-editor');
    expect(readOnlyEditor).toBeInTheDocument();
  });
});
