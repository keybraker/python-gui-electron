const ipc = require('electron').ipcRenderer;
var exec = require('child_process').exec;
var child;
var nodeConsole = require('console');
var my_console = new nodeConsole.Console(process.stdout, process.stderr);

function start_code_function(evt) {
    console.log('\x1b[34m%s\x1b[0m', 'PRINT BEFORE PYTHON EXEC FROM NODE.JS');

    // EXECUTION OF PYTHON

    child = exec("python -i python_example.py ", function(error, stdout, stderr) {
        //sys.print('stdout: ' + stdout); 
        //sys.print('stderr: ' + stderr); 
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

    //this is a listener for peers output
    child.stdout.on('data', function(data) {

        console.log('\x1b[36m%s\x1b[0m', 'PIPED FROM PYTHON PROGRAM: ' + data.toString());
    });
}

function send_code_function(evt) {
    console.log('\x1b[34m%s\x1b[0m', 'INTERACTION IN JS');
    child.stdin.write("hello\n");
    //this is a listener for peers output
    console.log('\x1b[36m%s\x1b[0m', 'PIPED FROM PYTHON PROGRAM: ' + data.toString());
}


function stop_code_function(evt) {
    console.log('\x1b[34m%s\x1b[0m', 'EXIT IN JS');

    child.stdin.write("exit\n"); //this is a listener for peers output
    console.log('\x1b[36m%s\x1b[0m', 'PIPED FROM PYTHON PROGRAM: ' + data.toString());

    child.stdin.end();

    console.log('python terminated from js too');
}

function open_file_function(evt) {
    if (evt.srcElement.id == "json") {

        console.log('\x1b[34m%s\x1b[0m', 'THIS IS HOW TO READ A FILE IN JS');
        console.log('\x1b[34m%s\x1b[0m', 'RIGHT KNOW I AM IN js_example.js');

        ipc.send('openJsonFile');

    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("pressed a button");
    document.getElementById("start_code").addEventListener("click", start_code_function);
    document.getElementById("send_code").addEventListener("click", send_code_function);
    document.getElementById("stop_code").addEventListener("click", stop_code_function);
    document.getElementById("open_file").addEventListener("click", open_file_function);
})