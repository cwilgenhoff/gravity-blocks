import {assert} from 'chai';
import {Block, BlockGrid, COLOURS} from './grid';

describe('Block', () => {
  it('should be created with correct coordinates and one of the valid colours', () => {
    const testCoords = [[1, 2], [4, 9], [0, 0]];

    testCoords.forEach(testCoord => {
      const block = new Block(...testCoord);
      assert.equal(block.x, testCoord[0], 'x is set correctly');
      assert.equal(block.y, testCoord[1], 'y is set correctly');
      assert.ok(COLOURS.indexOf(block.colour) > -1, 'colour is valid');
    });
  });
});

describe('BlockGrid', () => {
  let blockGrid;

  it('should exist', () => {
    blockGrid = new BlockGrid();

    assert.isNotNull(blockGrid, 'grid exists');
  });

  it('should have a default size of 10x10', () => {
    blockGrid = new BlockGrid();

    assert.equal(blockGrid.grid.length, 10);
    blockGrid.grid.forEach(column => assert.equal(column.length, 10));
  });

  it('should have provided size when created', () => {
    blockGrid = new BlockGrid({ width: 3, height: 3 });

    assert.equal(blockGrid.grid.length, 3);
    blockGrid.grid.forEach(column => assert.equal(column.length, 3));
  });

  describe('findBlocks', () => {
    let target;
    let neighbour;

    it('should find all blocks including the one on the left', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(0, 1);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, neighbour, null],
        [null, target, null],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find only the given block (no top left)', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(0, 2);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, neighbour],
        [null, target, null],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the one on the top', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(1, 2);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [null, target, neighbour],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find only the given block (no top right)', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(2, 2);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [null, target, null],
        [null, null, neighbour],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the one on the right', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(2, 1);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [null, target, null],
        [null, neighbour, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find only the given block (no bottom right)', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(2, 0);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [null, target, null],
        [neighbour, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the one on the bottom', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(1, 0);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [neighbour, target, null],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find only the given block (no bottom left)', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(2, 0);
      neighbour.colour = 'blue';

      blockGrid.grid = [
        [neighbour, null, null],
        [null, target, null],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the two on the left', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(2, 1);
      target.colour = 'blue';

      neighbour = new Block(1, 1);
      neighbour.colour = 'blue';

      const secondNeighbour = new Block(0, 1);
      secondNeighbour.colour = 'blue';

      blockGrid.grid = [
        [null, secondNeighbour, null],
        [null, neighbour, null],
        [null, target, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour, secondNeighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the two on the right', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(0, 1);
      target.colour = 'blue';

      neighbour = new Block(1, 1);
      neighbour.colour = 'blue';

      const secondNeighbour = new Block(2, 1);
      secondNeighbour.colour = 'blue';

      blockGrid.grid = [
        [null, target, null],
        [null, neighbour, null],
        [null, secondNeighbour, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour, secondNeighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the two on the top', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 0);
      target.colour = 'blue';

      neighbour = new Block(1, 1);
      neighbour.colour = 'blue';

      const secondNeighbour = new Block(1, 2);
      secondNeighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [target, neighbour, secondNeighbour],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour, secondNeighbour];
      assert.deepEqual(blocks, resultBlocks);
    });

    it('should find all blocks including the two on the bottom', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 2);
      target.colour = 'blue';

      neighbour = new Block(1, 1);
      neighbour.colour = 'blue';

      const secondNeighbour = new Block(1, 0);
      secondNeighbour.colour = 'blue';

      blockGrid.grid = [
        [null, null, null],
        [secondNeighbour, neighbour, target],
        [null, null, null],
      ];

      const blocks = [];
      blockGrid.findBlocks(target, blocks);

      const resultBlocks = [target, neighbour, secondNeighbour];
      assert.deepEqual(blocks, resultBlocks);
    });
  });

  describe('updateGrid', () => {
    let target;
    let neighbour;

    it('should move block on top of block clicked down', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 1);
      target.colour = 'blue';

      neighbour = new Block(1, 2);
      neighbour.colour = 'red';

      blockGrid.grid = [
        [null, null, null],
        [null, target, neighbour],
        [null, null, null],
      ];

      const blocks = [
        target,
      ];
      blockGrid.updateGrid(blocks);

      const targetMoved = new Block(1, 2);
      targetMoved.colour = 'transparent';
      const neighbourMoved = new Block(1, 1);
      neighbourMoved.colour = 'red';

      const result = [
        [null, null, null],
        [null, neighbourMoved, targetMoved],
        [null, null, null],
      ];
      assert.deepEqual(blockGrid.grid, result);
    });

    it('should move the two blocks on top of block clicked down', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(1, 0);
      target.colour = 'blue';

      const redBlock = new Block(1, 1);
      redBlock.colour = 'red';

      const yellowBlock = new Block(1, 2);
      yellowBlock.colour = 'yellow';

      blockGrid.grid = [
        [null, null, null],
        [target, redBlock, yellowBlock],
        [null, null, null],
      ];

      const blocks = [
        target,
      ];
      blockGrid.updateGrid(blocks);

      const targetMoved = new Block(1, 2);
      targetMoved.colour = 'transparent';

      const redBlockMoved = new Block(1, 0);
      redBlockMoved.colour = 'red';

      const yellowBlockMoved = new Block(1, 1);
      yellowBlockMoved.colour = 'yellow';

      const result = [
        [null, null, null],
        [redBlockMoved, yellowBlockMoved, targetMoved],
        [null, null, null],
      ];
      assert.deepEqual(blockGrid.grid, result);
    });

    it('should move all the other blocks on top of block clicked down', () => {
      blockGrid = new BlockGrid({ width: 3, height: 3 });

      target = new Block(0, 0);
      target.colour = 'blue';

      neighbour = new Block(1, 0);
      neighbour.colour = 'blue';

      const secondNeighbour = new Block(1, 1);
      secondNeighbour.colour = 'blue';

      const yellowBlock = new Block(0, 1);
      yellowBlock.colour = 'yellow';

      const redBlock = new Block(1, 2);
      redBlock.colour = 'red';


      blockGrid.grid = [
        [target, yellowBlock, null],
        [neighbour, secondNeighbour, redBlock],
        [null, null, null],
      ];

      const blocks = [
        target,
        neighbour,
        secondNeighbour,
      ];
      blockGrid.updateGrid(blocks);

      const targetMoved = new Block(0, 2);
      targetMoved.colour = 'transparent';

      const neighbourMoved = new Block(1, 1);
      neighbourMoved.colour = 'transparent';

      const secondNeighbourMoved = new Block(1, 2);
      secondNeighbourMoved.colour = 'transparent';

      const yellowBlockMoved = new Block(0, 0);
      yellowBlockMoved.colour = 'yellow';

      const redBlockMoved = new Block(1, 0);
      redBlockMoved.colour = 'red';

      const result = [
        [yellowBlockMoved, null, targetMoved],
        [redBlockMoved, neighbourMoved, secondNeighbourMoved],
        [null, null, null],
      ];
      assert.deepEqual(blockGrid.grid, result);
    });
  });
});
