import React from 'react';
import {useSlideIn} from '../../animations/transitions';
import {staggerDelay} from '../../animations/transitions';
import {COLORS} from '../../lib/theme';

interface BulletItemProps {
  text: string;
  index: number;
  baseDelay: number;
}

const BulletItem: React.FC<BulletItemProps> = ({text, index, baseDelay}) => {
  const animStyle = useSlideIn('left', baseDelay + staggerDelay(index, 10));

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: 24,
        ...animStyle,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: COLORS.accent,
          marginTop: 14,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          fontSize: 34,
          fontWeight: 400,
          color: COLORS.textSecondary,
          lineHeight: 1.5,
        }}
      >
        {text}
      </div>
    </div>
  );
};

interface BulletListProps {
  bullets: string[];
  baseDelay?: number;
}

export const BulletList: React.FC<BulletListProps> = ({bullets, baseDelay = 20}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {bullets.map((bullet, i) => (
        <BulletItem key={i} text={bullet} index={i} baseDelay={baseDelay} />
      ))}
    </div>
  );
};
