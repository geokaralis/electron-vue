const {app, BrowserWindow} = require('electron');
const path = require('path');
const isDevMode = require('electron-is-dev');

// const isDevMode = process.execPath.match(/[\\/]electron/)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900, 
    height: 680,
    transparent: true,
    frame: false,
    titleBarStyle: 'hidden',
    vibrancy: 'ultra-dark',
    webPreferences: { // <--- (1) Additional preferences
      nodeIntegration: false,
      contextIsolation: false,
      preload: __dirname + '/preload.js' // <--- (2) Preload script
    }
  });

  // if (!isDev) {
  //   const {session} = require('electron')
  //   session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //     callback({responseHeaders: `default-src http: ws:`})
  //   })
  // }
  mainWindow.loadURL(isDevMode ? 'http://localhost:8080' : `file://${path.join(__dirname, `../dist/index.html`)}`);

  app.setAboutPanelOptions({
    applicationName: "Electron Vue",
    applicationVersion: "0.0.1",
  })
  mainWindow.on('closed', () => mainWindow = null);

  if(isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  
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