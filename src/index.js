import {app, BrowserWindow} from 'electron';
const {ArgumentParser} = require("argparse");

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let parser = new ArgumentParser({
    version: require("../package").version,
    addHelp: true,
    description: require("../package").description
});

parser.addArgument(
    ['-d', '--debug'],
    {help: 'Active le mode debug.', defaultValue: false, action: "storeTrue"}
);

let args = parser.parseArgs();
let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1450,
        height: 900,
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    if (args.get("debug")) {
        mainWindow.webContents.openDevTools();
    }

    global.args = args;

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

// Quit when all windows are closed.
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