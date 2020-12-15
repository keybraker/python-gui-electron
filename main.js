// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require('path')
var exec = require('child_process').exec;
var child;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 900,
        maxWidth: 1280,
        minWidth: 480,
        maxHeight: 960,
        minHeight: 360,
        webPreferences: {
            preload: path.join(__dirname, 'gui_example.js'),
            // nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('gui_example.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
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
        //sys.print('stdout: ' + stdout); 
        //sys.print('stderr: ' + stderr); 
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
});

ipcMain.on('openJsonFile', () => {
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

    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    myConsole.log('\x1b[33m%s\x1b[0m', 'NOW IM IN main.js, AND GOT CALLED THROUGH ipc.send.');
    myConsole.log('\x1b[33m%s\x1b[0m', 'DATA FROM config.json:');
    console.log('\x1b[33m%s\x1b[0m', 'A_MODE = ' + json.A_MODE);
    console.log('\x1b[33m%s\x1b[0m', 'B_MODE = ' + json.B_MODE);
    console.log('\x1b[33m%s\x1b[0m', 'C_MODE = ' + json.C_MODE);
    console.log('\x1b[33m%s\x1b[0m', 'D_MODE = ' + json.D_MODE);
    console.log('');

});