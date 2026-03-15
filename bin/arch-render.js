#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { registerRenderCommand } from '../src/commands/render.js';
import { registerVaryCommand } from '../src/commands/vary.js';
import { registerCloseupCommand } from '../src/commands/closeup.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

program
  .name('arch-render')
  .description('Generate photorealistic architectural renders from SketchUp screenshots')
  .version(pkg.version);

registerRenderCommand(program);
registerVaryCommand(program);
registerCloseupCommand(program);

program.parseAsync(process.argv).catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
