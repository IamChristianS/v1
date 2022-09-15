import { init } from './config';
import { playground } from './playground';
import { game } from './game';
import { sounds } from './audio';

export const tetromino = {
  number: 0,
  position: 0,
  rotation: 0,
  current: [],
  canBeSaved: true,
  canMoveDown: true,
  saved: {},
  next: {},
  theTetrominoes: [],
  theTetrominoesPreview: [],
  createTetrominoes(columns) {
    const iTetromino = [
      [1, columns + 1, columns * 2 + 1, columns * 3 + 1],
      [0, 1, 2, 3],
      [1, columns + 1, columns * 2 + 1, columns * 3 + 1],
      [0, 1, 2, 3],
    ];
    const llTetromino = [
      [0, columns, columns + 1, columns + 2],
      [1, 2, columns + 1, columns * 2 + 1],
      [0, 1, 2, columns + 2],
      [1, columns + 1, columns * 2, columns * 2 + 1],
    ];
    const lrTetromino = [
      [2, columns, columns + 1, columns + 2],
      [1, columns + 1, columns * 2 + 1, columns * 2 + 2],
      [0, 1, 2, columns],
      [0, 1, columns + 1, columns * 2 + 1],
    ];
    const oTetromino = [
      [1, 2, columns + 1, columns + 2],
      [1, 2, columns + 1, columns + 2],
      [1, 2, columns + 1, columns + 2],
      [1, 2, columns + 1, columns + 2],
    ];
    const sTetromino = [
      [1, 2, columns, columns + 1],
      [1, columns + 1, columns + 2, columns * 2 + 2],
      [1, 2, columns, columns + 1],
      [1, columns + 1, columns + 2, columns * 2 + 2],
    ];
    const zTetromino = [
      [0, 1, columns + 1, columns + 2],
      [2, columns + 1, columns + 2, columns * 2 + 1],
      [0, 1, columns + 1, columns + 2],
      [2, columns + 1, columns + 2, columns * 2 + 1],
    ];
    const tTetromino = [
      [1, columns, columns + 1, columns + 2],
      [1, columns + 1, columns + 2, columns * 2 + 1],
      [0, 1, 2, columns + 1],
      [2, columns + 1, columns + 2, columns * 2 + 2],
    ];

    return [iTetromino, llTetromino, lrTetromino, oTetromino, sTetromino, zTetromino, tTetromino];
  },
  initPreview() {
    const number = Math.floor(Math.random() * this.theTetrominoes.length);
    const rotation = Math.floor(Math.random() * this.theTetrominoes[this.number].length);
    const tetromino = this.theTetrominoesPreview[number][rotation];
    this.next = {
      number,
      rotation,
      tetromino,
    };
  },
  initSaved() {
    this.saved = {
      number: 0,
      rotation: 0,
      tetromino: [],
    };
  },
  initTetromino() {
    console.log('init new tetromino');
    if (game.gameStatut === 'notStarted') {
      this.theTetrominoes = this.createTetrominoes(init.columns);
      this.theTetrominoesPreview = this.createTetrominoes(init.previewSize);
      this.initPreview();
    }

    this.number = this.next.number;
    this.rotation = this.next.rotation;
    this.position = Math.floor(init.columns / 2 - 1);
    this.canBeSaved = true;
    this.canMoveDown = true;

    this.initPreview();

    console.log('tetromino number', this.number);
    this.current = this.theTetrominoes[this.number][this.rotation];
  },
  saveTetromino() {
    console.log('saving tetromino');
    this.saved = {
      number: this.number,
      rotation: this.rotation,
      tetromino: this.theTetrominoesPreview[this.number][this.rotation],
    };
  },
  switchSaved() {
    const wasSaved = this.saved;
    this.saveTetromino();
    this.number = wasSaved.number;
    this.rotation = wasSaved.rotation;
    this.current = this.theTetrominoes[this.number][this.rotation];
    this.position = Math.floor(init.columns / 2 - 1);
    this.canBeSaved = false;
    this.canMoveDown = true;
  },
  rotateTetromino(direction) {
    let tempRotationIndex = this.rotation;
    direction === 'right' ? tempRotationIndex++ : tempRotationIndex--;
    tempRotationIndex >= this.theTetrominoes[this.number].length ? (tempRotationIndex = 0) : null;
    tempRotationIndex < 0 ? (tempRotationIndex = this.theTetrominoes[this.number].length - 1) : null;
    // testing boudaries
    const tempTetromino = this.theTetrominoes[this.number][tempRotationIndex];
    const willTouchLimits = tempTetromino.some((index) => {
      return playground.blocks[this.position + index + init.columns].classList.contains('taken');
    });

    const isAtRightEdge = tempTetromino.some((index) => {
      return (index + this.position) % init.columns === 0;
    });

    const isAtLeftEdge = tempTetromino.some((index) => {
      return (index + this.position + 1) % init.columns === 0;
    });
    if (willTouchLimits || (isAtRightEdge && isAtLeftEdge)) {
      console.log('rotation not possible due to boudaries conflict');
    } else {
      sounds.play(sounds.rotate);
      console.log('rotating tetromino to the ' + direction);
      this.undraw();
      this.current = tempTetromino;
      this.rotation = tempRotationIndex;
      this.draw();
    }
  },
  drawPreview() {
    console.log('drawing preview tetromino');
    playground.cleanPreviewGrid();
    this.next.tetromino.forEach((index) => {
      playground.preview[index].classList.add('tetromino');
      playground.preview[index].classList.add('colorT' + this.next.number.toString());
    });
  },
  drawSaved() {
    console.log('drawing saved tetromino');
    playground.cleanSavedGrid();
    this.saved.tetromino.forEach((index) => {
      playground.saved[index].classList.add('tetromino');
      playground.saved[index].classList.add('colorT' + this.saved.number.toString());
    });
  },
  draw() {
    this.current.forEach((index) => {
      playground.blocks[this.position + index].classList.add('tetromino');
      playground.blocks[this.position + index].classList.add('colorT' + this.number.toString());
    });
  },
  drawNew() {
    this.initTetromino();
    this.draw();
    this.drawPreview();
  },
  undraw() {
    this.current.forEach((index) => {
      playground.blocks[this.position + index].className = 'playgroundBlock';
    });
  },
  moveDown() {
    this.undraw();
    this.position += init.columns;
    this.draw();
  },
  smackDown() {
    console.log('smack tetromino down');
    if (this.canMoveDown) {
      this.undraw();
      while (!this.freeze()) {
        this.position += init.columns;
      }
      sounds.play(sounds.smack);
      sounds.justSmashed = true;
      this.draw();
    } else {
      console.log(`tetromino can't go deeper than that`);
    }
  },
  moveLeft() {
    const isAtLeftEdge = this.current.some((index) => {
      return (index + this.position) % init.columns === 0;
    });
    if (!isAtLeftEdge && !this.lateralBlock('left')) {
      console.log('moving tetromino left');
      sounds.play(sounds.move);
      this.undraw();
      this.position--;
      this.draw();
    } else {
      console.log('left boudary prevents tetromino movement');
    }
  },
  pushDown() {
    if (playground.deletingAnimation !== 'init') {
      return;
    }
    if (!this.freeze() && this.canMoveDown) {
      console.log('moving tetromino down');
      sounds.play(sounds.move);
      this.undraw();
      this.position += init.columns;
      this.draw();
    } else {
      this.canMoveDown ? sounds.play(sounds.land) : null;
      this.canMoveDown = false;
      console.log('bottom boudary prevents tetromino movement');
    }
  },
  moveRight() {
    const isAtRightEdge = this.current.some((index) => {
      return (index + this.position + 1) % init.columns === 0;
    });
    if (!isAtRightEdge && !this.lateralBlock('right')) {
      console.log('moving tetromino right');
      sounds.play(sounds.move);
      this.undraw();
      this.position++;
      this.draw();
    } else {
      console.log('right boudary prevents tetromino movement');
    }
  },
  // when the current tetromino encouters a boundary it will freeze and become part of the boudaries.
  freeze() {
    const freezeCondition = this.current.some((index) =>
      playground.blocks[this.position + index + init.columns].classList.contains('taken')
    );
    if (freezeCondition) {
      console.log('TOUCH DOWN! new tetromino in the way');
      this.canMoveDown = false;
      this.current.forEach((index) => {
        playground.blocks[index + this.position].classList.add('taken');
      });
      return true;
    }
    return false;
  },
  lateralBlock(side) {
    let checkSide;
    side === 'right' ? (checkSide = 1) : (checkSide = -1);
    return this.current.some((index) =>
      playground.blocks[this.position + index + checkSide].classList.contains('taken')
    );
  },
};
