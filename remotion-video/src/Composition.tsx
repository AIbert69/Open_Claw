import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames, width, height} = useVideoConfig();

  const opacity = Math.min(1, frame / 30);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 100,
        backgroundColor: 'white',
      }}
    >
      <div style={{opacity}}>
        Hello World!
      </div>
    </AbsoluteFill>
  );
};
