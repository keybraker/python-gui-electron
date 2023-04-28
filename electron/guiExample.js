const exec = require("child_process").exec;
const nodeConsole = require("console");
const { ipcRenderer } = require("electron");

ipcRenderer.send("run-command", "ls");
ipcRenderer.on("run-command-result", (event, result) => {
  if (result.error) {
    console.error("Error:", result.error);
  } else {
    console.log("Output:", result.output);
  }
});

const terminalConsole = new nodeConsole.Console(process.stdout, process.stderr);
let child;

function print_both(str) {
  console.log("Javascript: " + str);
  terminalConsole.log("Javascript: " + str);
}

function send_to_program(str) {
  child.stdin.write(str);
  child.stdout.on("data", function (data) {
    print_both(
      "Following data has been piped from python program: " +
        data.toString("utf8")
    );
  });
}

// starts program execution from within javascript and
function start_code_function(evt) {
  print_both("Initiating program");

  child = exec(
    "python -i ./python/pythonExample.py ",
    function (error, stdout, stderr) {
      if (error !== null) {
        print_both("exec error: " + error);
      }
    }
  );

  child.stdout.on("data", function (data) {
    print_both(
      "Following data has been piped from python program: " +
        data.toString("utf8")
    );
  });
}

// sends data to program
function send_code_function(evt) {
  let string_to_send = document.getElementById("string_to_send").value;
  print_both('Sending "' + string_to_send + '" to program');
  send_to_program(string_to_send);
}

// sends termination message to python program and closed stream
// that receives information from it
function stop_code_function(evt) {
  print_both("Terminated program");
  send_to_program("terminate");
  child.stdin.end();
}

// requests main.js to open a file from the filesystem
function open_file_function(evt) {
  print_both("From guiExample.js sending a request to main.js via ipc");
  ipcRenderer.send("open_json_file");
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("start_code")
    .addEventListener("click", start_code_function);
  document
    .getElementById("send_code")
    .addEventListener("click", send_code_function);
  document
    .getElementById("stop_code")
    .addEventListener("click", stop_code_function);
  document
    .getElementById("open_file")
    .addEventListener("click", open_file_function);
});