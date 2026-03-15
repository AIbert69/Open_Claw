import { GoogleGenAI } from '@google/genai';
import fs from 'node:fs';
import path from 'node:path';

const MODEL_MAP = {
  quality: 'gemini-3-pro-image-preview',
  fast: 'gemini-3.1-flash-image-preview',
};

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set.');
  }
  return new GoogleGenAI({ apiKey });
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext];
  if (!mime) {
    throw new Error(`Unsupported image format: ${ext}. Use .png, .jpg, or .webp`);
  }
  return mime;
}

/**
 * Send an image + prompt to Gemini and save the rendered result.
 *
 * @param {object} opts
 * @param {string} opts.imagePath - Path to the input image
 * @param {string} opts.prompt - Assembled text prompt
 * @param {string} opts.outputPath - Where to write the output image
 * @param {string} opts.model - "quality" or "fast"
 * @param {number} opts.topP - Top-P sampling value
 * @returns {Promise<string>} The output file path
 */
export async function generateRender({ imagePath, prompt, outputPath, model = 'quality', topP = 0.4 }) {
  const ai = getClient();
  const modelId = MODEL_MAP[model];
  if (!modelId) {
    throw new Error(`Unknown model "${model}". Use "quality" or "fast".`);
  }

  // Read and encode the input image
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');
  const mimeType = getMimeType(imagePath);

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };

  console.log(`Sending to ${modelId} (topP=${topP})...`);

  const response = await ai.models.generateContent({
    model: modelId,
    contents: [imagePart, prompt],
    config: {
      responseModalities: ['IMAGE'],
      topP,
    },
  });

  // Extract the generated image from the response
  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error('No response candidates returned from Gemini.');
  }

  const parts = candidates[0].content.parts;
  for (const part of parts) {
    if (part.inlineData) {
      const buffer = Buffer.from(part.inlineData.data, 'base64');
      // Ensure output directory exists
      const outDir = path.dirname(outputPath);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outputPath, buffer);
      return outputPath;
    }
  }

  throw new Error('No image data in Gemini response. The model may have returned only text.');
}
