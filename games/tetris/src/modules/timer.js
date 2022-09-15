import { init } from './config';

export const timer = {
  value: 0,
  timerCount: 0,
  timerDisplay: 0,
  display() {
    this.timerDisplay = setInterval(() => {
      let valueToDisplay;
      this.value <= 0 ? (valueToDisplay = 0) : (valueToDisplay = Math.round(this.value));
      document.getElementById('timer').innerHTML = valueToDisplay;
    }, init.timerDisplayPrecision);
  },
  increment() {
    this.timerCount = setInterval(() => {
      this.value += init.timerCountPrecision / 1000;
      this.value = Math.round(this.value * 1000) / 1000;
    }, init.timerCountPrecision);
  },
  decrement() {
    this.timerCount = setInterval(() => {
      this.value -= init.timerCountPrecision / 1000;
      this.value = Math.round(this.value * 1000) / 1000;
    }, init.timerCountPrecision);
  },
  pause() {
    console.log('pausing timer');
    console.log('timer count', this.timerCount);
    clearInterval(this.timerCount);
    clearInterval(this.timerDisplay);
  },
  // reset() {
  //   console.log('reseting timer');
  //   clearInterval(this.timerCount);
  //   clearInterval(this.timerDisplay);
  // },
};
