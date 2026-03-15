import {
  BLOCK_A,
  BLOCK_F,
  NO_PEOPLE,
  VARIATION_TEMPLATE,
  CLOSEUP_PROMPT,
  PRESET_MAPS,
} from './blocks.js';

const AXIS_LABELS = {
  materials: 'materials and finishes',
  landscape: 'landscape and vegetation',
  lighting: 'lighting and atmosphere',
};

/**
 * Assemble a full render prompt from blocks A-F.
 */
export function assembleRenderPrompt({ description, materials, landscape, lighting }) {
  return [
    BLOCK_A,
    description,
    materials,
    landscape,
    lighting,
    BLOCK_F,
    NO_PEOPLE,
  ].join('\n\n');
}

/**
 * Assemble a variation prompt that changes a single axis.
 */
export function assembleVaryPrompt({ axis, description }) {
  const otherAxes = Object.keys(AXIS_LABELS)
    .filter((a) => a !== axis)
    .map((a) => AXIS_LABELS[a])
    .join(' and ');

  return VARIATION_TEMPLATE
    .replace('{{otherAxes}}', otherAxes)
    .replace('{{axis}}', AXIS_LABELS[axis])
    .replace('{{description}}', description);
}

/**
 * Return the fixed close-up prompt.
 */
export function getCloseupPrompt() {
  return CLOSEUP_PROMPT + ' ' + NO_PEOPLE;
}

/**
 * Resolve a preset name to its description text.
 * If the value isn't a known preset name, treat it as custom description text.
 */
export function resolvePreset(axis, value) {
  const map = PRESET_MAPS[axis];
  if (!map) throw new Error(`Unknown axis: ${axis}`);
  return map[value] || value;
}
