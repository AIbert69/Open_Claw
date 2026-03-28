import React from 'react';
import {SlideBackground} from '../shared/SlideBackground';
import {AnimatedText} from '../shared/AnimatedText';
import {AccentBar} from '../shared/AccentBar';
import {useFade} from '../../animations/transitions';
import {COLORS, LAYOUT} from '../../lib/theme';
import type {ClosingSlide as ClosingSlideType} from '../../types/slides';

interface Props {
  slide: ClosingSlideType;
}

export const ClosingSlide: React.FC<Props> = ({slide}) => {
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
        <AccentBar delay={5} width={60} height={4} />

        <AnimatedText animation="scale" delay={10}>
          <h2
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: COLORS.textPrimary,
              margin: 0,
              marginTop: 8,
              lineHeight: 1.2,
            }}
          >
            {slide.text}
          </h2>
        </AnimatedText>

        <AnimatedText animation="slideUp" delay={25}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: COLORS.accent,
              margin: 0,
              marginTop: 32,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Singh Automation, LLC — Portage, MI
          </p>
        </AnimatedText>
      </div>
    </SlideBackground>
  );
};
