import { Minesweeper } from './minesweeper.js';

const gameElem = document.getElementById('game');
const mineCountElem = document.getElementById('mine-count');
const timeElem = document.getElementById('time');
// const gameOverElem = document.getElementById('game-over');
const restartElem = document.getElementById('restart');

// Get sliders
const widthSlider = document.getElementById('width-slider');
const heightSlider = document.getElementById('height-slider');
const minesSlider = document.getElementById('mines-slider');

const minesweeper = new Minesweeper(
  widthSlider,
  heightSlider,
  minesSlider,
  gameElem,
  mineCountElem,
  timeElem,
  restartElem
);

const widthDisplay = document.getElementById('width-display');
const heightDisplay = document.getElementById('height-display');
const minesDisplay = document.getElementById('mines-display');

widthSlider.addEventListener('input', function () {
  widthDisplay.innerText = widthSlider.value;
});
heightSlider.addEventListener('input', function () {
  heightDisplay.innerText = heightSlider.value;
});
minesSlider.addEventListener('input', function () {
  minesDisplay.innerText = minesSlider.value;
});
widthDisplay.innerText = widthSlider.value;
heightDisplay.innerText = heightSlider.value;
minesDisplay.innerText = minesSlider.value;
