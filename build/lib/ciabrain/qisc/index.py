def print_lol(arr):
    for row in arr:
        if(isinstance(row , list)):
            print_lol(row)
        else:
            print row