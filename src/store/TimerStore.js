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

  set setFinish(status) {
    return (this.isFinish = status);
  }

  countdown() {
    this.setFinish = false;
    this.status = "start";
    timer.postMessage({
      status: "start",
      time: this.timer,
      pageVisible: this.rootStore.isPageVisible,
    });
    timer.addEventListener("message", async (e) => {
      this.updateTimer = e.data.time;

      if (e.data.status === "finish") {
        if (this.rootStore.isPageVisible) {
          this.setFinish = true;
          this.status = "end";
        } else {
          this.status = "extra";
        }
      }
    });
  }

  stop() {
    this.status = "idle";
    timer.postMessage({ status: "stop" });
    this.setFinish = true;
  }

  set updateTimer(time) {
    this.rootStore.mode === "focus"
      ? (this.focusTime = time)
      : (this.restTime = time);
    if (this.status === "extra") {
      this.rootStore.mode === "focus"
        ? (this.saveFocusTime = time)
        : (this.saveRestTime = time);
    }
  }

  resetSaveFocusTime() {
    return (this.saveFocusTime = 0);
  }

  set setTime(time) {
    if (this.rootStore.mode === "focus") {
      if (this.status === "idle") this.saveFocusTime = time;
      this.focusTime = time;
      this.maxFocusTime = time;
    }
    if (this.rootStore.mode === "rest") {
      if (this.status === "idle") this.saveRestTime = time;
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
