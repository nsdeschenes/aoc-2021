import strutils
import std/sequtils
import std/strformat

proc solution(file: string, iterationCount: int): void =
    # Read in file, and convert to ints
    let rawInput = readFile(file)
    let cleanedInput = toSeq(rawInput.replace("\n", "").items)
    var octopi = cleanedInput.mapIt(parseInt($it))

    proc getNeighbours(i: int): seq[int] =
        let x = i mod 10
        let y = int(i / 10)
        var nbrs: seq[int] = @[]

        # check for possible neighbours
        for (dx, dy) in [(-1, -1), (-1, 0), (-1, 1), (0, 1), (0, -1), (1, -1), (1, 0), (1, 1)]:
            # ignore if not a valid neighbour
            if x + dx >= 0 and x + dx < 10 and y + dy >= 0 and y + dy < 10:
                nbrs.add(10 * (y + dy) + x + dx)
        return nbrs
    
    # init counters
    var flashCount = 0
    var numFlashes = 0
    var iteration = 0

    # loop through iteration count
    while numFlashes < iterationCount:
        # increment dumbo octopus
        octopi = octopi.mapIt(it + 1)
        var justFlashed: seq[int] = @[]

        # loop through the octopi
        for i in 0..(len(octopi) - 1):
            if octopi[i] == 10:
                justFlashed.add(i)
        
        var allFlashes = justFlashed

        # loop through any octopi that just flashed
        while len(justFlashed) > 0:
            var newFlashes: seq[int] = @[]

            # get the neighbouring octopi and have them flash
            for i in justFlashed:
                for n in getNeighbours(i):
                    octopi[n] += 1
                    if octopi[n] == 10:
                        newFlashes.add(n)
            
            allFlashes = concat(allFlashes, newFlashes)
            justFlashed = newFlashes
        
        numFlashes = len(allFlashes)

        for i in allFlashes:
            octopi[i] = 0
        
        if iteration < 100:
            flashCount += numFlashes
        
        iteration += 1

    echo &"Total Flashes After 100 Steps: {flashCount}"
    echo &"Number Of Iterations: {iteration}"

solution("puzzle-input", 100)
