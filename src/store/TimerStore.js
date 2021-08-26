import { makeAutoObservable } from "mobx";

const timer = new Worker("./worker/timer.js");
class TimerStore {
  focusTime = 25;
  saveFocusTime = 0;
  saveRestTime = 0;
  restTime = 5;
  maxFocusTime = 0;
  maxRestTime = 0;
  status = "idle";
  startTime = null;
  isFinish = true;
  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  countdown() {
    this.isFinish = false;
    this.status = "start";
    timer.postMessage({
      status: "start",
      time: this.timer,
      pageVisible: this.rootStore.isPageVisible,
    });

    timer.onmessage = (e) => {
      this.updateTimer = e.data.time;

      if (e.data.status === "finish") {
        if (this.rootStore.isPageVisible) {
          this.isFinish = true;
          this.status = "end";
        } else {
          this.status = "extra";
        }
      }
    };
  }

  stop() {
    this.status = "idle";
    timer.postMessage({ status: "stop" });
    this.isFinish = true;
  }

  set updateTimer(time) {
    console.log(this.status);
    this.rootStore.mode === "focus"
      ? (this.focusTime = time)
      : (this.restTime = time);
    if (this.status === "extra") {
      this.rootStore.mode === "focus"
        ? (this.saveFocusTime = time)
        : (this.saveRestTime = time);
    }
  }

  resetSaveTime() {
    this.saveFocusTime = 0;
    this.saveRestTime = 0;
  }

  set saveTime(time) {
    this.rootStore.mode === "focus"
      ? (this.saveFocusTime = time)
      : (this.saveRestTime = time);
  }

  set setTime(time) {
    if (this.rootStore.mode === "focus") {
      this.focusTime = time;
      this.maxFocusTime = time;
    }
    if (this.rootStore.mode === "rest") {
      this.restTime = time;
      this.maxRestTime = time;
    }
  }

  get timer() {
    return this.rootStore.mode === "focus" ? this.focusTime : this.restTime;
  }
  get maxTime() {
    return this.rootStore.mode === "focus"
      ? this.maxFocusTime
      : this.maxRestTime;
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
}

export default TimerStore;
