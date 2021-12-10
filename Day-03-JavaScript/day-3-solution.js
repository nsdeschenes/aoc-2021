const fs = require("fs");

const partOne = (file) => {
  let bitChecks = [];

  const reports = fs.readFileSync(file, "utf-8").split("\n");

  [...reports[0]].forEach(() => {
    bitChecks.push({
      one: 0,
      zero: 0,
    });
  });

  reports.forEach((report) => {
    [...report].forEach((c, i) => {
      if (parseInt(c) === 1) {
        bitChecks[i].one++;
      } else {
        bitChecks[i].zero++;
      }
    });
  });

  let gammaRate = ``;
  let epsilonRate = ``;

  bitChecks.forEach((bitCounter) => {
    if (bitCounter.one > bitCounter.zero) {
      gammaRate += `1`;
      epsilonRate += `0`;
    } else {
      gammaRate += `0`;
      epsilonRate += `1`;
    }
  });

  console.log(`Gamma Rate: ${gammaRate}, ${parseInt(gammaRate, 2)}`);
  console.log(`Gamma Rate: ${epsilonRate}, ${parseInt(epsilonRate, 2)}`);
  console.log(
    `Power Consumption: ${parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)}`
  );
};

const partTwo = (file) => {
  const bitChecks = [];

  const getReports = () => {
    return (reports = fs.readFileSync(file, "utf-8").split("\n"));
  };

  const calculateBitCounts = (reports) => {
    bitChecks.length = 0;

    [...reports[0]].forEach(() => {
      bitChecks.push({
        one: 0,
        zero: 0,
      });
    });

    reports.forEach((report) => {
      [...report].forEach((c, i) => {
        if (parseInt(c) === 1) {
          bitChecks[i].one++;
        } else {
          bitChecks[i].zero++;
        }
      });
    });
  };

  const calculateOxygen = () => {
    let reports = getReports();

    calculateBitCounts(reports);

    bitChecks.every((bitCount, i) => {
      let checkBit = 1;

      if (bitCount.one >= bitCount.zero) {
        checkBit = 0;
      }

      reports.forEach((report, j) => {
        if (parseInt(report[i]) === checkBit) {
          reports[j] = null;
        }
      });

      reports = reports.filter((n) => n);

      if (reports.length === 1) {
        return false;
      }

      calculateBitCounts(reports);
      return true;
    });

    console.log(`Oxygen Generator Rate: ${parseInt(reports[0], 2)}`);
    return parseInt(reports[0], 2);
  };

  const calculateCO2 = () => {
    let reports = getReports();

    calculateBitCounts(reports);

    bitChecks.every((bitCount, i) => {
      let checkBit = 0;

      if (bitCount.zero <= bitCount.one) {
        checkBit = 1;
      }

      reports.forEach((report, j) => {
        if (parseInt(report[i]) === checkBit) {
          reports[j] = null;
        }
      });

      reports = reports.filter((n) => n);

      if (reports.length === 1) {
        return false;
      }

      calculateBitCounts(reports);

      return true;
    });

    console.log(`CO2 Scrubbing Rate: ${parseInt(reports[0], 2)}`);
    return parseInt(reports[0], 2);
  };

  const oxygen = calculateOxygen();
  const co2 = calculateCO2();

  console.log(`Current Life Support Rating: ${oxygen * co2}`);
};

partOne("puzzle-input");
partTwo("puzzle-input");
