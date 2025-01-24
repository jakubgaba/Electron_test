import { contextBridge, ipcRenderer } from 'electron';

// console.log("✅ Preload script is executing!");

// Expose API to Renderer
contextBridge.exposeInMainWorld('electronAPI', {
    
    test: () => {
        console.log("✅ Preload function was called from renderer!");
        ipcRenderer.send('preload-check', "✅ Preload function is working correctly!");
    }
});
