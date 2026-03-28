import {DocumentInput, Slide} from '../types/slides';
import {assignTimings} from './calculateDuration';

const MAX_BULLETS_PER_SLIDE = 5;

export function parseDocument(input: DocumentInput): Slide[] {
  const rawSlides: Array<Omit<Slide, 'durationInFrames' | 'startFrame'>> = [];

  // Title slide
  rawSlides.push({
    type: 'title',
    title: input.title,
    subtitle: input.subtitle,
    author: input.author,
  });

  // Section slides
  for (const section of input.sections) {
    if (section.stat) {
      rawSlides.push({
        type: 'stat',
        heading: section.heading,
        value: section.stat.value,
        label: section.stat.label,
      });
    } else if (section.bullets && section.bullets.length > 0) {
      // Split into multiple slides if too many bullets
      const chunks = chunkArray(section.bullets, MAX_BULLETS_PER_SLIDE);
      chunks.forEach((chunk, i) => {
        rawSlides.push({
          type: 'content',
          heading: chunks.length > 1 ? `${section.heading} (${i + 1}/${chunks.length})` : section.heading,
          bullets: chunk,
        });
      });
    } else if (section.body) {
      rawSlides.push({
        type: 'content',
        heading: section.heading,
        bullets: [section.body],
      });
    }
  }

  // Closing slide
  rawSlides.push({
    type: 'closing',
    text: input.closingText || 'Thank You',
  });

  return assignTimings(rawSlides);
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
