import { makeAutoObservable } from "mobx";
import { firestore } from "../firebase";
const timer = new Worker("./worker/timer.js");
class TimerStore {
  focusTime = 0;
  saveFocusTime = 0;
  saveRestTime = 0;
  restTime = 0;
  maxFocusTime = 0;
  maxRestTime = 0;
  status = "idle";
  startTime = 0;
  isFinish = true;
  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  countup() {
    this.isFinish = false;
    this.status = "countup";

    timer.postMessage({
      status: "countup",
    });

    timer.onmessage = (e) => {
      this.updateTimer = e.data.time !== undefined ? e.data.time : 0;
      if (e.data.startTime !== undefined) {
        this.setStartTime = e.data.startTime;
        this.rootStore.uid !== null && this.setStartStatus(e.data.startTime);
      }
    };
  }
  stopCountup() {
    this.isFinish = true;
    this.status = "end_countup";
    if (this.rootStore.mode === "focus") {
      this.saveFocusTime = this.timer;
    } else {
      this.saveRestTime = this.timer;
    }
    timer.postMessage({ status: "stop" });
    this.rootStore.uid !== null && this.setStopStatus();
  }

  countdown() {
    this.isFinish = false;
    this.status = "start";

    timer.postMessage({
      status: "start",
      time: this.timer,
    });

    timer.onmessage = (e) => {
      this.updateTimer = e.data.time;

      if (e.data.startTime !== undefined) {
        this.setStartTime = e.data.startTime;
        this.rootStore.uid !== null && this.setStartStatus(e.data.startTime);
      }

      if (e.data.status === "finish") {
        if (this.rootStore.isPageVisible) {
          this.isFinish = true;
          this.status = "end";
          this.rootStore.uid !== null && this.setStopStatus();
        } else {
          this.status = "extra";
        }
      }
    };
  }

  async setStartStatus(time) {
    await firestore()
      .collection("users")
      .doc(this.rootStore.uid)
      .update({ status: this.rootStore.mode, startTime: time });
  }

  async setStopStatus() {
    await firestore()
      .collection("users")
      .doc(this.rootStore.uid)
      .update({ status: "idle", startTime: 0 });
  }

  stop() {
    this.status = "idle";
    timer.postMessage({ status: "stop" });
    this.isFinish = true;
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

  resetSaveTime() {
    this.saveFocusTime = 0;
    this.saveRestTime = 0;
    this.startTime = 0;
    this.status = "idle";
  }

  set saveTime(time) {
    this.rootStore.mode === "focus"
      ? (this.saveFocusTime = time)
      : (this.saveRestTime = time);
  }

  set setStartTime(time) {
    return (this.startTime = time);
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

  get getRealtimeTimer() {
    let realtimeTime = 0;
    if (this.status !== "idle" && this.startTime !== 0) {
      realtimeTime = parseInt((Date.now() - this.startTime) / 1000);
    }

    return realtimeTime;
  }
}

export default TimerStore;
