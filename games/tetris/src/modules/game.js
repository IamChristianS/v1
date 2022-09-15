import { init } from './config';
import { timer } from './timer';
import { tetromino } from './tetrominoes';
import { display } from './display';
import { playground } from './playground';
import { inputs } from './inputs';
import { menu } from './menu';
import { sounds } from './audio';

export const game = {
  gameScore: 0,
  lines: 8,
  timerId: 0,
  gameStatut: 'notStarted',
  gameMode: '',
  speed: 0,
  init() {
    playground.generateAllGrid();
    inputs.setListener(true);
    this.restore();
  },
  quit() {
    this.restore();
    playground.removeAllGrid();
    document.getElementById('startButton').innerHTML = 'Start';
    document.getElementById('startButton').classList.add('buttonPulse');
    inputs.setListener(false);
    sounds.stop(sounds.theme1);
  },
  restore() {
    console.log('restoring game');
    this.gameScore = 0;
    this.lines = 0;
    init.gameMode[this.gameMode].init();
    this.updateScore(0);
    this.gameStatut = 'notStarted';
    display.endGame(false);
    display.pause(false);
    display.sidePanelInfo();
    tetromino.initSaved();
    playground.deletingAnimation = 'init';
    clearInterval(this.timerId);
  },
  start() {
    if (this.gameStatut === 'lost' || this.gameStatut === 'end') {
      this.reset();
    }
    if (this.gameStatut === 'notStarted') {
      console.log('new game is starting');
      sounds.playSong(sounds.playingTheme);
      tetromino.drawNew();
      document.getElementById('startButton').classList.remove('buttonPulse');
    }
    if (this.gameStatut === 'pause' || this.gameStatut === 'notStarted') {
      sounds.playSong(sounds.playingTheme);
      this.timerId = setInterval(this.run.bind(this), init.speedArray[this.speed - 1]);
      console.log('game mode', this.gameMode);
      init.gameMode[this.gameMode].start();
      document.getElementById('startButton').innerHTML = 'Pause';
      document.getElementById('startButton').classList.remove('buttonPulse');
      display.pause(false);
      this.gameStatut = 'play';
    } else {
      console.log('game is pausing');
      this.pause();
    }
  },
  pause() {
    sounds.pause(sounds.playingTheme);
    sounds.play(sounds.pauseSound);
    this.gameStatut = 'pause';
    display.pause(true);
    init.gameMode[this.gameMode].pause();
    document.getElementById('startButton').innerHTML = 'Resume';
    document.getElementById('startButton').classList.add('buttonPulse');
    clearInterval(this.timerId);
  },
  reset() {
    sounds.stop(sounds.playingTheme);
    console.log('reseting game');
    playground.cleanAllGrid();
    playground.generatePlaygroundGrid();
    this.restore();
    tetromino.initSaved();
    this.gameStatut = 'notStarted';
    document.getElementById('startButton').innerHTML = 'Start';
    document.getElementById('startButton').classList.add('buttonPulse');
    console.log('game have been reseted');
  },
  backMenu() {
    this.quit();
    menu.showMenu(true);
  },
  saveTetromino() {
    if (tetromino.canBeSaved) {
      if (tetromino.saved.tetromino.length > 0) {
        tetromino.undraw();
        tetromino.switchSaved();
        tetromino.drawSaved();
        tetromino.undraw();
        tetromino.draw();
      } else {
        tetromino.saveTetromino();
        tetromino.drawSaved();
        tetromino.undraw();
        tetromino.drawNew();
      }
      sounds.play(sounds.save);
    } else {
      console.log('already saved one tetromino wait for next');
    }
  },
  updateScore() {
    const addedScore = this.lines * this.lines * 10;
    this.gameScore += addedScore;
    document.getElementById('score').innerHTML = this.gameScore;
    document.getElementById('lines').innerHTML = this.lines;
  },
  increaseSpeed(value) {
    document.getElementById('speedBox').classList.add('flash');
    setTimeout(() => {
      document.getElementById('speedBox').classList.remove('flash');
    }, 700);
    console.log('increasing speed');
    clearInterval(this.timerId);
    this.speed += value;
    this.timerId = setInterval(this.run.bind(this), init.speedArray[this.speed - 1]);
    document.getElementById('speed').innerHTML = this.speed;
    sounds.play(sounds.speedup);
  },
  run() {
    if (playground.deletingAnimation === 'onGoing') {
      // animation onGoing, nothing will happen
      return;
    }
    if (init.gameMode[this.gameMode].end()) {
      sounds.stop(sounds.playingTheme);
      init.gameMode[this.gameMode].displayScore();
      return;
    }
    const lineToDelete = playground.lineIsMade();
    const tetrominoTouchDown = tetromino.freeze();
    if (tetrominoTouchDown && lineToDelete.length && playground.deletingAnimation !== 'done') {
      init.gameMode[this.gameMode].lineCheck(lineToDelete);
      this.lines += lineToDelete.length;
      this.updateScore();
      playground.animateDeleteLine(lineToDelete);
      playground.deletingAnimation = 'onGoing';
      setTimeout(() => {
        playground.deletingAnimation = 'done';
      }, init.deletionAnimationSpeed);
      setTimeout(() => {
        sounds.play(sounds.land);
      }, init.deletionAnimationSpeed * 1.5);
      return;
    }
    if (tetrominoTouchDown) {
      sounds.justSmashed ? sounds.toggleSmash() : sounds.play(sounds.land);
      playground.deleteLine(lineToDelete);
      playground.deletingAnimation = 'init';
      tetromino.drawNew();
      const lose = this.loseCondition();
      if (lose) {
        sounds.stop(sounds.playingTheme);
        sounds.play(sounds.gameover);
        this.stop();
        this.gameStatut = 'lost';
        console.log('GAME LOST');
        if (this.gameMode === 'enduro') {
          display.endGame(true, 'GAME END', this.gameScore, 'points');
        } else {
          display.endGame(true, 'GAME OVER', ' ', ' ');
          timer.pause();
        }
      }
    } else {
      tetromino.moveDown();
    }
  },
  stop() {
    clearInterval(this.timerId);
    document.getElementById('startButton').innerHTML = 'Restart';
  },
  loseCondition() {
    const gameLost = tetromino.current.some((index) => {
      return playground.blocks[tetromino.position + index].classList.contains('taken');
    });
    return gameLost;
  },
};
