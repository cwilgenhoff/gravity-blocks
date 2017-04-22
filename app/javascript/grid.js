export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];

    for (let x = 0; x < MAX_X; x++) {
      const col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }

    return this;
  }

  render(el = document.querySelector('#gridEl')) {
    for (let x = 0; x < MAX_X; x++) {
      const colId = `col_${x}`;
      const colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = colId;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const blockId = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = blockId;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }

    return this;
  }

  blockClicked(e, block) {
    console.log(e, block);
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
