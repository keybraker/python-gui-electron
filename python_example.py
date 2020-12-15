import sys

# FUNCTIONS


def my_print(str):
	print('Python:     ' + str)

def start():
	my_print('Spawned from within electron (js)')

def respond(line):
	my_print('I got string: "' + line + '", from electron (js)')

def terminate():
	my_print('I got a terminate request from electron (js)...terminating')
	exit()


# CODE

start()

while True:
    line = sys.stdin.readline()
    if line == "terminate":
        terminate()
    respond(line)
