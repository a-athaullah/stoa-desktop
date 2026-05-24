const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('get-config'),
  saveConfig: (config) => ipcRenderer.invoke('save-config', config),
  loadUrl: (url) => ipcRenderer.invoke('load-url', url),
  checkServer: (url) => ipcRenderer.invoke('check-server', url),
});
