import {Slide} from '../types/slides';
import {TRANSITION_FRAMES} from './theme';

const TITLE_FRAMES = 120;
const CONTENT_BASE_FRAMES = 90;
const FRAMES_PER_BULLET = 30;
const STAT_FRAMES = 120;
const CLOSING_FRAMES = 90;

export function calculateSlideDuration(slide: Omit<Slide, 'durationInFrames' | 'startFrame'>): number {
  switch (slide.type) {
    case 'title':
      return TITLE_FRAMES;
    case 'content':
      return CONTENT_BASE_FRAMES + slide.bullets.length * FRAMES_PER_BULLET;
    case 'stat':
      return STAT_FRAMES;
    case 'closing':
      return CLOSING_FRAMES;
  }
}

export function assignTimings<T extends Omit<Slide, 'durationInFrames' | 'startFrame'>>(
  slides: T[],
): Slide[] {
  let currentFrame = 0;
  return slides.map((slide) => {
    const durationInFrames = calculateSlideDuration(slide as any);
    const startFrame = currentFrame;
    currentFrame += durationInFrames - TRANSITION_FRAMES;
    return {...slide, durationInFrames, startFrame} as Slide;
  });
}

export function calculateTotalDuration(slides: Slide[]): number {
  if (slides.length === 0) return 0;
  const last = slides[slides.length - 1];
  return last.startFrame + last.durationInFrames;
}
