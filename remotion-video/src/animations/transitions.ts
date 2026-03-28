import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TRANSITION_FRAMES} from '../lib/theme';

export function useFade(transitionFrames: number = TRANSITION_FRAMES) {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const fadeIn = interpolate(frame, [0, transitionFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - transitionFrames, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp'},
  );

  return Math.min(fadeIn, fadeOut);
}

export function useSlideIn(
  direction: 'left' | 'right' | 'up' | 'down',
  delay: number = 0,
) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {damping: 14, mass: 0.6, stiffness: 120},
  });

  const offsetMap = {
    left: [-60, 0],
    right: [60, 0],
    up: [0, -50],
    down: [0, 50],
  };

  const [offsetX, offsetY] = offsetMap[direction];

  const translateX = interpolate(progress, [0, 1], [offsetX, 0]);
  const translateY = interpolate(progress, [0, 1], [offsetY, 0]);

  return {
    transform: `translate(${translateX}px, ${translateY}px)`,
    opacity: interpolate(progress, [0, 1], [0, 1]),
  };
}

export function useScaleEntrance(delay: number = 0) {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {damping: 10, mass: 0.5, stiffness: 100},
  });

  return {
    transform: `scale(${interpolate(progress, [0, 1], [0.85, 1])})`,
    opacity: interpolate(progress, [0, 1], [0, 1]),
  };
}

export function staggerDelay(index: number, framesPerItem: number = 8): number {
  return index * framesPerItem;
}
