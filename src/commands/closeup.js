import fs from 'node:fs';
import path from 'node:path';
import { getCloseupPrompt } from '../prompt.js';
import { generateRender } from '../gemini.js';

export function registerCloseupCommand(program) {
  program
    .command('closeup')
    .description('Generate detail close-ups from an approved render')
    .requiredOption('-i, --image <path>', 'Path to approved render')
    .option('-o, --output <path>', 'Output file path')
    .option('--model <type>', '"quality" or "fast"', 'quality')
    .option('--top-p <number>', 'Top-P sampling value (0.0-1.0)', parseFloat, 0.4)
    .action(async (opts) => {
      if (!fs.existsSync(opts.image)) {
        console.error(`Error: Image file not found: ${opts.image}`);
        process.exit(1);
      }

      const prompt = getCloseupPrompt();
      const outputPath = opts.output || path.join('output', `closeup-${Date.now()}.png`);

      console.log('Close-up prompt:');
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

      console.log(`Close-up saved to: ${result}`);
    });
}
