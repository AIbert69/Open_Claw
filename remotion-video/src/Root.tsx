import React from 'react';
import {Composition} from 'remotion';
import {DocumentPresentation} from './components/DocumentPresentation';
import {sampleDocument} from './data/sampleDocument';
import {parseDocument} from './lib/parseDocument';
import {calculateTotalDuration} from './lib/calculateDuration';

const slides = parseDocument(sampleDocument);
const totalDuration = calculateTotalDuration(slides);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DocumentPresentation"
        component={DocumentPresentation}
        durationInFrames={totalDuration}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{document: sampleDocument}}
      />
    </>
  );
};
