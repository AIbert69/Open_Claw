import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../../lib/theme';

interface AccentBarProps {
  delay?: number;
  width?: number;
  height?: number;
}

export const AccentBar: React.FC<AccentBarProps> = ({
  delay = 10,
  width = 80,
  height = 4,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {damping: 14, mass: 0.5},
  });

  const barWidth = interpolate(progress, [0, 1], [0, width]);

  return (
    <div
      style={{
        width: barWidth,
        height,
        borderRadius: height / 2,
        background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentLight})`,
        marginTop: 16,
        marginBottom: 16,
      }}
    />
  );
};
