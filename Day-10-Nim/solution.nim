import math
import strutils
import std/strformat
import std/algorithm

proc partOne(file: string, displayErrors: bool): void =
    let rawInput = readFile(file)
    let subSystemLines = rawInput.split("\n")
    
    var braceCounter = 0
    var squareBracketCounter = 0
    var curlyBraceCounter = 0
    var greaterThanCounter = 0

    for line in subSystemLines:
        var charStack: seq[char] = @[]
        for c in line:
            if c == '(' or c == '[' or c == '{' or c == '<':
                charStack.add(c)
            else:
                let poppedChar = charStack.pop()
                if poppedChar != '(' and c == ')':
                    braceCounter += 1
                    if displayErrors:
                        echo &"Expected ), but found {c} instead."
                    break
                elif poppedChar != '[' and c == ']':
                    squareBracketCounter += 1
                    if displayErrors:
                        echo &"Expected ], but found {c} instead."
                    break
                elif poppedChar != '{' and c == '}':
                    curlyBraceCounter += 1
                    if displayErrors:
                        echo &"Expected }}, but found {c} instead."
                    break
                elif poppedChar != '<' and c == '>':
                    greaterThanCounter += 1
                    if displayErrors:
                        echo &"Expected >, but found {c} instead."
                    break

    let totalCost = (braceCounter * 3) + 
        (squareBracketCounter * 57) + 
        (curlyBraceCounter * 1197) + 
        (greaterThanCounter * 25137)
    echo &"Total Syntax Error Cost: {totalCost}"

proc partTwo(file: string, displayOutput: bool): void =
    let rawInput = readFile(file)
    let subSystemLines = rawInput.split("\n")

    var totals: seq[int] = @[]

    for line in subSystemLines:
        var total = 0
        var outputChars: seq[char] = @[]
        var queue: seq[char] = @[]

        for i, c in line:
            if c == ')' or c == ']' or c == '}' or c == '>':
                let val = queue.pop()
                if val == '(':
                    if c != ')':
                        break
                elif val == '[':
                    if c != ']':
                        break
                elif val == '{':
                    if c != '}':
                        break
                elif val == '<':
                    if c != '>':
                        break
            else:
                queue.add(c)
        
            if i == (line.len() - 1):
                while queue.len() != 0:
                    let popped = queue.pop()
                    if popped == '(':
                        outputChars.add(')')
                        total = (total * 5) + 1
                    elif popped == '[':
                        outputChars.add(']')
                        total = (total * 5) + 2
                    elif popped == '{':
                        outputChars.add('}')
                        total = (total * 5) + 3
                    elif popped == '<':
                        outputChars.add('>')
                        total = (total * 5) + 4
                totals.add(total)
                
        if displayOutput and outputChars.len() != 0:
            echo &"{line} - Complete by adding {outputChars.join()}."

    totals.sort()
    echo &"The middle score is: {totals[int(round(totals.len() / 2)) - 1]}"

partOne("puzzle-input", false)
partTwo("puzzle-input", false)
