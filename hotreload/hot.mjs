import { watch } from 'fs';
import { spawn } from 'child_process';
import { ipcMain } from 'electron';
import psList from 'ps-list';

let childProcess = null;
let reloadTimeout = null;
let watcher = null; 

export async function startHotReload(mainFile) {
  console.log('🔥 Hot reload active');
  

  if (watcher) {
    watcher.close();
    watcher = null;
  }

  await launchProcess();

 
  watcher = watch(process.cwd(), { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.mjs')) {
      clearTimeout(reloadTimeout);
      reloadTimeout = setTimeout(() => {
        console.log('🔄 Reloading main process...');
        if (childProcess) {
          childProcess.kill('SIGTERM');
          childProcess = null;
        }
        launchProcess();
      }, 100);
    }
  });

  async function launchProcess() {
    const processes = await psList();
    const electronProcess = processes.find(p => p.name === 'electron');
   
    
    
    console.log('🚀 Launching main process...');
    childProcess = spawn('electron', [mainFile], {
      stdio: 'inherit',
      env: { ...process.env, ELECTRON_HOT_RELOAD: 'true' }
      
    });
    console.log('🚀 Main process PID:');
    console.log(childProcess);
  }
}

ipcMain.on('renderer-reload', (event) => {
  event.sender.reload();
});