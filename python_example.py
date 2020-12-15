import sys

# FUNCTIONS


def my_print(str):
    print('Python:     ' + str)


# CODE

my_print('Spawned from within electron (js)')

while True:
    line = sys.stdin.readline()
    print('GOT=>'+line+"<=")

    if line == "terminate":
        my_print('I got a terminate request from electron (js)...terminating')
        exit(0)
    elif line == "interaction_message":
        my_print('I got string: "' + "interaction_message" +
                 '", from electron (js)')
    else:
        print('no clue')
