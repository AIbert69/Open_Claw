const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectImage: () => ipcRenderer.invoke('select-image'),
  selectOutput: () => ipcRenderer.invoke('select-output'),
  getPresets: () => ipcRenderer.invoke('get-presets'),
  render: (opts) => ipcRenderer.invoke('render', opts),
  vary: (opts) => ipcRenderer.invoke('vary', opts),
  closeup: (opts) => ipcRenderer.invoke('closeup', opts),
});
