import { game } from './game';
import { timer } from './timer';
import { display } from './display';
import { sounds } from './audio';

export const init = {
  blockSize: 25,
  maxBlockSize: 26,
  minBlockSize: 10,
  rows: 20,
  columns: 10,
  timerCountPrecision: 10, // one tick each centisecond
  timerDisplayPrecision: 1000, // one display each seconds
  speedArray: [
    2360,
    1460,
    920,
    590,
    388,
    259.8,
    177.5,
    123.6,
    87.9,
    63.61,
    46.93,
    35.256,
    26.977,
    21.017,
    16.67,
  ],
  devMode: false,
  deletionAnimationSpeed: 500,
  previewSize: 4,
  detectDevice() {
    return !!navigator.maxTouchPoints ? 'mobile' : 'computer';
  },
  gameMode: {
    enduro: {
      increaseSpeedValue: 1,
      linesToIncreaseSpeed: 10,
      initSpeed: 3,
      display() {
        document.getElementById('timerBox').classList.add('hide');
        document.getElementById('timerTitle').classList.add('hide');
        document.getElementById('scoreBox').classList.remove('hide');
        document.getElementById('scoreTitle').classList.remove('hide');
      },
      init() {
        game.speed = this.initSpeed;
        this.display();
        sounds.playingTheme = sounds.theme1;
      },
      start() {
        console.log('start enduro mode');
      },
      pause() {
        // no timer
        return false;
      },
      lineCheck(lineToDelete) {
        // increase speed every ten lines
        const speedShouldIncrease = lineToDelete.some((x, index) => {
          return (game.lines + index + 1) % this.linesToIncreaseSpeed === 0 && game.lines > 0;
        });
        if (speedShouldIncrease) {
          console.log('10 lines have been made, speed is increasing');
          game.increaseSpeed(this.increaseSpeedValue);
        }
      },
      end() {
        // enduro mode will continue until gameOver
        return false;
      },
      displayScore() {
        display.endGame(true, 'GAME END', game.gameScore);
      },
    },
    rush: {
      initSpeed: 6,
      initTimer: 60,
      increaseSpeedValue: 1,
      linesToIncreaseSpeed: 5,
      display() {
        document.getElementById('timerBox').classList.remove('hide');
        document.getElementById('timerTitle').classList.remove('hide');
        document.getElementById('scoreBox').classList.remove('hide');
        document.getElementById('scoreTitle').classList.remove('hide');
      },
      init() {
        game.speed = this.initSpeed;
        timer.value = this.initTimer;
        timer.pause();
        this.display();
        sounds.playingTheme = sounds.theme1;
      },
      start() {
        console.log('start rush mode');
        timer.decrement();
        timer.display();
      },
      pause() {
        timer.pause();
      },
      lineCheck(lineToDelete) {
        // increase speed every ten lines
        const speedShouldIncrease = lineToDelete.some((x, index) => {
          return (game.lines + index + 1) % this.linesToIncreaseSpeed === 0 && game.lines > 0;
        });
        if (speedShouldIncrease) {
          console.log('10 lines have been made, speed is increasing');
          game.increaseSpeed(this.increaseSpeedValue);
        }
      },
      end() {
        if (timer.value <= 0) {
          console.log('time out!');
          timer.pause();
          game.stop();
          game.gameStatut = 'end';
          console.log('GAME END');
          return true;
        }
        return false;
      },
      displayScore() {
        display.endGame(true, 'TIME OUT!', game.gameScore, 'points');
      },
    },
    sprint: {
      initSpeed: 6,
      increaseSpeedValue: 1,
      linesToIncreaseSpeed: 5,
      initTimer: 0,
      linesToWin: 20,

      display() {
        document.getElementById('timerBox').classList.remove('hide');
        document.getElementById('timerTitle').classList.remove('hide');
        document.getElementById('scoreBox').classList.add('hide');
        document.getElementById('scoreTitle').classList.add('hide');
      },
      init() {
        game.speed = this.initSpeed;
        timer.value = this.initTimer;
        timer.pause();
        this.display();
        sounds.playingTheme = sounds.theme1;
      },
      start() {
        console.log('start sprint mode');
        timer.increment();
        timer.display();
      },
      pause() {
        timer.pause();
      },
      lineCheck(lineToDelete) {
        // increase speed every ten lines
        const speedShouldIncrease = lineToDelete.some((x, index) => {
          return (game.lines + index + 1) % this.linesToIncreaseSpeed === 0 && game.lines > 0;
        });
        if (speedShouldIncrease) {
          console.log('3 lines have been made, speed is increasing');
          game.increaseSpeed(this.increaseSpeedValue);
        }
      },
      end() {
        if (game.lines >= this.linesToWin) {
          console.log('lines out!');
          timer.pause();
          game.stop();
          game.gameStatut = 'end';
          console.log('GAME END');
          return true;
        }
        return false;
      },
      displayScore() {
        display.endGame(true, `${this.linesToWin} LINES DONE!`, timer.value, 'seconds');
      },
    },
  },
};
