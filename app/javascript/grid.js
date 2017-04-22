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
  constructor({ width = MAX_X, height = MAX_Y } = {}) {
    this.size = {
      width,
      height,
    };
    this.grid = this.generateGrid();

    return this;
  }

  generateGrid() {
    const grid = [];
    for (let x = 0; x < this.size.width; x++) {
      const col = [];
      for (let y = 0; y < this.size.height; y++) {
        col.push(new Block(x, y));
      }

      grid.push(col);
    }

    return grid;
  }

  render(el = document.querySelector('#gridEl')) {
    for (let x = 0; x < this.size.width; x++) {
      const colId = `col_${x}`;
      const colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = colId;
      el.appendChild(colEl);

      for (let y = this.size.height - 1; y >= 0; y--) {
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

  reset() {
    const el = document.querySelector('#gridEl');
    el.innerHTML = '';
  }

  blockClicked(e, block) {
    e.preventDefault();

    const blocks = [];
    this.findBlocks(block, blocks);
    console.log(blocks);
  }

  findBlocks(block, blocks) {
    if (!block) {
      return false;
    }

    if (blocks.includes(block)) {
      return false;
    }

    blocks.push(block);

    const searchPath = [
      this.getFromGrid(block.x - 1, block.y),
      this.getFromGrid(block.x, block.y + 1),
      this.getFromGrid(block.x + 1, block.y),
      this.getFromGrid(block.x, block.y - 1),
    ];

    searchPath.forEach(target => {
      if (target && this.isEqualBlock(block, target)) {
        this.findBlocks(target, blocks);
      }
    });

    return blocks;
  }

  getFromGrid(x, y) {
    if (this.grid[x] && this.grid[x][y]) {
      return this.grid[x][y];
    }
  }

  isEqualBlock(leftBlock, rightBlock) {
    return leftBlock && rightBlock && leftBlock.colour === rightBlock.colour;
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
