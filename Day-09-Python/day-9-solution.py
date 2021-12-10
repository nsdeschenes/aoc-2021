def partOne(file):
    board = []

    input_file = open(file)
    for line in input_file:
        line = line.replace('\n', '')
        board.append([int(i) for i in str(line)])

    lowest_points = []

    for i in range(len(board)):
        for j in range(len(board[i])):
            # Check Top Position
            if i != 0:
                upper_value = board[i-1][j]
            else:
                upper_value = 10

            # Check Bottom Position
            if len(board) != i + 1:
                bottom_value = board[i+1][j]
            else:
                bottom_value = 10

            # Check Left Position
            if j != 0:
                left_value = board[i][j-1]
            else:
                left_value = 10

            # Check Right Position
            if len(board[i]) != j+1:
                right_value = board[i][j+1]
            else:
                right_value = 10

            neighbor_values = [upper_value,
                               bottom_value, left_value, right_value]

            if all(value > board[i][j] for value in neighbor_values):
                lowest_points.append(board[i][j])

    risk_level_sum = 0
    for point in lowest_points:
        risk_level_sum = risk_level_sum + (point + 1)

    print(f"Part One Risk Level: {risk_level_sum}")


def partTow(file):
    board = []

    input_file = open(file)
    for line in input_file:
        line = line.replace('\n', '')
        board.append([int(i) for i in str(line)])

    lowest_points = []

    for i in range(len(board)):
        for j in range(len(board[i])):
            # Check Top Position
            if i != 0:
                upper_value = board[i - 1][j]
            else:
                upper_value = 10

            # Check Bottom Position
            if len(board) != i + 1:
                bottom_value = board[i + 1][j]
            else:
                bottom_value = 10

            # Check Left Position
            if j != 0:
                left_value = board[i][j - 1]
            else:
                left_value = 10

            # Check Right Position
            if len(board[i]) != j+1:
                right_value = board[i][j + 1]
            else:
                right_value = 10

            neighbor_values = [upper_value,
                               bottom_value, left_value, right_value]

            if all(value > board[i][j] for value in neighbor_values):
                lowest_points.append((i, j))

    def getNeighborValues(board, point):
        row = point[0]
        col = point[1]

        points = []
        # Check Top Position
        if row != 0:
            if board[row - 1][col] != 9:
                points.append((row - 1, col))

        # Check Bottom Position
        if len(board) != row + 1:
            if board[row + 1][col] != 9:
                points.append((row + 1, col))

        # Check Left Position
        if col != 0:
            if board[row][col - 1] != 9:
                points.append((row, col - 1))

        # Check Right Position
        if len(board[row]) != col + 1:
            if board[row][col + 1] != 9:
                points.append((row, col + 1))
        return points

    def getBasinValues(board, points, checkedPoints):
        for x, y in points:
            if (x, y) not in checkedPoints:
                checkedPoints.append((x, y))
                getBasinValues(board, getNeighborValues(
                    board, (x, y)), checkedPoints)
        return checkedPoints

    basin_points = []
    for i in range(len(board)):
        for j in range(len(board[i])):
            if (i, j) in lowest_points:
                # Check Top Position
                basin_points.append(getBasinValues(
                    board, getNeighborValues(board, (i, j)), [(i, j)]))

    basin_points.sort(key=len, reverse=True)
    basin_points = basin_points[:3]

    count = 1
    for points in basin_points:
        count = count * len(points)

    print(f"Three Largest Basins Multiplied: {count}")


partOne("puzzle-input")
partTow("puzzle-input")
