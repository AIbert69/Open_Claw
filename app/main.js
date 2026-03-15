import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateRender } from '../src/gemini.js';
import { assembleRenderPrompt, assembleVaryPrompt, getCloseupPrompt, resolvePreset } from '../src/prompt.js';
import { MATERIAL_PRESETS, LANDSCAPE_PRESETS, LIGHTING_PRESETS, DEFAULTS } from '../src/blocks.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: 'Render Pipeline',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

// ── IPC Handlers ──

ipcMain.handle('select-image', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'webp'] }],
    properties: ['openFile'],
  });
  return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('select-output', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Render',
    defaultPath: `render-${Date.now()}.png`,
    filters: [{ name: 'PNG Image', extensions: ['png'] }],
  });
  return result.canceled ? null : result.filePath;
});

ipcMain.handle('get-presets', () => ({
  materials: Object.keys(MATERIAL_PRESETS),
  landscape: Object.keys(LANDSCAPE_PRESETS),
  lighting: Object.keys(LIGHTING_PRESETS),
  defaults: DEFAULTS,
}));

ipcMain.handle('render', async (_event, opts) => {
  const materials = resolvePreset('materials', opts.materials);
  const landscape = resolvePreset('landscape', opts.landscape);
  const lighting = resolvePreset('lighting', opts.lighting);

  const prompt = assembleRenderPrompt({
    description: opts.description,
    materials,
    landscape,
    lighting,
  });

  const outputPath = opts.outputPath || path.join(app.getPath('desktop'), `render-${Date.now()}.png`);

  const result = await generateRender({
    imagePath: opts.imagePath,
    prompt,
    outputPath,
    model: opts.model || 'quality',
    topP: opts.topP ?? 0.4,
  });

  return result;
});

ipcMain.handle('vary', async (_event, opts) => {
  const description = resolvePreset(opts.axis, opts.preset);

  const prompt = assembleVaryPrompt({ axis: opts.axis, description });

  const outputPath = opts.outputPath || path.join(app.getPath('desktop'), `vary-${opts.axis}-${Date.now()}.png`);

  const result = await generateRender({
    imagePath: opts.imagePath,
    prompt,
    outputPath,
    model: opts.model || 'quality',
    topP: opts.topP ?? 0.4,
  });

  return result;
});

ipcMain.handle('closeup', async (_event, opts) => {
  const prompt = getCloseupPrompt();

  const outputPath = opts.outputPath || path.join(app.getPath('desktop'), `closeup-${Date.now()}.png`);

  const result = await generateRender({
    imagePath: opts.imagePath,
    prompt,
    outputPath,
    model: opts.model || 'quality',
    topP: opts.topP ?? 0.4,
  });

  return result;
});
