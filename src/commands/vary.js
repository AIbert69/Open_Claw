import fs from 'node:fs';
import path from 'node:path';
import { assembleVaryPrompt, resolvePreset } from '../prompt.js';
import { generateRender } from '../gemini.js';

const VALID_AXES = ['materials', 'landscape', 'lighting'];

export function registerVaryCommand(program) {
  program
    .command('vary')
    .description('Generate a single-axis variation from a previous render')
    .requiredOption('-i, --image <path>', 'Path to previous render (not SketchUp)')
    .requiredOption('-a, --axis <axis>', 'Axis to change: materials, landscape, or lighting')
    .requiredOption('-p, --preset <value>', 'Preset name or custom description text')
    .option('-o, --output <path>', 'Output file path')
    .option('--model <type>', '"quality" or "fast"', 'quality')
    .option('--top-p <number>', 'Top-P sampling value (0.0-1.0)', parseFloat, 0.4)
    .action(async (opts) => {
      if (!fs.existsSync(opts.image)) {
        console.error(`Error: Image file not found: ${opts.image}`);
        process.exit(1);
      }

      if (!VALID_AXES.includes(opts.axis)) {
        console.error(`Error: Invalid axis "${opts.axis}". Must be one of: ${VALID_AXES.join(', ')}`);
        process.exit(1);
      }

      // Resolve preset to description text
      const description = resolvePreset(opts.axis, opts.preset);

      // Assemble variation prompt
      const prompt = assembleVaryPrompt({ axis: opts.axis, description });

      const outputPath = opts.output || path.join('output', `vary-${opts.axis}-${Date.now()}.png`);

      console.log('Variation prompt:');
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

      console.log(`Variation saved to: ${result}`);
    });
}
