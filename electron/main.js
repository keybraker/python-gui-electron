// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const exec = require('child_process').exec;
const path = require('path')

var nodeConsole = require('console');
var my_console = new nodeConsole.Console(process.stdout, process.stderr);
var child;

function print_both(str) {
    console.log('main.js:    ' + str);
    my_console.log('main.js:    ' + str);
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 620,
        height: 500,
        resizable: true,
        webPreferences: {
            preload: path.join(__dirname, 'gui_example.js'),
            contextIsolation: true
                // nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./electron/gui_example.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('execute', (command) => {
    console.log('executing ls');
    child = exec("ls", function(error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});

ipcMain.on('open_json_file', () => {
    var fs = require('fs');
    var fileName = './config.json';
    var file = require(fileName);

    // Asynchronous read
    // fs.readFile('config.json', function (err, data) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log("Asynchronous read: " + data.toString());
    // });

    // Synchronous read
    var data = fs.readFileSync(fileName);
    var json = JSON.parse(data);

    print_both('Called through ipc.send from gui_example.js');
    print_both('Data from config.json:\nA_MODE = ' + json.A_MODE + '\nB_MODE = ' + json.B_MODE +
        '\nC_MODE = ' + json.C_MODE + '\nD_MODE = ' + json.D_MODE);
});