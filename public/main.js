const electron = require('electron');
const app = electron.app;
const path = require('path');
const isDev = require('electron-is-dev');
const BrowserWindow = electron.BrowserWindow;

const isDevMode = process.execPath.match(/[\\/]electron/)

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680,
    webPreferences: { // <--- (1) Additional preferences
      nodeIntegration: false,
      contextIsolation: false,
      preload: __dirname + '/preload.js' // <--- (2) Preload script
  }
  });
  mainWindow.loadURL(isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, `../dist/index.html`)}`);
  app.setAboutPanelOptions({
    applicationName: "Mook",
    applicationVersion: "0.0.1",
  })
  mainWindow.on('closed', () => mainWindow = null);

  mainWindow.webContents.openDevTools();
}
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});