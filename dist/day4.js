"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const pathteste = "inputs/day4teste.txt";
const path = "inputs/day4input.txt";
let input;
function readFileDayFour(path) {
    try {
        input = fs_1.default.readFileSync(path, "utf8");
        return input.split('\n');
    }
    catch (error) {
        console.log("Could not read the file: ", error);
        return [];
    }
}
const lines = readFileDayFour(path);
console.log(lines[1]);
function findWord(grid, word) {
    const numRows = grid.length;
    const numCols = grid[0].length;
    return true;
}
readFileDayFour(path);
//# sourceMappingURL=day4.js.map