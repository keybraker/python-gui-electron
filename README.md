# Electron GUI for Python

A simple representation for  creating an electron GUI for a python program and interacting with it.

## How does it work ( simple representation )

```text
electron
--------> |------------|
          |            |    python
          |            |-------------> |-------------------|
          |  electron  |  sub process  | python program    |
          |  --------  |               | --------------    |
          |   > html   |      std      |  takes requests   |
          |   > css    | <-----------> |  from js and      |
          |   > js     | communication |  respons to them  |
          |            |               |  in terminal      |
          |            |               |                   |
          |------------|               |-------------------|
```

Essentially no network is being created only one terminal is used when electron is launched and than from 
within js ( electron ) a python program is initiated as a subprocess. These two programs than communicate via
terminal with js talking to python and python answering the requests which js listens too.

## Structure of example

```text
.
|-- ui.html
|-- jsExample.css
|-- jsExample.js
|-- package.json
|-- main.js
|
|-- jsPython.png
|
|-- pythonExample.py
|
'-- README.md
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

2. Clone this repository with ( or download zip ):
   ```
   git clone https://github.com/keybraker/electron-GUI-for-python.git
   ```

## Execution Guide

Open a terminal window and cd to cloned project
```
cd .../electron-GUI-for-python
```
Run the project by simply typing
```
electron .
```
A page should spawn looking as follows:

![alt text](https://raw.githubusercontent.com/keybraker/electron-GUI-for-python/master/jsPython.png)

Then, press: 
```
LAUNCH PYTHON CODE
~ this will launch a python application with a loop inside,
  that is waiting for data to be send from js
```

And afterwards press: 
```
INTERACT WITH PYTHON CODE
~ this will send a message named "hello" from js to python
  and python will read it and print a message
```
And in the end press 
```
TERMINATE PYTHON CODE
~ finally js will send a termination message "exit" to python
  and python will terminate and then js will terminate python
  so that no processes run in the backround
```

## Interpretation Guide

After that you should open jsExample.js and pythonExample.js in order to see how the example works and what triggered every message you see in your terminal.

## Authors

* **Ioannis Tsiakkas** - *(Keybraker)* - [Keybraker](https://github.com/keybraker)

## Versions used to achieve communication are the following

[![Python Version](https://img.shields.io/badge/Python-2.7.13-green.svg)](https://www.python.org/downloads/)
[![Electron Version](https://img.shields.io/badge/Electorn-1.4.13-blue.svg)](https://electron.atom.io)
[![OSX Version](https://img.shields.io/badge/OS%20X-10.12.5-red.svg)](https://www.apple.com/lae/macos/sierra/)


