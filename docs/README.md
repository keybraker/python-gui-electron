# Electron GUI for Python

A simple example on how to create an electron GUI for a python program and interacting with it.

## How does it work ( simple representation )

```text
electron
--------> |------------|    python
          |            |-------------> |-------------------|
          |  electron  |  sub process  | python program    |
          |  --------  |               | --------------    |
          |   > html   |      std      |  takes requests   |
          |   > css    | <-----------> |  from js and      |
          |   > js     | communication |  responds it,     |
          |            |               |  in the terminal  |
          |------------|               |-------------------|
```

Essentially no network is being created only one terminal is used when electron is launched and than from 
within javascript ( electron ) a python program is initiated as a subprocess.
These two programs than communicate via standart streams.

### Structure of example

```text
│ 
├── docs
│   ├── README.md
│   └── LICENSE
|
├── img
│   └── example.png
|
├── gui_example.html
├── gui_example.css
├── gui_example.js
├── main.js
│ 
├── python_example.py
| 
├── config.json
└── package.json
```

## Installation Guide

1. To download and install [electron](https://electron.atom.io) ( OS X or Linux ) you have to download it from [npm-electron](https://www.npmjs.com/package/electron) using :

   ```
   npm install electron --save-dev
   ```
   ```
   npm install -g electron
   ```
   ( if you don't have npm installed use this [link](https://nodejs.org/en/download/) to download it. )

2. Clone this repository:
   ```
   git clone https://github.com/keybraker/electron-GUI-for-python.git
   ```

## Execution Guide

1. Open a terminal window and cd to cloned project
   ```
   cd electron-GUI-for-python
   ```

2. Initialize the elcetron aplication (first-time)
   ```
   npm i
   ```

3. Run the electron application
   ```
   npm start
   ```

4. A page should spawn looking as follows:

![alt text](../img/example.png)

1. Press __LAUNCH PROGRAM___ button

   this will launch a python application with a loop inside,
   that is waiting for data to be send from js

2. Press __INTERACT WITH PROGRAM__ button

   this will send a message named "hello" from js to python
   and python will read it and print a message

3. Press __TERMINATE PROGRAM__ button

   a termination message ("terminate") is sent to the program which knows
   to stop the loop and execution

4. Press __HOW TO OPEN A FILE__ button

   from ```electron/gui_example.js``` an ipc.send message is sent to the main.js
   which will then read and output `config.json` values (fast feature to store settings).

### Interpretation Guide

Important functionality can be found in files ```electron/gui_example.js``` where the core of electron is. Listeners are implemented there awaiting for click events to trigger initialization of program, communication and termination. The program ```external_programs/python_example.py``` which is the external or 3rd party application that electron calls, is a simple for-loop awaiting commands. It responds to commands and terminates when sent an empty string, "terminate" or by pressing the terminate program button.

## Authors

* **Ioannis Tsiakkas** - *(Keybraker)* - [Keybraker](https://github.com/keybraker)

[![Python 2 Version](https://img.shields.io/badge/Python-2.7.16-green.svg)](https://www.python.org/downloads/)
[![Python 3 Version](https://img.shields.io/badge/Python-3.9.1-green.svg)](https://www.python.org/download/releases/3.0/)
[![Electron Version](https://img.shields.io/badge/electron-v11.1.0-green.svg)](https://electron.atom.io)
[![OSX Version](https://img.shields.io/badge/OS%20X-v11.0.1-green.svg)](https://www.apple.com/lae/macos/big-sur/)
[![Ubuntu](https://img.shields.io/badge/Ubuntu-v20.0.4-green.svg)](https://ubuntu.com)
