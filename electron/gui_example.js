const ipc = require('electron').ipcRenderer;
// const exec = require('child_process').exec;
const exec = require('child_process').exec;

var nodeConsole = require('console');
var my_console = new nodeConsole.Console(process.stdout, process.stderr);
var child;

function print_both(str) {
    console.log('Javascript: ' + str);
    my_console.log('Javascript: ' + str);
}

function send_to_program(str) {
    child.stdin.write(str);
    child.stdout.on('data', function(data) {
        print_both('Following data has been piped from python program: ' + data.toString('utf8'));
    });
}

// starts program execution from within javascript and
function start_code_function(evt) {
    print_both('Initiating program');

    child = exec("python -i ./external_programs/python_example.py ", function(error, stdout, stderr) {
        if (error !== null) {
            print_both('exec error: ' + error);
        }
    });

    child.stdout.on('data', function(data) {
        print_both('Following data has been piped from python program: ' + data.toString('utf8'));
    });
}

// sends data to program
function send_code_function(evt) {
    let string_to_send = document.getElementById("string_to_send").value;
    print_both('Sending "' + string_to_send + '" to program:');
    send_to_program(string_to_send);
}

// sends termination message to python program and closed stream
// that recieves information from it
function stop_code_function(evt) {
    print_both('Terminated program');
    send_to_program("terminate");
    child.stdin.end();
}

// requests main.js to open a file from the filesystem
function open_file_function(evt) {
    print_both('From gui_example.js sending a request to main.js via ipc');
    ipc.send('open_json_file');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("start_code").addEventListener("click", start_code_function);
    document.getElementById("send_code").addEventListener("click", send_code_function);
    document.getElementById("stop_code").addEventListener("click", stop_code_function);
    document.getElementById("open_file").addEventListener("click", open_file_function);
});