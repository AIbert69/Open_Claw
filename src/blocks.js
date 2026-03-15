// Block A — Structure Lock (fixed, always first)
export const BLOCK_A =
  'Ultra-realistic exterior photograph taken with a full-frame DSLR camera, rigorously preserving the entire geometry of the provided SketchUp model. Maintain EXACTLY the same volumetry, proportions and openings. Zero structural changes.';

// Block F — Camera & Realism (fixed, always last)
export const BLOCK_F =
  'Camera: 35 mm lens, f/8, ISO 100, 1/400 s — sharp focus, realistic depth, natural contrast, slight chromatic aberration at edges, subtle grain and slightly warm white balance (5400K). The image must look like a real photograph, natural ambient depth, and zero CGI appearance. It must be perceived as a real photograph captured by a professional camera, not a render, captured in a luxury gated community, preserving 100% of the original architectural volumes. Add subtle vignette. 8K details.';

// Block C — Materials & Finishes presets
export const MATERIAL_PRESETS = {
  'white-concrete-wood':
    'Smooth white plaster on the upper volume, exposed concrete with visible pores on the ground floor, warm vertical wood panels with satin finish, clear glass with minimal black aluminum frames, white ceramic lattice accents.',
  'dark-concrete-corten':
    'Dark gray exposed concrete, corten steel panels with natural rust patina, dark cumaru wood horizontal slats, clear glass with bronze aluminum frames.',
  'natural-stone-champagne':
    'Beige porcelain panels, calcite natural stone base, freijó wood vertical slats with matte finish, clear glass with champagne aluminum frames.',
  'brick-terracotta':
    'Exposed brick walls, light concrete structural elements, ipê wood panels with satin finish, clear glass with matte black aluminum frames.',
};

// Block D — Landscape presets
export const LANDSCAPE_PRESETS = {
  'tropical-brazilian':
    'Manicured lawn, hero spreading tree casting shadows on the facade, low rounded shrubs, concrete stepping stones, realistic asphalt street with lane markings.',
  'tropical-resort':
    'Tall palms, ornamental grasses, flowering plants in purple and lilac tones, dense tropical vegetation framing the building.',
  'mediterranean':
    'White rolled stone ground cover, olive trees, lavender borders, agaves, irregular natural stone path.',
  'minimal-sculptural':
    'Perfect geometric lawn, single dramatic tree, no shrubs, monolithic concrete path.',
};

// Block E — Lighting presets
export const LIGHTING_PRESETS = {
  'midday-harsh':
    'Strong midday sun, hard direct light, short precise shadows, intense blue sky, subtle cirrus clouds, no haze.',
  'golden-hour':
    'Low 5PM sun, warm golden light, long soft shadows, orange-to-blue sky gradient, 4200K color temperature.',
  'overcast':
    'Uniform overcast sky, diffuse shadowless light, no marked shadows, neutral tones, 5800K color temperature.',
  'blue-hour':
    'Deep blue twilight, interior lights glowing warm, warm-cool contrast, blue-indigo sky, landscape accent spotlights.',
};

// Variation prompt template
export const VARIATION_TEMPLATE =
  'Keep the architectural structure of the scene unchanged. Keep all {{otherAxes}} identical. Change only the {{axis}} to: {{description}}. Maintain photographic realism. No people in the scene.';

// Close-up prompt (fixed)
export const CLOSEUP_PROMPT =
  'Create four professional close-ups highlighting the main details of this image (do not prioritize the cars). Use depth of field to blur the background, add bokeh effect and keep only the important elements in focus. Be faithful to the elements of the scene, do not alter anything and do not create anything that does not exist in the scene.';

// Suffix appended to every render prompt
export const NO_PEOPLE = 'No people in the scene.';

// All preset maps keyed by axis name
export const PRESET_MAPS = {
  materials: MATERIAL_PRESETS,
  landscape: LANDSCAPE_PRESETS,
  lighting: LIGHTING_PRESETS,
};

// Default preset per axis
export const DEFAULTS = {
  materials: 'white-concrete-wood',
  landscape: 'tropical-brazilian',
  lighting: 'midday-harsh',
};
