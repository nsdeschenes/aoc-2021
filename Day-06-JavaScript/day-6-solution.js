const fs = require("fs");

const partOne = (file) => {
  const inputs = fs
    .readFileSync(file, "utf-8")
    .split(",")
    .map((val) => parseInt(val));

  const fishes = [];
  for (let i = 0; i < 9; i++) {
    fishes.push(0);
  }

  inputs.forEach((input) => {
    fishes[input]++;
  });

  for (let i = 0; i < 80; i++) {
    const currentBreadingCount = fishes.shift();
    if (typeof fishes[6] !== "undefined") {
      fishes[6] += currentBreadingCount;
    } else {
      fishes[6] = 0 + currentBreadingCount;
    }
    fishes[8] = currentBreadingCount;
  }

  const fishCount = fishes.reduce((pre, curr) => pre + curr);

  console.log(`Total Fish Count: ${fishCount}`);
};

const partTwo = (file) => {
  const inputs = fs
    .readFileSync(file, "utf-8")
    .split(",")
    .map((val) => parseInt(val));

  const fishes = [];
  for (let i = 0; i < 9; i++) {
    fishes.push(0);
  }

  inputs.forEach((input) => {
    fishes[input]++;
  });

  for (let i = 0; i < 256; i++) {
    const currentBreadingCount = fishes.shift();
    if (typeof fishes[6] !== "undefined") {
      fishes[6] += currentBreadingCount;
    } else {
      fishes[6] = 0 + currentBreadingCount;
    }
    fishes[8] = currentBreadingCount;
  }

  const fishCount = fishes.reduce((pre, curr) => pre + curr);

  console.log(`Total Fish Count: ${fishCount}`);
};

partOne("puzzle-input");
partTwo("puzzle-input");
