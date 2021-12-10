const fs = require("fs");

const setupBoard = (file) => {
  const inputs = fs.readFileSync(file, "utf-8").split("\n");

  let arraySize = 0;

  const points = inputs.map((input) => {
    input = input.split(" -> ");

    firstPos = input[0].split(",");
    secondPos = input[1].split(",");

    const x1 = parseInt(firstPos[0]);
    const y1 = parseInt(firstPos[1]);
    const x2 = parseInt(secondPos[0]);
    const y2 = parseInt(secondPos[1]);

    if (x1 >= arraySize) {
      arraySize = x1 + 1;
    }

    if (y1 > arraySize) {
      arraySize = y1 + 1;
    }

    if (x2 > arraySize) {
      arraySize = x2 + 1;
    }

    if (y2 > arraySize) {
      arraySize = y2 + 1;
    }

    return {
      x1,
      y1,
      x2,
      y2,
    };
  });

  const board = Array.from(Array(arraySize), () => Array(arraySize).fill("."));

  return {
    points,
    board,
  };
};

const partOne = (file) => {
  const { board, points } = setupBoard(file);

  points.forEach((point) => {
    if (point.x1 === point.x2) {
      let larger = point.y2;
      let smaller = point.y1;
      if (point.y1 >= point.y2) {
        larger = point.y1;
        smaller = point.y2;
      }

      for (let i = smaller; i <= larger; i++) {
        if (board[i][point.x1] === ".") {
          board[i][point.x1] = 1;
        } else {
          board[i][point.x1]++;
        }
      }
    } else if (point.y1 === point.y2) {
      let larger = point.x2;
      let smaller = point.x1;
      if (point.x1 >= point.x2) {
        larger = point.x1;
        smaller = point.x2;
      }

      for (let i = smaller; i <= larger; i++) {
        if (board[point.y1][i] === ".") {
          board[point.y1][i] = 1;
        } else {
          board[point.y1][i]++;
        }
      }
    }
  });

  let counter = 0;

  board.forEach((i) => {
    i.forEach((j) => {
      if (j !== "." && j > 1) {
        counter++;
      }
    });
  });

  console.log(`Part One lines overlap: ${counter} times.`);
};

const partTwo = (file) => {
  const { board, points } = setupBoard(file);

  const newPoints = [];
  points.forEach((point) => {
    const xRange = [];
    if (point.x1 === point.x2) {
      xRange.push(point.x1);
    } else if (point.x1 > point.x2) {
      for (let i = point.x1; i >= point.x2; i--) {
        xRange.push(i);
      }
    } else if (point.x1 < point.x2) {
      for (let i = point.x1; i <= point.x2; i++) {
        xRange.push(i);
      }
    }

    const yRange = [];
    if (point.y1 === point.y2) {
      yRange.push(point.y1);
    } else if (point.y1 > point.y2) {
      for (let i = point.y1; i >= point.y2; i--) {
        yRange.push(i);
      }
    } else if (point.y1 < point.y2) {
      for (let i = point.y1; i <= point.y2; i++) {
        yRange.push(i);
      }
    }

    if (xRange.length === yRange.length) {
      xRange.forEach((x, i) => {
        newPoints.push({
          x: x,
          y: yRange[i],
        });
      });
    } else if (xRange.length > yRange.length) {
      xRange.forEach((x) => {
        newPoints.push({
          x,
          y: yRange[0],
        });
      });
    } else {
      yRange.forEach((y) => {
        newPoints.push({
          x: xRange[0],
          y,
        });
      });
    }
  });

  newPoints.forEach((point) => {
    if (board[point.y][point.x] === ".") {
      board[point.y][point.x] = 1;
    } else {
      board[point.y][point.x]++;
    }
  });

  let counter = 0;
  board.forEach((i) => {
    i.forEach((j) => {
      if (j !== "." && j > 1) {
        counter++;
      }
    });
  });

  console.log(`Part Two lines overlap: ${counter} times.`);
};

partOne("puzzle-input");
partTwo("puzzle-input");
