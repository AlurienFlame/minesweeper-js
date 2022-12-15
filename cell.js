export class Cell {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;

    // Create the element
    this.element = document.createElement('div');
    this.element.classList.add('cell');
    this.element.classList.add('hidden');
    this.board.element.appendChild(this.element);
    this.element.addEventListener('mouseup', this.onMouseUp.bind(this));

    this.hasMine = false;
    this.isRevealed = false;
    this.isFlagged = false;
  }

  onMouseUp(e) {
    if (this.board.isGameOver) return;

    switch (e.button) {
      case 0:
        this.reveal();
        break;
      case 1:
        this.getAdjacentCells().filter((cell) => !cell.isFlagged).forEach((cell) => cell.reveal());
        break;
      case 2:
        this.toggleFlag();
        break;
    }
  }

  reveal() {
    if (this.isRevealed) return;
    if (this.isFlagged) return;

    if (this.board.minesPlanted === 0) {
      this.board.scatterMines(this);
    }

    this.isRevealed = true;
    this.element.classList.remove('hidden');

    if (this.hasMine) {
      this.element.classList.remove('flagged');
      this.element.classList.add('exploded');
      if (!this.board.isGameOver) this.board.gameOver();
    } else {
      this.element.classList.add('revealed');
      let adjacentMines = this.countAdjacentMines();
      if (adjacentMines) {
        this.element.innerText = adjacentMines;
        this.element.classList.add(`adj-${adjacentMines}`);
      } else {
        // Floodfill borked at edge of screen
        this.getAdjacentCells().forEach((cell) => cell.reveal());
      }
    }
  }

  toggleFlag() {
    if (this.isRevealed) return;

    this.isFlagged = !this.isFlagged;
    this.element.classList.toggle('flagged');
    this.board.updateMinesLeft();
  }

  plantMine() {
    this.hasMine = true;
    this.board.minesPlanted++;
    this.board.updateMinesLeft();
  }

  countAdjacentMines() {
    let adjacentCells = this.getAdjacentCells();
    let adjacentMines = adjacentCells.filter((cell) => cell.hasMine);
    return adjacentMines.length;
  }

  getAdjacentCells() {
    let adjacentCells = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        let x = this.x + i;
        let y = this.y + j;
        let cell = this.board.cells[`${x},${y}`];
        if (cell?.isRevealed) continue;
        if (cell) adjacentCells.push(cell);
      }
    }
    return adjacentCells;
  }
}