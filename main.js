const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain;

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {

	var ui = new BrowserWindow({
		height: 450,
		width: 600,
		resizable: false
	});
	ui.loadURL('file://' + __dirname + '/ui.html');

	ui.on('closed', () => {
  		app.quit()
	})
});