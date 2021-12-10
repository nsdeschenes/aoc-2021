import strutils
import std/algorithm
import std/strformat
from std/sequtils import map

proc calculateMedian(sequence: seq[int]): int = 
    if sequence.len() mod 2 == 0:
        let p1 = int(sequence.len() / 2)
        let p2 = (p1 + 1)
        return sequence[int((p1 + p2) / 2)]
    else:
        return sequence[int(float(sequence.len() + 1) / 2)]

proc calculateFuel(crabs: seq[int], position: int): int =
    var fuelCost = 0
    for crab in crabs:
        let currPos = abs(crab - position)
        fuelCost += int(currPos * (currPos + 1) / 2)
    return fuelCost

proc partOne(file: string): string =
    let rawInput = readFile(file)
    var positions = rawInput.split(",").map(parseInt)

    positions.sort()

    let median = calculateMedian(positions)

    var totalFuelCost = 0

    for position in positions:
        totalFuelCost += abs(position - median)

    return &"Part One Total Fuel Cost: {totalFuelCost}"

proc partTwo(file: string): string =
    let rawInput = readFile(file)
    var positions = rawInput.split(",").map(parseInt)

    positions.sort()

    let alignPositions = 0..positions.max
    var fuelCosts: seq[int]
    
    for pos in alignPositions:
        let fuelCost = calculateFuel(positions, pos)
        fuelCosts.add(fuelCost)

    fuelCosts.sort()

    return &"Part Two Total Fuel Cost: {fuelCosts.min}"

echo partOne("puzzle-input")
echo partTwo("puzzle-input")
