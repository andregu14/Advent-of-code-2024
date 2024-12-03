import fs from "fs";
import { arrayBuffer } from "stream/consumers";

let safeCount = 0;
let safeCountTwo = 0;

const teste = "inputs/teste.txt";
const input = "inputs/day2input.txt";

// Part One

function readTxtLineSync(path: string) {
  const data = fs.readFileSync(path, "utf8");
  const lines = data.split("\n");
  lines.forEach((line: string) => {
    const array = line.trim().split(" ").map(Number);
    isArraySafe(array);
  });

  console.log(`Part one solution: ${safeCount}`);
}

function readTxtLineSyncPartTwo(path: string) {
  const data = fs.readFileSync(path, "utf8");
  const lines = data.split("\n");
  lines.forEach((line: string) => {
    const array = line.trim().split(" ").map(Number);
    if (isArraySafePartTwo(array)) {
      safeCountTwo++;
  }
  });

  console.log(`Part two solution: ${safeCountTwo}`);
}

function isArraySafe(array: number[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i + 1]) {
      if (array[i + 1] === array[i]) {
        return;
      }
    }
  }

  if (array[0] > array[1]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1]) {
        if (array[i] < array[i + 1]) {
          return;
        } else if (array[i] - array[i + 1] > 3) {
          return;
        }
      }
    }
    safeCount++;
  }

  if (array[0] < array[1]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1]) {
        if (array[i] > array[i + 1]) {
          return;
        } else if (array[i] - array[i + 1] < -3) {
          return;
        } 
      }
    }
    safeCount++;
  }
}

// Part two


function isArraySafePartTwo(array: number[]): boolean {
  // Try removing each number one by one
  for (let removeIndex = 0; removeIndex < array.length; removeIndex++) {
      const clonedArray = array.filter((_, index) => index !== removeIndex);
      
      if (isSafeSequence(clonedArray)) {
          return true;
      }
  }
  return false;
}

function isSafeSequence(array: number[]): boolean {
  // Check if the array is strictly ascending or descending
  // with no more than 3 units of difference between adjacent elements
  const isStrictAscending = isAscendingValid(array);
  const isStrictDescending = isDescendingValid(array);
  
  return isStrictAscending || isStrictDescending;
}

function isAscendingValid(array: number[]): boolean {
  for (let i = 0; i < array.length - 1; i++) {
      // Check if next number is greater and difference is not more than 3
      if (array[i] >= array[i + 1] || array[i + 1] - array[i] > 3) {
          return false;
      }
  }
  return true;
}

function isDescendingValid(array: number[]): boolean {
  for (let i = 0; i < array.length - 1; i++) {
      // Check if next number is smaller and difference is not more than 3
      if (array[i] <= array[i + 1] || array[i] - array[i + 1] > 3) {
          return false;
      }
  }
  return true;
}



readTxtLineSync(input);
readTxtLineSyncPartTwo(input)

