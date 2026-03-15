// ── State ──

let currentMode = 'render';
let selectedImagePath = null;

// ── DOM refs ──

const modeTabs = document.querySelectorAll('.mode-tab');
const modeControls = {
  render: document.getElementById('controls-render'),
  vary: document.getElementById('controls-vary'),
  closeup: document.getElementById('controls-closeup'),
};

const btnSelectImage = document.getElementById('btn-select-image');
const imageName = document.getElementById('image-name');
const btnGenerate = document.getElementById('btn-generate');

const canvasEmpty = document.getElementById('canvas-empty');
const canvasLoading = document.getElementById('canvas-loading');
const canvasResult = document.getElementById('canvas-result');
const canvasError = document.getElementById('canvas-error');
const resultImage = document.getElementById('result-image');
const resultPath = document.getElementById('result-path');
const btnUseAsSource = document.getElementById('btn-use-as-source');
const errorMessage = document.getElementById('error-message');

const topPSlider = document.getElementById('top-p');
const topPValue = document.getElementById('top-p-value');
const modelSelect = document.getElementById('model-select');

// Render controls
const descriptionInput = document.getElementById('description');
const materialsSelect = document.getElementById('materials');
const landscapeSelect = document.getElementById('landscape');
const lightingSelect = document.getElementById('lighting');

// Vary controls
const varyAxis = document.getElementById('vary-axis');
const varyPreset = document.getElementById('vary-preset');
const varyCustom = document.getElementById('vary-custom');

// ── Init ──

async function init() {
  const presets = await window.api.getPresets();

  populateSelect(materialsSelect, presets.materials, presets.defaults.materials);
  populateSelect(landscapeSelect, presets.landscape, presets.defaults.landscape);
  populateSelect(lightingSelect, presets.lighting, presets.defaults.lighting);

  // Vary preset dropdown updates when axis changes
  updateVaryPresets(presets);
  varyAxis.addEventListener('change', () => updateVaryPresets(presets));
}

function populateSelect(selectEl, options, defaultVal) {
  selectEl.innerHTML = '';
  for (const opt of options) {
    const el = document.createElement('option');
    el.value = opt;
    el.textContent = formatPresetName(opt);
    if (opt === defaultVal) el.selected = true;
    selectEl.appendChild(el);
  }
}

function updateVaryPresets(presets) {
  const axis = varyAxis.value;
  const options = presets[axis] || [];
  varyPreset.innerHTML = '';

  const customOpt = document.createElement('option');
  customOpt.value = '__custom__';
  customOpt.textContent = '— Custom —';
  varyPreset.appendChild(customOpt);

  for (const opt of options) {
    const el = document.createElement('option');
    el.value = opt;
    el.textContent = formatPresetName(opt);
    varyPreset.appendChild(el);
  }

  // Default to first real preset
  if (options.length > 0) {
    varyPreset.value = options[0];
  }

  varyCustom.disabled = varyPreset.value !== '__custom__';
}

function formatPresetName(name) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Mode switching ──

modeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    modeTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = tab.dataset.mode;

    Object.values(modeControls).forEach((c) => c.classList.add('hidden'));
    modeControls[currentMode].classList.remove('hidden');
  });
});

// ── Image selection ──

btnSelectImage.addEventListener('click', async () => {
  const filePath = await window.api.selectImage();
  if (filePath) {
    selectedImagePath = filePath;
    imageName.textContent = filePath.split(/[/\\]/).pop();
  }
});

// ── Top-P slider ──

topPSlider.addEventListener('input', () => {
  topPValue.textContent = parseFloat(topPSlider.value).toFixed(2);
});

// ── Vary preset/custom toggle ──

varyPreset.addEventListener('change', () => {
  varyCustom.disabled = varyPreset.value !== '__custom__';
  if (varyPreset.value !== '__custom__') {
    varyCustom.value = '';
  }
});

// ── Use result as new source ──

btnUseAsSource.addEventListener('click', () => {
  if (resultPath.dataset.path) {
    selectedImagePath = resultPath.dataset.path;
    imageName.textContent = resultPath.dataset.path.split(/[/\\]/).pop();
  }
});

// ── Generate ──

btnGenerate.addEventListener('click', async () => {
  if (!selectedImagePath) {
    showError('Please select a source image first.');
    return;
  }

  showLoading();
  btnGenerate.disabled = true;

  try {
    let outputPath;

    if (currentMode === 'render') {
      const desc = descriptionInput.value.trim();
      if (!desc) {
        showError('Please enter a building description.');
        btnGenerate.disabled = false;
        return;
      }

      outputPath = await window.api.render({
        imagePath: selectedImagePath,
        description: desc,
        materials: materialsSelect.value,
        landscape: landscapeSelect.value,
        lighting: lightingSelect.value,
        model: modelSelect.value,
        topP: parseFloat(topPSlider.value),
      });
    } else if (currentMode === 'vary') {
      const preset =
        varyPreset.value === '__custom__' ? varyCustom.value.trim() : varyPreset.value;

      if (!preset) {
        showError('Please select a preset or enter a custom description.');
        btnGenerate.disabled = false;
        return;
      }

      outputPath = await window.api.vary({
        imagePath: selectedImagePath,
        axis: varyAxis.value,
        preset,
        model: modelSelect.value,
        topP: parseFloat(topPSlider.value),
      });
    } else if (currentMode === 'closeup') {
      outputPath = await window.api.closeup({
        imagePath: selectedImagePath,
        model: modelSelect.value,
        topP: parseFloat(topPSlider.value),
      });
    }

    showResult(outputPath);
  } catch (err) {
    showError(err.message || 'Generation failed.');
  } finally {
    btnGenerate.disabled = false;
  }
});

// ── View state helpers ──

function showLoading() {
  canvasEmpty.classList.add('hidden');
  canvasResult.classList.add('hidden');
  canvasError.classList.add('hidden');
  canvasLoading.classList.remove('hidden');
}

function showResult(filePath) {
  canvasLoading.classList.add('hidden');
  canvasEmpty.classList.add('hidden');
  canvasError.classList.add('hidden');
  canvasResult.classList.remove('hidden');

  // Add cache-busting query to force reload
  resultImage.src = `file://${filePath}?t=${Date.now()}`;
  resultPath.textContent = filePath.split(/[/\\]/).pop();
  resultPath.dataset.path = filePath;
}

function showError(msg) {
  canvasLoading.classList.add('hidden');
  canvasEmpty.classList.add('hidden');
  canvasResult.classList.add('hidden');
  canvasError.classList.remove('hidden');
  errorMessage.textContent = msg;
}

// ── Boot ──

init();
