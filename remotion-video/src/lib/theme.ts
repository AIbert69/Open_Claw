export const COLORS = {
  // Light professional background
  bg: '#f5f7fa',
  bgCard: '#ffffff',
  bgSubtle: '#eef1f6',

  // Dark text
  textPrimary: '#1a1a2e',
  textSecondary: '#4a4a68',
  textMuted: '#8888a0',

  // Accent — industrial blue-teal (Singh Automation feel)
  accent: '#0077b6',
  accentLight: '#00b4d8',
  accentDark: '#005f8a',

  // Supporting
  success: '#2a9d8f',
  warning: '#e9c46a',
  danger: '#e63946',
  border: '#d8dde6',
  white: '#ffffff',
} as const;

export const FONTS = {
  primary: "'Segoe UI', system-ui, -apple-system, sans-serif",
} as const;

export const LAYOUT = {
  width: 1920,
  height: 1080,
  padding: 120,
} as const;

export const FPS = 30;
export const TRANSITION_FRAMES = 15;
