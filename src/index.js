const {app, BrowserWindow} = require('electron');
const ArgumentParser = require("argparse").ArgumentParser;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

let args;
let parser = new ArgumentParser({
	version: require("../package").version,
	addHelp: true,
	description: require("../package").description,
	prog: require("../package.json").name
});

parser.addArgument(
	['-d', '--debug'],
	{help: 'Active le mode debug.', defaultValue: false, action: "storeTrue"}
);

let arg = process.argv.slice(1);
if (process.argv.join(" ").indexOf("electron.exe") > -1) {
	arg = process.argv.slice(2);
}

try {
	args = parser.parseKnownArgs(arg);
} catch (e) {
	app.quit();
}

let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1450,
		height: 900,
	});
	
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	if (args.debug) {
		mainWindow.webContents.openDevTools({mode: "detach"});
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