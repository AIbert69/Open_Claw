import fs from 'node:fs';
import path from 'node:path';
import { DEFAULTS, PRESET_MAPS } from '../blocks.js';
import { assembleRenderPrompt, resolvePreset } from '../prompt.js';
import { generateRender } from '../gemini.js';

export function registerRenderCommand(program) {
  program
    .command('render')
    .description('Generate a photorealistic render from a SketchUp screenshot')
    .requiredOption('-i, --image <path>', 'Path to SketchUp screenshot')
    .requiredOption('-d, --description <text>', 'Building description (Block B) — text or path to .txt file')
    .option('-m, --materials <preset>', 'Materials preset name or custom text', DEFAULTS.materials)
    .option('-l, --landscape <preset>', 'Landscape preset name or custom text', DEFAULTS.landscape)
    .option('-L, --lighting <preset>', 'Lighting preset name or custom text', DEFAULTS.lighting)
    .option('-o, --output <path>', 'Output file path')
    .option('--model <type>', '"quality" or "fast"', 'quality')
    .option('--top-p <number>', 'Top-P sampling value (0.0-1.0)', parseFloat, 0.4)
    .action(async (opts) => {
      // Validate input image
      if (!fs.existsSync(opts.image)) {
        console.error(`Error: Image file not found: ${opts.image}`);
        process.exit(1);
      }

      // Read description from file if it's a .txt path
      let description = opts.description;
      if (description.endsWith('.txt') && fs.existsSync(description)) {
        description = fs.readFileSync(description, 'utf-8').trim();
      }

      // Resolve presets
      const materials = resolvePreset('materials', opts.materials);
      const landscape = resolvePreset('landscape', opts.landscape);
      const lighting = resolvePreset('lighting', opts.lighting);

      // Assemble prompt
      const prompt = assembleRenderPrompt({ description, materials, landscape, lighting });

      // Default output path
      const outputPath = opts.output || path.join('output', `render-${Date.now()}.png`);

      console.log('Assembled prompt:');
      console.log('---');
      console.log(prompt);
      console.log('---');

      const result = await generateRender({
        imagePath: opts.image,
        prompt,
        outputPath,
        model: opts.model,
        topP: opts.topP,
      });

      console.log(`Render saved to: ${result}`);
    });
}
