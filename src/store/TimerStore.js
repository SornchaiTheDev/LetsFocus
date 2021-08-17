import { makeAutoObservable } from "mobx";

class TimerStore {
  timer = 0;
  maxtime = 0;

  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  countdown() {
    this.timer--;
  }

  set setTimer(time) {
    this.timer = time;
    this.maxtime = time;
  }

  get currentTime() {
    if (this.timer % 60 < 10) {
      return `${Math.floor(this.timer / 60)}:${(this.timer % 60)
        .toString()
        .padStart(2, 0)}`;
    }
    return `${Math.floor(this.timer / 60)}:${(this.timer % 60)
      .toString()
      .padEnd(2, 0)}`;
  }

  get maxTime() {
    return this.maxtime;
  }

  get isZero() {
    return this.timer === 0;
  }
}

export default TimerStore;
