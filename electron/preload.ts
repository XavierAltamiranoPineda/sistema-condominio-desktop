// El preload debe usar CommonJS (require), NO import ESM.
// Electron lo carga en un contexto sandboxed que no admite ESM.
const { contextBridge } = require("electron");


contextBridge.exposeInMainWorld(
    "electronAPI",
    {
        version: process.versions.electron
    }
);
