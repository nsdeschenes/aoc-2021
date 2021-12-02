const fs = require('fs')

const partOne = (file) => {
  const position = {
    horizontal: 0,
    depth: 0,
  }

  fs.readFileSync(file, 'utf-8')
    .split('\n')
    .map((instruction) => {
      const [direction, amountString] = instruction.split(' ')
      
      const amount = parseInt(amountString)

      switch(direction) {
        case 'forward':
          position.horizontal += amount
          break
        case 'up':
          position.depth -= amount
          break
        case 'down':
          position.depth += amount
          break
      }
  })
  
  console.log(`Part One Answer: ${position.horizontal * position.depth}`)
}

const partTwo = (file) => {
  const position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }

  fs.readFileSync(file, 'utf-8')
    .split('\n')
    .map((instruction) => {
      const [direction, amountString] = instruction.split(' ')
      
      const amount = parseInt(amountString)

      switch(direction) {
        case 'forward':
          position.horizontal += amount
          position.depth += position.aim * amount
          break
        case 'up':
          position.aim -= amount
          break
        case 'down':
          position.aim += amount
          break
      }
  })
  
  console.log(`Part Two Answer: ${position.horizontal * position.depth}`)
}

partOne('puzzle-input')
partTwo('puzzle-input')
