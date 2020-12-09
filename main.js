const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain;

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {

	var ui = new BrowserWindow({
		height: 450,
		width: 600,
		resizable: false,
		nodeIntegration: true, // small fix for electron version 5.0.0 will update repo without nodeInt
		nodeIntegrationInWorker: true
	});
	ui.loadURL('file://' + __dirname + '/ui.html');

	ui.on('closed', () => {
  		app.quit()
	})

	ipc.on('openJsonFile', () => { 
		
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
	    myConsole.log('\x1b[33m%s\x1b[0m','NOW IM IN main.js, AND GOT CALLED THROUGH ipc.send.');
	    myConsole.log('\x1b[33m%s\x1b[0m','DATA FROM config.json:');
		console.log('\x1b[33m%s\x1b[0m','A_MODE = ' + json.A_MODE);
		console.log('\x1b[33m%s\x1b[0m','B_MODE = ' + json.B_MODE);
		console.log('\x1b[33m%s\x1b[0m','C_MODE = ' + json.C_MODE);
		console.log('\x1b[33m%s\x1b[0m','D_MODE = ' + json.D_MODE);
		console.log('');
		
	});

});
