import sys

# FUNCTIONS

def start():
	print 'I STARTED FROM WITHIN NODE.JS'

def respond():
	print 'I GOT hello FROM NODE.JS -> HI THERE EXAMPLE ANALYZER'

def ender():
	print 'I GOT exit FROM NODE.JS -> I STOPPED FROM WITHIN NODE.JS'
	exit()


# CODE

start()

while True:
    line = sys.stdin.readline()
    if line == "exit\n":
    	ender()
    elif line == "hello\n":
    	respond()
    else:
    	print 'dunno'
