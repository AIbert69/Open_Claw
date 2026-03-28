import React from 'react';
import {SlideBackground} from '../shared/SlideBackground';
import {AnimatedText} from '../shared/AnimatedText';
import {AccentBar} from '../shared/AccentBar';
import {useFade} from '../../animations/transitions';
import {COLORS, LAYOUT} from '../../lib/theme';
import type {TitleSlide as TitleSlideType} from '../../types/slides';

interface Props {
  slide: TitleSlideType;
}

export const TitleSlide: React.FC<Props> = ({slide}) => {
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
        <AnimatedText animation="scale" delay={5}>
          <h1
            style={{
              fontSize: 82,
              fontWeight: 800,
              color: COLORS.textPrimary,
              letterSpacing: '-0.02em',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {slide.title}
          </h1>
        </AnimatedText>

        <AccentBar delay={15} width={120} height={5} />

        {slide.subtitle && (
          <AnimatedText animation="slideUp" delay={20}>
            <p
              style={{
                fontSize: 40,
                fontWeight: 400,
                color: COLORS.textSecondary,
                margin: 0,
                marginTop: 8,
              }}
            >
              {slide.subtitle}
            </p>
          </AnimatedText>
        )}

        {slide.author && (
          <AnimatedText animation="slideUp" delay={30}>
            <p
              style={{
                fontSize: 26,
                fontWeight: 500,
                color: COLORS.accent,
                margin: 0,
                marginTop: 24,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {slide.author}
            </p>
          </AnimatedText>
        )}
      </div>
    </SlideBackground>
  );
};
