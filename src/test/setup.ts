import '@testing-library/jest-dom';
import { vi, beforeEach } from 'vitest';

// 模拟TinyMCE全局对象
// @ts-expect-error - 全局TinyMCE模拟
global.tinymce = {
  init: vi.fn(),
  remove: vi.fn(),
  get: vi.fn(),
};

// 模拟ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};

// 清除所有模拟在每次测试后
beforeEach(() => {
  vi.clearAllMocks();
});
