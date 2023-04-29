const { exec } = require("child_process");
const nodeConsole = require("console");
const { ipcRenderer } = require("electron");

const terminalConsole = new nodeConsole.Console(process.stdout, process.stderr);
let child;

ipcRenderer.send("run-command", "ls");
ipcRenderer.on("run-command-result", (event, result) => {
  if (result.error) {
    console.error("Error:", result.error);
  } else {
    console.log("Output:", result.output);
  }
});

const printBoth = (str) => {
  console.log(`Javascript: ${str}`);
  terminalConsole.log(`Javascript: ${str}`);
};

const sendToProgram = (str) => {
  child.stdin.write(str);
  child.stdout.on("data", (data) => {
    printBoth(
      `Following data has been piped from python program: ${data.toString(
        "utf8"
      )}`
    );
  });
};

const startCodeFunction = () => {
  printBoth("Initiating program");

  child = exec("python -i ./python/pythonExample.py", (error) => {
    if (error) {
      printBoth(`exec error: ${error}`);
    }
  });

  child.stdout.on("data", (data) => {
    printBoth(
      `Following data has been piped from python program: ${data.toString(
        "utf8"
      )}`
    );
  });
};

const sendCodeFunction = () => {
  const stringToSend = document.getElementById("string_to_send").value;
  printBoth(`Sending "${stringToSend}" to program`);
  sendToProgram(stringToSend);
};

const stopCodeFunction = () => {
  printBoth("Terminated program");
  sendToProgram("terminate");
  child.stdin.end();
};

const openFileFunctionSync = () => {
  printBoth("From guiExample.js sending a request to main.js via ipc");
  ipcRenderer.send("open_json_file_sync");
};

const openFileFunctionAsync = () => {
  printBoth("From guiExample.js sending a request to main.js via ipc");
  ipcRenderer.send("open_json_file_async");
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("start_code")
    .addEventListener("click", startCodeFunction);
  document
    .getElementById("send_code")
    .addEventListener("click", sendCodeFunction);
  document
    .getElementById("stop_code")
    .addEventListener("click", stopCodeFunction);
  document
    .getElementById("open_file_sync")
    .addEventListener("click", openFileFunctionSync);
  document
    .getElementById("open_file_async")
    .addEventListener("click", openFileFunctionAsync);
});
