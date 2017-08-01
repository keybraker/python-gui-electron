# Electron GUI for Python

A simple representation for  creating an electron GUI for a python program and interacting with it.

## Installation Guide

Make sure you have installed [electron](https://electron.atom.io) ( Mac OS or Linux / Windows shouldn't work )

Clone this repository with:
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

## Versions used to achieve communication are the following


[Python](https://www.python.org/downloads/) Version: 2.7.10

[Electron](https://electron.atom.io) Version: 1.4.13
