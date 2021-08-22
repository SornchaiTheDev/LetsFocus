import { makeAutoObservable } from "mobx";
const timer = new Worker("./worker/timer.js");
class TimerStore {
  focusTime = 25;
  restTime = 5;
  maxFocusTime = 0;
  maxRestTime = 0;
  status = "idle";
  mode = "focus";
  isFinish = true;

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

  set setFinish(status) {
    return (this.isFinish = status);
  }

  countdown() {
    this.setFinish = false;
    this.status = "start";
    timer.postMessage({ status: "start", time: this.timer });
    timer.addEventListener("message", async (e) => {
      this.updateTimer = e.data.time;
      if (e.data.status === "finish") this.setFinish = true;
    });
  }

  stop() {
    this.status = "stop";
    timer.postMessage({ status: "stop" });
    this.setFinish = true;
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
}

export default TimerStore;
