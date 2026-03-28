import React from 'react';
import {SlideBackground} from '../shared/SlideBackground';
import {AnimatedText} from '../shared/AnimatedText';
import {AccentBar} from '../shared/AccentBar';
import {useFade} from '../../animations/transitions';
import {COLORS, LAYOUT} from '../../lib/theme';
import type {StatSlide as StatSlideType} from '../../types/slides';

interface Props {
  slide: StatSlideType;
}

export const StatSlide: React.FC<Props> = ({slide}) => {
  const opacity = useFade();

  return (
    <SlideBackground>
      <div
        style={{
          opacity,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: LAYOUT.padding,
          textAlign: 'center',
        }}
      >
        <AnimatedText animation="slideUp" delay={0}>
          <p
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: COLORS.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0,
            }}
          >
            {slide.heading}
          </p>
        </AnimatedText>

        <AnimatedText animation="scale" delay={10}>
          <p
            style={{
              fontSize: 160,
              fontWeight: 800,
              color: COLORS.accent,
              margin: 0,
              marginTop: 16,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {slide.value}
          </p>
        </AnimatedText>

        <AccentBar delay={20} width={100} height={4} />

        <AnimatedText animation="slideUp" delay={25}>
          <p
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.textSecondary,
              margin: 0,
              marginTop: 4,
            }}
          >
            {slide.label}
          </p>
        </AnimatedText>
      </div>
    </SlideBackground>
  );
};
