import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let mainWindow: BrowserWindow | null = null;


function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1400,
        height: 900,

        minWidth: 1200,
        minHeight: 700,

        webPreferences: {

            preload: path.join(
                __dirname,
                "preload.js"
            ),

            contextIsolation: true,
            nodeIntegration: false

        }

    });


    if (process.env.NODE_ENV === "development") {

        mainWindow.loadURL(
            "http://localhost:5173"
        );

    } else {

        const indexPath = path.join(
            app.getAppPath(),
            "dist",
            "index.html"
        );


        console.log(
            "AppPath:",
            app.getAppPath()
        );


        console.log(
            "Cargando archivo:",
            indexPath
        );


        mainWindow.loadFile(indexPath);

    }

    mainWindow.webContents.openDevTools();

    mainWindow.webContents.on(
        "did-fail-load",
        (_, errorCode, errorDescription) => {

            console.error(
                "ERROR:",
                errorCode,
                errorDescription
            );

        }
    );

}


app.whenReady()
    .then(() => {

        createWindow();

    });