import React from 'react';
import {useSlideIn, useScaleEntrance} from '../../animations/transitions';

interface AnimatedTextProps {
  children: React.ReactNode;
  animation?: 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  animation = 'slideUp',
  delay = 0,
  style = {},
}) => {
  let animStyle: React.CSSProperties = {};

  if (animation === 'scale') {
    animStyle = useScaleEntrance(delay);
  } else {
    const dirMap = {
      slideUp: 'up' as const,
      slideLeft: 'left' as const,
      slideRight: 'right' as const,
    };
    animStyle = useSlideIn(dirMap[animation], delay);
  }

  return <div style={{...animStyle, ...style}}>{children}</div>;
};
