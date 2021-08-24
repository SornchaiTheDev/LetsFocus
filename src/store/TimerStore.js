import { makeAutoObservable } from "mobx";

const timer = new Worker("./worker/timer.js");
class TimerStore {
  focusTime = 25;
  saveFocusTime = 0;
  restTime = 5;
  maxFocusTime = 0;
  maxRestTime = 0;
  status = "idle";

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
    timer.postMessage({ status: "start", time: this.timer });
    timer.addEventListener("message", async (e) => {
      this.updateTimer = e.data.time;
      if (e.data.status === "finish") {
        this.setFinish = true;
        this.status = "end";
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
  }

  resetSaveFocusTime() {
    return (this.saveFocusTime = 0);
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
    this.saveFocusTime = this.maxFocusTime;
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
