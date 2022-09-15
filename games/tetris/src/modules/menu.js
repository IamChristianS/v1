import { timer } from './timer';

const { display } = require('./display');
const { game } = require('./game');
const { init } = require('./config');

export const menu = {
  showMenu(bool) {
    display.mainMenu(bool);
    display.playgroundPanel(!bool);
  },
  enduranceMode() {
    this.showMenu(false);
    game.gameMode = 'enduro';
    game.init();
  },

  rushMode() {
    this.showMenu(false);
    display.mainMenu(false);
    display.playgroundPanel(true);
    game.gameMode = 'rush';
    game.init();
  },
  sprintMode() {
    this.showMenu(false);
    display.mainMenu(false);
    display.playgroundPanel(true);
    game.gameMode = 'sprint';
    game.init();
  },
};
