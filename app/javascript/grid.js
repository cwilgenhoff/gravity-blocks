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

  static reset() {
    const el = document.querySelector('#gridEl');
    el.innerHTML = '';
  }

  blockClicked(e, block) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    const blocks = [];
    this.findBlocks(block, blocks);

    if (!blocks.length) {
      return;
    }

    this.updateGrid(blocks);
    BlockGrid.reset();
    this.render();
  }

  updateGrid(blocks) {
    if (!blocks.length) {
      return;
    }

    blocks.forEach(block => {
      BlockGrid.hideBlock(block);

      const col = this.grid[block.x];
      this.grid[block.x] = [
        ...col.slice(0, block.y),
        ...col.slice(block.y + 1),
        block,
      ];

      this.grid[block.x].forEach((movedBlock, index) => {
        if (movedBlock) {
          movedBlock.y = index;
        }
      });
    });
  }

  findBlocks(block, blocks) {
    if (!BlockGrid.isValidBlock(block)) {
      return false;
    }

    if (blocks.includes(block)) {
      return false;
    }

    blocks.push(block);

    const searchPath = [
      this.getBlockFromGrid(block.x - 1, block.y),
      this.getBlockFromGrid(block.x, block.y + 1),
      this.getBlockFromGrid(block.x + 1, block.y),
      this.getBlockFromGrid(block.x, block.y - 1),
    ];

    searchPath.forEach(target => {
      if (target && BlockGrid.isEqualBlock(block, target)) {
        this.findBlocks(target, blocks);
      }
    });

    return true;
  }

  getBlockFromGrid(x, y) {
    if (!this.grid[x] || !this.grid[x][y]) {
      return undefined;
    }

    return this.grid[x][y];
  }

  static isEqualBlock(leftBlock, rightBlock) {
    return leftBlock && rightBlock && leftBlock.colour === rightBlock.colour;
  }

  static isValidBlock(block) {
    if (!block) {
      return false;
    }

    return COLOURS.indexOf(block.colour) > -1;
  }

  static hideBlock(block) {
    if (block) {
      block.colour = 'transparent';
    }
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
