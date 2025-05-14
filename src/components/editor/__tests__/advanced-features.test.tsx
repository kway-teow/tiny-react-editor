import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TinyEditor } from '../tiny-editor';

// 模拟@tinymce/tinymce-react模块
vi.mock('@tinymce/tinymce-react', () => {
  return import('../../../test/__mocks__/@tinymce/tinymce-react');
});

describe('编辑器高级功能测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('链接处理', () => {
    it('应该设置正确的链接相关配置', () => {
      const { getByTestId } = render(<TinyEditor />);
      const editorConfig = JSON.parse(getByTestId('mock-tinymce-init-config').textContent || '{}');

      // 验证链接相关设置
      expect(editorConfig.link_assume_external_targets).toBe(true);
      expect(editorConfig.link_context_toolbar).toBe(true);
      expect(editorConfig.extended_valid_elements).toBe('a[href|target=_blank]');
    });
  });

  describe('字体相关设置', () => {
    it('默认字体应该是宋体', () => {
      const { getByTestId } = render(<TinyEditor />);
      const editorConfig = JSON.parse(getByTestId('mock-tinymce-init-config').textContent || '{}');

      // 验证默认字体相关设置
      expect(editorConfig.content_style).toContain('font-family: simsun');
      expect(editorConfig.font_family_formats).toContain('宋体=simsun');

      // 验证宋体是第一个选项
      const fontList = editorConfig.font_family_formats.split(';').map((f: string) => f.trim());
      expect(fontList[0].startsWith('宋体=')).toBe(true);
    });
  });
});
