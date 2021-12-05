import json

def check_y(board, current_number, bingo_found):
    for x in range(5):
        counter = 0
        for y in range(5):
            if board[y][x]["marked"] == 1:
                counter += 1
                if counter == 5:
                    bingo_found["found"] = 1
                    bingo_found["current_number"] = current_number
                    return 1
    return 0

def check_x(board, current_number, bingo_found):
    for x in range(5):
        counter = 0
        for y in range(5):
            if board[x][y]["marked"] == 1:
                counter += 1
                if counter == 5:
                    bingo_found["found"] = 1
                    bingo_found["current_number"] = current_number
                    return 1
    return 0

def calculate_sum(board):
    final_sum = 0
    for x in range(len(board)):
        for y in range(len(board)):
            if board[x][y]["marked"] == 0:
                final_sum += board[x][y]["value"]
    return final_sum

def part_one(file):
    input_file = open(file)
    called_numbers = []
    called_numbers_string = input_file.readline().replace('\n', '').split(',')

    for item in called_numbers_string:
        called_numbers.append(int(item))

    input_file.readline()

    counter = 0
    boards = []
    board = [[0] * 5 for i in range(5)]

    bingo_found = {
        "board": 0,
        "found": 0,
        "current_number": 0
    }

    for line in input_file:
        line = line.strip()
        line = line.replace('  ', ' ')
        line = line.split(' ')
        
        i = 0
        for num in line:
            value = int(num)
            board[counter][i] = {
                "value": value,
                "marked": 0,
            }
            i += 1
            if i == 6:
                break

        counter += 1
        if counter == 5:
            counter = 0
            boards.append(board)
            board = [[0] * 5 for i in range(5)]
            input_file.readline()

    for number in called_numbers:
        board_counter = 0
        for board in boards:
            for x in board:
                for y in x:
                    if y["value"] == number:
                        y["marked"] = 1
                        check_y(boards[board_counter], number, bingo_found)
                        check_x(boards[board_counter], number, bingo_found)

                        if bingo_found["found"] == 1:
                            winning_board = board_counter + 1
                            final_sum = calculate_sum(boards[board_counter])
                            called_number = bingo_found["current_number"]
                            print("Part One:")
                            print(f"\tWinning Board: {winning_board}")
                            print(f"\tFinal Score: {final_sum * called_number}")
                            return
            board_counter += 1

def part_two(file):
    input_file = open(file)

    called_numbers = []
    called_numbers_string = input_file.readline().replace('\n', '').split(',')

    for item in called_numbers_string:
        called_numbers.append(int(item))

    input_file.readline()

    counter = 0
    boards = []
    board = [[0] * 5 for i in range(5)]

    bingo_found = {
        "board": 0,
        "found": 0,
        "current_number": 0
    }

    for line in input_file:
        line = line.strip()
        line = line.replace('  ', ' ')
        line = line.split(' ')
        
        i = 0
        for num in line:
            value = int(num)
            board[counter][i] = {
                "value": value,
                "marked": 0,
            }
            i += 1
            if i == 6:
                break

        counter += 1
        if counter == 5:
            counter = 0
            boards.append(board)
            board = [[0] * 5 for i in range(5)]
            input_file.readline()

    winning_boards = []

    for number in called_numbers:
        for i in range(len(boards)):
            for x in boards[i]:
                for y in x:
                    if y["value"] == number:
                        y["marked"] = 1
                        won_x = check_x(boards[i], number, bingo_found)
                        won_y = check_y(boards[i], number, bingo_found)
                        if (won_x == 1 or won_y == 1) and i not in winning_boards:
                            winning_boards.append(i)

                            if len(winning_boards) == len(boards):
                                winning_board = winning_boards[-1]
                                final_sum = calculate_sum(boards[winning_board])

                                print("Part Two:")
                                print(f"\tLast Winning Board: {winning_boards[-1] + 1}")
                                print(f"\tFinal Score: {final_sum * number}")

part_one("puzzle-input")
part_two("puzzle-input")
