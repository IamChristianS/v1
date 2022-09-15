//--------------------------------//
//------------ TETRIS ------------//
//--------------------------------//

//---------------------------------------------------------

/////////////
// IMPORTS //
/////////////

import { menu } from './modules/menu';
import { init } from './modules/config';
import { display } from './modules/display';
import { sounds } from './modules/audio';
import { game } from './modules/game';

//---------------------------------------------------------

//////////////////
// INIT SCRIPTS //
//////////////////

document.getElementById('enduranceMode').addEventListener('click', () => menu.enduranceMode());
document.getElementById('rushMode').addEventListener('click', () => menu.rushMode());
document.getElementById('sprintMode').addEventListener('click', () => menu.sprintMode());
document.getElementById('musicSwitch').addEventListener('change', function () {
  if (this.checked) {
    sounds.enableMusic(true);
    game.gameStatut === 'play' ? sounds.playSong(sounds.theme1) : null;
  } else {
    sounds.enableMusic(false);
    sounds.stop(sounds.theme1);
  }
});

init.detectDevice() === 'mobile' ? (display.tactil = true) : (display.tactil = false);
//---------------------------------------------------------
