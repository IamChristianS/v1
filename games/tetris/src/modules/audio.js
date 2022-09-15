export let sounds = {
  theme1: new Audio('./sound/origTheme.mp3'),
  land: new Audio('./sound/samples/land.mp3'),
  level: new Audio('./sound/samples/level.mp3'),
  move: new Audio('./sound/samples/move.mp3'),
  rotate: new Audio('./sound/samples/rotate.mp3'),
  smack: new Audio('./sound/samples/shift.mp3'),
  pauseSound: new Audio('./sound/samples/pause.mp3'),
  line: new Audio('./sound/samples/line.mp3'),
  tetris: new Audio('./sound/samples/tetris.mp3'),
  gameover: new Audio('./sound/samples/gameover.mp3'),
  speedup: new Audio('./sound/samples/speedup.mp3'),
  save: new Audio('./sound/samples/save.mp3'),
  justSmashed: false,
  playingTheme: 0,
  musicEnabled: true,
  toggleSmash() {
    this.justSmashed = !this.justSmashed;
  },
  playSong(theme) {
    if (this.musicEnabled) {
      theme.play();
      theme.loop = true;
      theme.volume = 0.5;
    }
  },
  play(theme) {
    this.stop(theme);
    theme.play();
  },
  stop(theme) {
    theme.pause();
    theme.currentTime = 0;
  },
  pause(theme) {
    theme.pause();
  },
  enableMusic(bool) {
    bool ? (this.musicEnabled = true) : (this.musicEnabled = false);
  },
};
