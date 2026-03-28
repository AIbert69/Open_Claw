import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {parseDocument} from '../lib/parseDocument';
import {TitleSlide} from './slides/TitleSlide';
import {ContentSlide} from './slides/ContentSlide';
import {StatSlide} from './slides/StatSlide';
import {ClosingSlide} from './slides/ClosingSlide';
import type {DocumentInput, Slide} from '../types/slides';

interface Props {
  document: DocumentInput;
}

function renderSlide(slide: Slide) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'content':
      return <ContentSlide slide={slide} />;
    case 'stat':
      return <StatSlide slide={slide} />;
    case 'closing':
      return <ClosingSlide slide={slide} />;
  }
}

export const DocumentPresentation: React.FC<Props> = ({document}) => {
  const slides = parseDocument(document);

  return (
    <AbsoluteFill style={{backgroundColor: '#f5f7fa'}}>
      {slides.map((slide, i) => (
        <Sequence
          key={i}
          from={slide.startFrame}
          durationInFrames={slide.durationInFrames}
          name={`Slide ${i + 1}: ${slide.type}`}
        >
          {renderSlide(slide)}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
