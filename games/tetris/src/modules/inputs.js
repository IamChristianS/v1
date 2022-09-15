import { game } from './game';
import { tetromino } from './tetrominoes';

let keys = {
  left: 37,
  right: 39,
  down: 40,
  smackDown: 38,
  rotLeft: 65,
  rotRight: 90,
  save: 69,
};

export const inputs = {
  handleKeyPress(e) {
    if (game.gameStatut === 'play') {
      if (e.keyCode === keys.left) {
        tetromino.moveLeft();
      }
      if (e.keyCode === keys.right) {
        tetromino.moveRight();
      }
      if (e.keyCode === keys.down) {
        tetromino.pushDown();
      }
      if (e.keyCode === keys.smackDown) {
        tetromino.smackDown();
      }
      if (e.keyCode === keys.rotLeft) {
        tetromino.rotateTetromino('left');
      }
      if (e.keyCode === keys.rotRight) {
        tetromino.rotateTetromino('right');
      }
      if (e.keyCode === keys.save) {
        game.saveTetromino();
      }
    }
  },
  handleTouchPress(e) {
    if (game.gameStatut === 'play') {
      console.log(e.target.id);
      if (e.target.id === 'controlRight') {
        tetromino.moveRight();
      }
      if (e.target.id === 'controlLeft') {
        tetromino.moveLeft();
      }
      if (e.target.id === 'controlDown') {
        tetromino.pushDown();
      }
      if (e.target.id === 'controlUp') {
        tetromino.smackDown();
      }
      if (e.target.id === 'controlRotRight') {
        tetromino.rotateTetromino('right');
      }
      if (e.target.id === 'controlRotLeft') {
        tetromino.rotateTetromino('left');
      }
      if (e.target.id === 'controlSave') {
        game.saveTetromino();
      }
    }
  },
  handleStart() {
    game.start();
  },
  handleReset() {
    game.reset();
  },
  handleBackMenu() {
    game.backMenu();
  },
  handleStart() {
    game.start();
  },
  setListener(bool) {
    if (bool) {
      console.log('setting event listeners');
      document
        .getElementById('touchControlContainer')
        .addEventListener('click', this.handleTouchPress);
      document.getElementById('resetButton').addEventListener('click', this.handleReset);
      document.getElementById('startButton').addEventListener('click', this.handleStart);
      document.getElementById('backMenu').addEventListener('click', this.handleBackMenu);
      document.addEventListener('keydown', this.handleKeyPress);
    } else {
      console.log('removing event listeners');
      document
        .getElementById('touchControlContainer')
        .removeEventListener('click', this.handleTouchPress);
      document.getElementById('resetButton').removeEventListener('click', this.handleReset);
      document.getElementById('startButton').removeEventListener('click', this.handleReset);
      document.getElementById('backMenu').removeEventListener('click', this.handleReset);
      document.removeEventListener('keydown', this.handleKeyPress);
    }
  },
};
