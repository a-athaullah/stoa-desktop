const { app, BrowserWindow, ipcMain, Menu, net } = require('electron');
const path = require('path');
const fs = require('fs');

const CONFIG_PATH = path.join(app.getPath('userData'), 'config.json');

function readConfig() {
  try { return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); }
  catch { return {}; }
}

function writeConfig(data) {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2));
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    title: 'Stoa',
    icon: path.join(__dirname, 'assets', 'stoa-icon.png'),
    show: false,
  });

  const config = readConfig();
  if (config.baseUrl) {
    mainWindow.loadURL(config.baseUrl);
  } else {
    mainWindow.loadFile('setup.html');
  }

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('page-title-updated', (e) => {
    // Keep "Stoa" in title
    e.preventDefault();
  });

  buildMenu();
}

function buildMenu() {
  const template = [
    {
      label: 'Stoa',
      submenu: [
        {
          label: 'Change Server',
          accelerator: 'CmdOrCtrl+Shift+,',
          click: () => mainWindow.loadFile('setup.html'),
        },
        { type: 'separator' },
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.reload(),
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
        { role: 'selectAll' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

ipcMain.handle('get-config', () => readConfig());

ipcMain.handle('save-config', (_, config) => {
  writeConfig(config);
});

ipcMain.handle('load-url', (_, url) => {
  mainWindow.loadURL(url);
});

ipcMain.handle('check-server', async (_, url) => {
  return new Promise((resolve) => {
    let done = false;
    const finish = (result) => { if (!done) { done = true; resolve(result); } };

    const timer = setTimeout(() => finish({ ok: false, error: 'Connection timed out' }), 5000);

    const request = net.request(`${url.replace(/\/$/, '')}/api/setup/status`);
    request.on('response', (response) => {
      clearTimeout(timer);
      response.on('data', () => {});
      response.on('end', () => finish({ ok: response.statusCode < 500, status: response.statusCode }));
    });
    request.on('error', (err) => {
      clearTimeout(timer);
      finish({ ok: false, error: err.message });
    });
    request.end();
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
