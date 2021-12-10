const fs = require("fs");

const partOne = (file) => {
  const inputs = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map((input) => input.split("|"))
    .map((input) => input.map((s) => s.trim()));

  let uniqueSignals = 0;

  inputs.forEach((input) => {
    const signals = input[0].split(" ");
    const outputs = input[1].split(" ");

    signals.forEach((signal) => {
      if (signal.length === 2) {
        outputs.forEach((output) => {
          if (output.length === 2) {
            uniqueSignals++;
          }
        });
      } else if (signal.length === 4) {
        outputs.forEach((output) => {
          if (output.length === 4) {
            uniqueSignals++;
          }
        });
      } else if (signal.length === 3) {
        outputs.forEach((output) => {
          if (output.length === 3) {
            uniqueSignals++;
          }
        });
      } else if (signal.length === 7) {
        outputs.forEach((output) => {
          if (output.length === 7) {
            uniqueSignals++;
          }
        });
      }
    });
  });

  console.log(`Part One Unique Signal Count: ${uniqueSignals}`);
};

const partTwo = (file) => {
  const inputs = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map((input) => input.split("|"))
    .map((input) => input.map((s) => s.trim()));

  let count = 0;

  inputs.forEach((input) => {
    const signals = input[0].split(" ");
    const outputs = input[1].split(" ");

    const numbers = [];
    signals.forEach((signal) => {
      if (signal.length === 2) {
        numbers[1] = signal.split("");
      } else if (signal.length === 4) {
        numbers[4] = signal.split("");
      } else if (signal.length === 3) {
        numbers[7] = signal.split("");
      } else if (signal.length === 7) {
        numbers[8] = signal.split("");
      }
    });

    signals.forEach((signal) => {
      if (signal.length === 5) {
        const splitSignal = signal.split("");
        let counter = 0;
        splitSignal.forEach((c) => {
          if (numbers[1].includes(c)) {
            counter++;
          }

          if (counter === 2) {
            numbers[3] = splitSignal;
            counter = 0;
          }
        });
      } else if (signal.length === 6) {
        const splitSignal = signal.split("");
        let counter = 0;
        splitSignal.forEach((c) => {
          if (numbers[4].includes(c)) {
            counter++;
          }
          if (counter === 4) {
            numbers[9] = splitSignal;
            counter = 0;
          }
        });
      }
    });

    const segmantMap = {};

    segmantMap["top"] = numbers[7].filter((c) => !numbers[1].includes(c));

    const nineFourDiff = numbers[9].filter((c) => !numbers[4].includes(c));
    segmantMap["bottom"] = nineFourDiff.filter(
      (c) => !segmantMap["top"].includes(c)
    );

    const threeOneDiff = numbers[3].filter((c) => !numbers[1].includes(c));
    const threeOneTopDiff = threeOneDiff.filter(
      (c) => !segmantMap.top.includes(c)
    );
    segmantMap["middle"] = threeOneTopDiff.filter(
      (c) => !segmantMap.bottom.includes(c)
    );

    segmantMap["bottomLeft"] = numbers[8].filter(
      (c) => !numbers[9].includes(c)
    );

    numbers[0] = numbers[8].filter((c) => !segmantMap.middle.includes(c));

    signals.forEach((signal) => {
      if (signal.length === 6) {
        const isNine =
          signal.split("").filter((c) => numbers[9].includes(c)).length === 6;
        const isZero =
          signal.split("").filter((c) => numbers[0].includes(c)).length === 6;

        if (!isNine && !isZero) {
          numbers[6] = signal.split("");
        }
      }
    });

    segmantMap["topRight"] = numbers[1].filter((c) => !numbers[6].includes(c));
    segmantMap["bottomRight"] = numbers[6].filter((c) =>
      numbers[1].includes(c)
    );

    numbers[5] = numbers[6].filter((c) => !segmantMap.bottomLeft.includes(c));

    let outputString = ``;
    outputs.forEach((output) => {
      if (output.length === 2) {
        outputString += `1`;
      } else if (output.length === 4) {
        outputString += `4`;
      } else if (output.length === 3) {
        outputString += `7`;
      } else if (output.length === 7) {
        outputString += 8;
      } else if (output.length === 5) {
        const isThree =
          output.split("").filter((c) => numbers[3].includes(c)).length === 5;
        const isFive =
          output.split("").filter((c) => numbers[5].includes(c)).length === 5;

        if (isThree) {
          outputString += `3`;
        } else if (isFive) {
          outputString += `5`;
        } else if (!isThree && !isFive) {
          outputString += `2`;
        }
      } else if (output.length === 6) {
        const isNine =
          output.split("").filter((c) => numbers[9].includes(c)).length === 6;
        const isZero =
          output.split("").filter((c) => numbers[0].includes(c)).length === 6;

        if (isNine) {
          outputString += `9`;
        } else if (isZero) {
          outputString += `0`;
        } else if (!isNine && !isZero) {
          outputString += `6`;
        }
      }
    });

    count += parseInt(outputString);
  });
  console.log(`Part Two Signal Count: ${count}`);
};

partOne("puzzle-input");
partTwo("puzzle-input");
