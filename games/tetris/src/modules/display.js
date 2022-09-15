import { game } from './game';
import { timer } from './timer';

export const display = {
  tactil: false,
  playgroundPanel(bool) {
    if (bool) {
      console.log('showing playground panels');
      document.getElementById('sidePanelRight').classList.remove('hide');
      document.getElementById('sidePanelLeft').classList.remove('hide');
      document.getElementById('playgroundContainer').classList.remove('hide');
    } else {
      console.log('hidding playground panels');
      document.getElementById('sidePanelRight').classList.add('hide');
      document.getElementById('sidePanelLeft').classList.add('hide');
      document.getElementById('playgroundContainer').classList.add('hide');
    }
  },
  mainMenu(bool) {
    if (bool) {
      console.log('showing main menu');
      document.getElementById('mainMenu').classList.remove('hide');
      this.touchControl(false);
    } else {
      console.log('hidding main menu');
      document.getElementById('mainMenu').classList.add('hide');
      this.touchControl(this.tactil);
    }
  },
  sidePanelInfo() {
    document.getElementById('speed').innerHTML = game.speed.toString();
    document.getElementById('timer').innerHTML = Math.floor(timer.value);
  },
  endGame(bool, title = 'GAME OVER', score, unit) {
    const displayValue = bool ? 'flex' : 'none';
    document.getElementById('endGame').style.display = displayValue;
    if (bool) {
      document.getElementById('endGameTitle').innerHTML = title;
      score >= 0 ? (document.getElementById('finalScore').innerHTML = score) : null;
      unit ? (document.getElementById('scoreUnit').innerHTML = unit) : null;
    }
  },
  pause(bool) {
    const displayValue = bool ? 'block' : 'none';
    document.getElementById('gamePaused').style.display = displayValue;
  },
  touchControl(bool) {
    if (bool) {
      document.getElementById('touchControlContainer').style.display = 'flex';
    } else {
      document.getElementById('touchControlContainer').style.display = 'none';
    }
  },
};
