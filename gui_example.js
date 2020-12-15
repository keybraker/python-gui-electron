const ipc = require('electron').ipcRenderer;
var exec = require('child_process').exec;
var child;
var nodeConsole = require('console');
var my_console = new nodeConsole.Console(process.stdout, process.stderr);

function print_both(str) {
    console.log('Javascript: ' + str);
    my_console.log('Javascript: ' + str);
}

function start_code_function(evt) {
    print_both('Inside gui_example.js initiating code');

    // EXECUTION OF PYTHON

    child = exec("python -i python_example.py ", function(error, stdout, stderr) {
        //sys.print('stdout: ' + stdout); 
        //sys.print('stderr: ' + stderr); 
        if (error !== null) {
            print_both('exec error: ' + error);
        }
    });

    child.stdout.on('data', function(data) {
        print_both('Following data has been piped from python execution: ' + data.toString());
    });
}

function send_code_function(evt) {
    let string_to_send = document.getElementById("string_to_send").value;
    print_both('Inside gui_example.js sending "' + string_to_send + '" to code:');
    child.stdin.write(string_to_send);

    child.stdout.on('data', function(data) {
        print_both('Following data was returned from python: ' + data.toString());
    });
}


function stop_code_function(evt) {
    child.stdin.write("terminate");
    print_both('Terminated python code');

    child.stdout.on('data', function(data) {
        print_both('Following data was returned from python: ' + data.toString());
    });

    child.stdin.end();
    print_both('Closed pipe from js to python');
}

function open_file_function(evt) {
    if (evt.srcElement.id == "json") {
        print_both('From gui_example.js sending a request to main.js via ipc');
        ipc.send('openJsonFile');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("start_code").addEventListener("click", start_code_function);
    document.getElementById("send_code").addEventListener("click", send_code_function);
    document.getElementById("stop_code").addEventListener("click", stop_code_function);
    document.getElementById("open_file").addEventListener("click", open_file_function);
})