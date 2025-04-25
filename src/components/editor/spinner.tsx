import React, { CSSProperties, ReactNode } from 'react';

export interface SpinnerProps {
  /** 是否为加载中状态 */
  spinning?: boolean;
  /** 自定义加载指示符 */
  indicator?: ReactNode;
  /** 包裹的内容 */
  children?: ReactNode;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 显示文本 */
  tip?: string;
}

// 默认的加载指示符
const DefaultIndicator = () => {
  return (
    <div 
      style={{ 
        display: 'inline-block', 
        width: 24, 
        height: 24, 
        border: '2px solid transparent',
        borderTopColor: '#1677ff',
        borderRadius: '50%',
        animation: 'tinymce-editor-spin-rotate 1s linear infinite'
      }}
    />
  );
};

export const Spinner: React.FC<SpinnerProps> = ({
  spinning = true,
  indicator,
  children,
  style,
  className = '',
  tip,
}) => {
  // 使用默认指示符
  const spinIndicator = indicator || <DefaultIndicator />;

  // 加载中的样式
  const spinningStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  };

  // 包装器样式
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    ...style,
  };

  // 插入自定义样式
  React.useEffect(() => {
    const styleId = 'tinymce-editor-spinner-style';
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement('style');
      styleElement.id = styleId;
      styleElement.textContent = `
        @keyframes tinymce-editor-spin-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // 不需要清理，因为其他组件可能也在使用
  }, []);
  
  // 如果没有子元素，只显示 spinner
  if (!children) {
    return spinning ? (
      <div className={`tinymce-editor-spinner-container ${className}`} style={style}>
        {spinIndicator}
        {tip && <div style={{ marginTop: 8 }}>{tip}</div>}
      </div>
    ) : null;
  }
  
  return (
    <div className={`tinymce-editor-spinner-wrapper ${className}`} style={wrapperStyle}>
      {spinning && (
        <div style={spinningStyle}>
          {spinIndicator}
          {tip && <div style={{ marginTop: 8 }}>{tip}</div>}
        </div>
      )}
      <div 
        className="tinymce-editor-spinner-content"
        style={{ 
          opacity: spinning ? 0.5 : 1,
          pointerEvents: spinning ? 'none' : 'auto',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Spinner; 