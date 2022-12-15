import { Cell } from './cell.js';

export class Minesweeper {
  constructor(
    widthElem,
    heightElem,
    minesElem,
    element,
    mineCountElem,
    timeElem,
    restartElem) {
    this.element = element;
    this.mineCountElem = mineCountElem;
    this.timeElem = timeElem;

    this.isGameOver = false;
    this.minesPlanted = 0;

    this.element.addEventListener('contextmenu', (e) => e.preventDefault());
    setInterval(this.updateTime.bind(this), 100);
    restartElem.addEventListener('click', function () { this.newGame.call(this, widthElem, heightElem, minesElem); }.bind(this));

    this.newGame(
      widthElem,
      heightElem,
      minesElem
    );
  }

  newGame(
    widthElem,
    heightElem,
    minesElem
  ) {
    this.width = widthElem.value;
    this.height = heightElem.value;
    this.mineCount = minesElem.value;

    // Set CSS variables for the grid
    document.documentElement.style.setProperty('--columns', this.width);
    document.documentElement.style.setProperty('--rows', this.height);

    // Wipe the board
    this.cells = {};
    this.element.innerHTML = '';

    // Instantiate cells and their elements
    // FIXME: Restarting on high dimensions is slow, probably because of this
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.cells[`${i},${j}`] = new Cell(i, j, this);
      }
    }

    // Update header values
    this.minesPlanted = 0;
    this.updateMinesLeft();
    this.timeStarted = Date.now();

    this.isGameOver = false;
    this.element.classList.remove('game-over');
  }

  updateTime() {
    if (this.isGameOver) return;
    let seconds = Math.floor((Date.now() - this.timeStarted) / 1000);
    if (seconds >= 60) {
      let minutes = Math.floor(seconds / 60);
      seconds %= 60;
      this.timeElem.innerText = `${minutes}:${seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;
    } else {
      this.timeElem.innerText = seconds;
    }
  }

  scatterMines(exclude) {
    let viableCells = Object.values(this.cells).filter((cell) => cell != exclude);
    for (let i = 0; i < this.mineCount; i++) {
      let randomIndex = Math.floor(Math.random() * viableCells.length);
      let cell = viableCells[randomIndex];
      cell.plantMine();
      viableCells.splice(randomIndex, 1);
      if (!viableCells.length) {
        console.warn('Tried to plant more mines than there are available cells.');
        break;
      }
    }
  }

  updateMinesLeft() {
    let numMinesShouldPlant = Math.min(this.mineCount, this.width * this.height - 1);
    let numFlags = Object.values(this.cells).filter((cell) => cell.isFlagged).length;
    let minesLeft = (this.minesPlanted || numMinesShouldPlant) - numFlags;
    this.mineCountElem.innerText = minesLeft;
    if (minesLeft === 0) {
      this.checkVictory();
    }
  }

  checkVictory() {
    let unflaggedMines = Object.values(this.cells).some((cell) => cell.hasMine && !cell.isFlagged);
    if (!unflaggedMines) {
      // TODO: Differentiate between win and lose outcomes
      this.gameOver();
    }
  }


  gameOver() {
    this.isGameOver = true;
    this.element.classList.add('game-over');
    Object.values(this.cells).filter((cell) => cell.hasMine).forEach((cell) => cell.reveal());
  }
}