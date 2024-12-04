import fs from "fs";
import { arrayBuffer } from "stream/consumers";

const path = "inputs/day3input.txt";

function readFile(path: string) {
  try {
    const input = fs.readFileSync(path, "utf8");

    // Match the initial `mul(number,number)` patterns
    const regex: RegExp = /mul\((-?\d+\.?\d*),(-?\d+\.?\d*)\)/g;
    const matches: string[] | null = input.match(regex);

    const numbersToSum: number[] = [];
    let finalResult: number = 0;

    if (matches) {
      // Extract the numbers and convert to array of arrays
      const numberRegex: RegExp = /-?\d+\.?\d*/g;
      const result: number[][] = matches.map((match: string) => {
        const numbers: number[] = match.match(numberRegex)!.map(Number);
        return numbers;
      });

      result.forEach((element) => {
        for (let i = 0; i < element.length; i++) {
          numbersToSum.push(element[i] * element[i + 1]);
          break;
        }
      });

      numbersToSum.forEach((element) => {
        finalResult += element;
      });

      console.log(`Part one solution: ${finalResult}`);
    } else {
      console.log("No matches found");
    }
  } catch (error) {
    console.log("Could not read the file: ", error);
    return [];
  }
}

readFile(path);

// Part Two

function readFilePartTwo(path: string) {
  try {
    const input: string = fs.readFileSync(path, "utf8");

    const regexPartTwo: RegExp =
      /mul\((-?\d+\.?\d*),(-?\d+\.?\d*)\)|don't\(\)|do\(\)/g;
    const matches: string[] | null = input.match(regexPartTwo);

    let processed: number = 0;
    let pass: boolean = true;
    let newArray: string[] | null = [];

    if (matches) {
      for (let i = 0; i < matches.length; i++) {
        matches[i] === "don't()"
          ? (pass = false)
          : matches[i] === "do()"
          ? (pass = true)
          : processed++;
        if (!pass) {
          continue;
        } else {
          newArray.push(matches[i]);
        }
      }

      if (newArray.length > 0) {
        // Extract the numbers and convert to array of arrays
        const numberRegex: RegExp = /-?\d+\.?\d*/g;
        const result: number[][] = newArray.map((match: string) => {
          const numbers: number[] | null =
            match.match(numberRegex)?.map(Number) || [];
          return numbers;
        });

        const newArrayFiltered: number[][] = result.filter(
          (innerArray) => innerArray.length > 0
        );

        const numbersToSum: number[] = [];
        let finalResult: number = 0;

        newArrayFiltered.forEach((element) => {
          for (let i = 0; i < element.length; i++) {
            numbersToSum.push(element[i] * element[i + 1]);
            break;
          }
        });

        numbersToSum.forEach((element) => {
          finalResult += element;
        });

        console.log(`Part two solution: ${finalResult}`);
      }
    }
  } catch (error) {
    console.log("Could not read the file: ", error);
  }
}

readFilePartTwo(path);
