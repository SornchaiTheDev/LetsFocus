import { makeAutoObservable } from "mobx";
const timer = new Worker("./worker/timer.js");
class TimerStore {
  saveTime = null;
  focusTime = 25;
  restTime = 5;
  maxFocusTime = 0;
  maxRestTime = 0;
  status = "stop";
  mode = "focus";

  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  setMode() {
    return this.mode === "focus"
      ? ((this.mode = "rest"), (this.status = "stop"))
      : ((this.mode = "focus"), (this.status = "stop"));
  }

  countdown() {
    this.status = "start";
    timer.postMessage({ status: "start", time: this.timer });
    timer.addEventListener("message", (e) => {
      this.updateTimer = e.data.time;
    });
  }

  stop() {
    this.status = "stop";
    timer.postMessage({ status: "stop" });
  }

  set timeSave(time) {
    this.saveTime = time;
  }

  set updateTimer(time) {
    this.mode === "focus" ? (this.focusTime = time) : (this.restTime = time);
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
    return this.status === "start" && this.timer === 0;
  }
}

export default TimerStore;
