import FallingNumber from "./fallingNumber";

// for each round matrix, if the value is 1 the function creates 
// falling number object and returns array of falling numbers
export const buildRound = (game, round) => {
  let fallingNumbers = [];
  if (round) {
    round.forEach((row, rowIndex) => {
      row.forEach((fallingNumber, fallingNumberIndex) => {
        if (fallingNumber === 1) {
          let position = {
            x: 80 * fallingNumberIndex,
            y: 75 + 24 * rowIndex
          };
          fallingNumbers.push(new FallingNumber(game, position));
        }
      });
    });
    return fallingNumbers;
  } else {
    return [];
  }
};

export const round1 = [
  [1, 0, 1, 0, 0, 0, 1, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0]
];

export const round2 = [
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
];

export const round3 = [
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0]
];
