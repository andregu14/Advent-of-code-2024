import fs from "fs";

const pathTeste: string = "inputs/teste.txt";
const path: string = "inputs/day4input.txt";
let dayFourCount: number = 0;

function readFileDayFour(path: string): string[] {
  try {
    let input: string = fs.readFileSync(path, "utf8");
    return input.split("\n").map(line => line.trim()); // trim to remove \r and whitespace
  } catch (error) {
    console.log("Could not read the file: ", error);
    return [];
  }
}

const lines = readFileDayFour(path);


function findWord(grid: string[], word: string) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  // Reset count
  dayFourCount = 0;

  // Search all directions
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const directions = [
        [0, 1],   // horizontal right
        [0, -1],  // horizontal left
        [1, 0],   // vertical down
        [-1, 0],  // vertical up
        [1, 1],   // diagonal down-right
        [1, -1],  // diagonal down-left
        [-1, 1],  // diagonal up-right
        [-1, -1]  // diagonal up-left
      ];

      for (const [rowDir, colDir] of directions) {
        if (checkDirection(grid, word, row, col, rowDir, colDir)) {
          dayFourCount++;
        }
      }
    }
  }
}

function checkDirection(
  grid: string[],
  word: string,
  row: number,
  col: number,
  rowDir: number,
  colDir: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * rowDir;
    const newCol = col + i * colDir;

    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length ||
      grid[newRow][newCol] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}

findWord(lines, "XMAS");
console.log(`Part one solution: ${dayFourCount}`);

// part two

function findXPattern(grid: string[]): number {
    const numRows = grid.length;
    const numCols = grid[0].length;
    let count = 0;
  
    // Loop through each cell in the grid to find "A"
    for (let row = 1; row < numRows - 1; row++) {
      for (let col = 1; col < numCols - 1; col++) {
        if (grid[row][col] === 'A') {
          // Check for X pattern around "A"
          if (checkXPattern(grid, row, col)) {
            count++;
          }
        }
      }
    }
  
    return count;
  }
  
  function checkXPattern(grid: string[], row: number, col: number): boolean {
    const topLeft = grid[row - 1][col - 1] === 'M' && grid[row + 1][col + 1] === 'S' || grid[row - 1][col - 1] === 'S' && grid[row + 1][col + 1] === 'M' ;
    const topRight = grid[row - 1][col + 1] === 'M' && grid[row + 1][col - 1] === 'S' || grid[row - 1][col + 1] === 'S' && grid[row + 1][col - 1] === 'M';
    // const bottomLeft = grid[row + 1][col - 1] === 'M' && grid[row - 1][col + 1] === 'S';
    // const bottomRight = grid[row + 1][col + 1] === 'M' && grid[row - 1][col - 1] === 'S';
  
    return (topLeft && topRight);
  }

  
  // Find and count X patterns
  const xPatternCount = findXPattern(lines);
  console.log(`Part two solution: ${xPatternCount}`);