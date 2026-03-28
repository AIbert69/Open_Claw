import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from '../../lib/theme';

export const SlideBackground: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(165deg, ${COLORS.bg} 0%, ${COLORS.bgSubtle} 50%, ${COLORS.white} 100%)`,
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Subtle top accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
