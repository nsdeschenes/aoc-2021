# Part One
def part_one(file):
    input_file = open(file)

    pre_measure = input_file.readline()
    counter = 0

    for curr_measure in input_file:
        if int(curr_measure) > int(pre_measure):
            counter = counter + 1
        pre_measure = curr_measure

    input_file.close()

    print(f"Part One Answer: {counter}")

# Part Two
def part_two(file):
    input_file = open(file)
    counter = 0
    measures = []

    for line in input_file:
        measures.append(int(line))
    input_file.close()

    for i in range(3, len(measures)):
        pre_measure = measures[i - 3] + measures[i - 2] + measures[i - 1]
        curr_measure = measures[i - 2] + measures[i - 1] + measures[i]

        if curr_measure > pre_measure:
            counter = counter + 1

    print(f"Part Two Answer: {counter}")

part_one("puzzle-input")
part_two("puzzle-input")
