// --- Input types (what the user provides) ---

export interface DocumentInput {
  title: string;
  subtitle?: string;
  author?: string;
  sections: SectionInput[];
  closingText?: string;
}

export interface SectionInput {
  heading: string;
  bullets?: string[];
  stat?: { value: string; label: string };
  body?: string;
}

// --- Normalized slide types (what the renderer consumes) ---

export type SlideType = 'title' | 'content' | 'stat' | 'closing';

export interface BaseSlide {
  type: SlideType;
  durationInFrames: number;
  startFrame: number;
}

export interface TitleSlide extends BaseSlide {
  type: 'title';
  title: string;
  subtitle?: string;
  author?: string;
}

export interface ContentSlide extends BaseSlide {
  type: 'content';
  heading: string;
  bullets: string[];
}

export interface StatSlide extends BaseSlide {
  type: 'stat';
  heading: string;
  value: string;
  label: string;
}

export interface ClosingSlide extends BaseSlide {
  type: 'closing';
  text: string;
}

export type Slide = TitleSlide | ContentSlide | StatSlide | ClosingSlide;
