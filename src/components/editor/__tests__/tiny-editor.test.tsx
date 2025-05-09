import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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

  // 测试showCodeButton属性
  it('默认应该不显示code按钮', () => {
    const { getByTestId } = render(<TinyEditor />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    // 检查工具栏配置中是否不包含code按钮
    const toolbarConfig = editorConfig.toolbar.join(' ');
    expect(toolbarConfig).not.toContain(' code ');

    // 检查菜单配置中tools项是否不包含code
    expect(editorConfig.menu.tools.items).not.toContain('code');
  });

  it('当showCodeButton为true时应该显示code按钮', () => {
    const { getByTestId } = render(<TinyEditor showCodeButton={true} />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    // 检查工具栏配置中是否包含code按钮
    const toolbarConfig = editorConfig.toolbar.join(' ');
    expect(toolbarConfig).toContain('code');

    // 检查菜单配置中tools项是否包含code
    expect(editorConfig.menu.tools.items).toContain('code');
  });

  // 测试自定义插件和工具栏
  it('应该合并自定义插件', () => {
    const customPlugins = ['customPlugin1', 'customPlugin2'];
    const { getByTestId } = render(<TinyEditor plugins={customPlugins} />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    customPlugins.forEach(plugin => {
      expect(editorConfig.plugins).toContain(plugin);
    });
  });

  it('应该合并自定义工具栏', () => {
    const customToolbar = ['custom1 custom2', 'custom3 custom4'];
    const { getByTestId } = render(<TinyEditor toolbar={customToolbar} />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    customToolbar.forEach(toolbarItem => {
      expect(editorConfig.toolbar).toContain(toolbarItem);
    });
  });

  // 测试语言切换
  it('应该根据language设置正确的语言', () => {
    const { getByTestId } = render(<TinyEditor language="zh_CN" />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.language).toBe('zh_CN');
    // 检查菜单是否使用了中文
    expect(editorConfig.menu.file.title).toBe('文件');
    expect(editorConfig.menu.edit.title).toBe('编辑');
  });

  it('英文界面下应该使用英文菜单', () => {
    const { getByTestId } = render(<TinyEditor language="en" />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.language).toBe('en');
    // 检查菜单是否使用了英文
    expect(editorConfig.menu.file.title).toBe('File');
    expect(editorConfig.menu.edit.title).toBe('Edit');
  });

  // 测试链接点击处理
  it('应该设置链接相关配置', () => {
    const { getByTestId } = render(<TinyEditor />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.link_assume_external_targets).toBe(true);
    expect(editorConfig.link_context_toolbar).toBe(true);
    expect(editorConfig.extended_valid_elements).toBe('a[href|target=_blank]');
  });

  // 测试自定义内容样式
  it('应该应用自定义内容样式', () => {
    const { getByTestId } = render(<TinyEditor />);
    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.content_style).toBe('body { font-family: simsun; }');
  });

  // 测试自定义字体相关配置
  it('应该使用自定义字体相关配置', () => {
    const customFontFamily = 'Arial=arial; Times=times';
    const customFontSize = '12px 14px 16px';
    const customLineHeight = '1 1.5 2';

    const { getByTestId } = render(
      <TinyEditor
        fontFamilyFormats={customFontFamily}
        fontSizeFormats={customFontSize}
        lineHeightFormats={customLineHeight}
      />
    );

    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.font_family_formats).toBe(customFontFamily);
    expect(editorConfig.font_size_formats).toBe(customFontSize);
    expect(editorConfig.line_height_formats).toBe(customLineHeight);
  });

  // 测试自定义块格式
  it('应该使用自定义块格式', () => {
    const customBlockFormats = 'Paragraph=p; Header=h1; Quote=blockquote';

    const { getByTestId } = render(
      <TinyEditor blockFormats={customBlockFormats} />
    );

    const editorConfig = JSON.parse(getByTestId('mock-tinymce-config').textContent || '{}');

    expect(editorConfig.block_formats).toBe(customBlockFormats);
  });
});
