import {app, BrowserWindow, screen} from 'electron'
import path from 'path'
import { fileURLToPath } from 'url';

//Doing this shit just because ESMODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow () {
    const displays = screen.getAllDisplays()
    const builtInDisplay = chooseBuiltInDisplay(displays)
  const win = new BrowserWindow({
    width: builtInDisplay.bounds.width,
    height: builtInDisplay.bounds.height,
    transparent: true,
    titleBarOverlay: false,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    movable: false,
    resizable: false,
    frame: true,
    webPreferences: {
        preload: path.join(__dirname, './src/preload.js')
    }
  })
  win.setIgnoreMouseEvents(true, {forward: true})
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function chooseBuiltInDisplay(displays){
    return displays.find(display => display.label === 'Built-in display') || displays[0];
}