import { assert } from 'chai';
import { Block, BlockGrid, COLOURS } from './grid';

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

  describe('blockClicked', () => {

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

      assert.equal(blocks.length, 2);
      blocks.forEach(block => {
        assert.equal(block.colour, 'blue');
      });
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

      assert.equal(blocks.length, 1);
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

      assert.equal(blocks.length, 2);
      blocks.forEach(block => {
        assert.equal(block.colour, 'blue');
      });
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

      assert.equal(blocks.length, 1);
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

      assert.equal(blocks.length, 2);
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

      assert.equal(blocks.length, 1);
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

      assert.equal(blocks.length, 2);
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

      assert.equal(blocks.length, 1);
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

      assert.equal(blocks.length, 3);
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

      assert.equal(blocks.length, 3);
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

      assert.equal(blocks.length, 3);
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

      assert.equal(blocks.length, 3);
    });
  });
});
