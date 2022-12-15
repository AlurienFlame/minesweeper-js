import { Minesweeper } from './minesweeper.js';

const gameElem = document.getElementById('game');
const mineCountElem = document.getElementById('mine-count');
const timeElem = document.getElementById('time');
// const gameOverElem = document.getElementById('game-over');
const restartElem = document.getElementById('restart');
const ROWS = 20;
const COLS = 20;
// TODO: Config sliders in UI
const minesweeper = new Minesweeper(ROWS, COLS, 30, gameElem, mineCountElem, timeElem, restartElem);

// Set CSS variables for the grid
document.documentElement.style.setProperty('--columns', COLS);
document.documentElement.style.setProperty('--rows', ROWS);