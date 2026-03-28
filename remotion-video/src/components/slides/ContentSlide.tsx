import React from 'react';
import {SlideBackground} from '../shared/SlideBackground';
import {AnimatedText} from '../shared/AnimatedText';
import {AccentBar} from '../shared/AccentBar';
import {BulletList} from '../shared/BulletList';
import {useFade} from '../../animations/transitions';
import {COLORS, LAYOUT} from '../../lib/theme';
import type {ContentSlide as ContentSlideType} from '../../types/slides';

interface Props {
  slide: ContentSlideType;
}

export const ContentSlide: React.FC<Props> = ({slide}) => {
  const opacity = useFade();

  return (
    <SlideBackground>
      <div
        style={{
          opacity,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: LAYOUT.padding,
          paddingRight: LAYOUT.padding + 40,
          height: '100%',
        }}
      >
        <AnimatedText animation="slideLeft" delay={0}>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.textPrimary,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {slide.heading}
          </h2>
        </AnimatedText>

        <AccentBar delay={8} width={80} height={4} />

        <div style={{marginTop: 16}}>
          <BulletList bullets={slide.bullets} baseDelay={15} />
        </div>
      </div>

      {/* Decorative side accent */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(180deg, ${COLORS.accent}33, ${COLORS.accentLight}33)`,
        }}
      />
    </SlideBackground>
  );
};
