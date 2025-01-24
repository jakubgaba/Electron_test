import { app, BrowserWindow, screen, ipcMain} from 'electron'
import path from 'path'
import { fileURLToPath } from 'url';
import { startHotReload } from './hotreload/hot.mjs';


//Doing this shit just because ESMODULES
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const preloadPath = path.join(__dirname, './src/preload.mjs');

if (!process.env.ELECTRON_HOT_RELOAD) {
  console.log("🚀 ELECTRON_HOT_RELOAD ACTIVE")
  startHotReload(__filename);
}
function createWindow() {
  const displays = screen.getAllDisplays()
  const builtInDisplay = chooseBuiltInDisplay(displays)
  const win = new BrowserWindow({
    width: builtInDisplay.bounds.width,
    height: builtInDisplay.bounds.height,
    x: builtInDisplay.bounds.x,
    y: builtInDisplay.bounds.y,
    transparent: true,
    titleBarOverlay: false,
    // titleBarStyle: 'hidden',
    alwaysOnTop: true,
    movable: false,
    resizable: false,
    frame: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      sandbox: false
    }
  })
  // win.setIgnoreMouseEvents(true, { forward: true })
  win.loadFile('index.html')

}

app.whenReady().then(() => {
  createWindow()
  console.log("🚀 Electron app is ready");
})
ipcMain.on('preload-loaded', (event, message) => {
  // console.log(`🟢 [MAIN PROCESS] Message from preload.js: ${message}`);
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function chooseBuiltInDisplay(displays) {
  return displays.find(display => display.label === 'Built-in display') || displays[0];
}