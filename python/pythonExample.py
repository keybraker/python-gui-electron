import sys

# FUNCTIONS


def my_print(str):
    print('Python    : "' + str + '"', flush=True)  # Add flush=True here


# CODE


my_print('Spawned from within electron (js)')

while True:
    line = sys.stdin.readline().strip()

    if line == "terminate":
        my_print('I got a terminate request from electron (js)...terminating')
        exit(0)
    elif line == "":
        my_print('Terminating as there is no data given...terminated')
        exit(0)
    else:
        my_print('I got string: "' + line + '", from electron (js)')
