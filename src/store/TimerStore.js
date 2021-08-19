import { makeAutoObservable } from "mobx";

class TimerStore {
  saveTime = null;
  focusTime = 25;
  restTime = 5;
  maxFocusTime = 0;
  maxRestTime = 0;
  mode = "focus";

  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setMode() {
    return this.mode === "focus" ? (this.mode = "rest") : (this.mode = "focus");
  }

  countdown() {
    return this.mode === "focus" ? this.focusTime-- : this.restTime--;
  }

  set timeSave(time) {
    this.saveTime = time;
  }

  set updateTimer(time) {
    return this.mode === "focus" ? this.focusTime - time : this.restTime - time;
  }

  set setFocusTime(time) {
    this.focusTime = time;
    this.maxFocusTime = time;
  }

  set setRestTime(time) {
    this.restTime = time;
    this.maxRestTime = time;
  }

  get timer() {
    return this.mode === "focus" ? this.focusTime : this.restTime;
  }
  get maxTime() {
    return this.mode === "focus" ? this.maxFocusTime : this.maxRestTime;
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

  get isZero() {
    return this.timer === 0;
  }
}

export default TimerStore;
