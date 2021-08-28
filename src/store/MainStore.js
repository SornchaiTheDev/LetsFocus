import React, { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import LeaderBoardStore from "./LeaderboardStore";
import AchievementStore from "./AchievementStore";
import {
  clearPersistedStore,
  makePersistable,
  configurePersistable,
  isHydrated,
} from "mobx-persist-store";
import localforage from "localforage";
import { firestore, auth } from "../firebase";

configurePersistable(
  { storage: localforage, stringify: false },
  { fireImmediately: true }
);
class mainStore {
  user = {
    username: null,
    focusTime: 0,
    restTime: 0,
    finishTask: [],
  };
  uid = null;
  realtimeFocus = 0;
  realtimeRest = 0;
  mode = "focus";
  isPageVisible = true;
  isHideHowto = false;
  week_progress = [];
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    this.leaderBoardStore = new LeaderBoardStore(this);
    this.achievementStore = new AchievementStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["mode", "uid", "user", "isHideHowto"],
    });
    this.leaderBoardStore.updateRank();
    this.fetchUserData();

    if (isHydrated(this)) this.isLoading = false;
  }

  set setIsLoading(bool) {
    return (this.isLoading = bool);
  }

  set setUid(uid) {
    this.uid = uid;
  }

  // User Authen
  set UserUid(uid) {
    return (this.uid = uid);
  }

  set setUser(user) {
    this.user = user;
  }

  linkwithGoogle(uid) {
    this.uid = uid;
    this.isGoogle = true;
  }

  async updateUser(user) {
    try {
      await firestore()
        .collection("users")
        .doc(this.uid)
        .set({ username: user.name }, { merge: true });
    } catch {}
  }

  set setRealtimeTime(time) {
    this.mode === "focus"
      ? (this.user.focusTime += time)
      : (this.user.restTime += time);
    this.achievementStore.updateAchievementState = {
      mode: this.mode,
      time: time,
    };
  }

  set setRealtimeFocus(time) {
    return (this.realtimeFocus = time);
  }
  set setRealtimeRest(time) {
    return (this.realtimeRest = time);
  }

  realtimeFocusTimer() {
    const startTime = this.timerStore.startTime;

    if (startTime !== 0 && this.mode === "focus") {
      return (this.setRealtimeFocus =
        parseInt((Date.now() - startTime) / 1000) + this.user.focusTime);
    } else {
      return (this.setRealtimeFocus = this.user.focusTime);
    }
  }

  realtimeRestTimer() {
    const startTime = this.timerStore.startTime;

    if (startTime !== 0 && this.mode === "rest") {
      return (this.setRealtimeRest =
        parseInt((Date.now() - startTime) / 1000) + this.user.restTime);
    } else {
      return (this.setRealtimeRest = this.user.restTime);
    }
  }

  set setWeekProgress(data) {
    this.week_progress = data;
  }

  fetchUserData = async () => {
    try {
      await auth().onAuthStateChanged(async (user) => {
        if (user !== null) {
          this.setIsLoading = true;
          const uid = user.uid;

          const userData = await firestore().collection("users").doc(uid).get();
          if (!userData.exists) {
            let fetchUser;
            fetchUser = setInterval(async () => {
              const userData = await firestore()
                .collection("users")
                .doc(uid)
                .get();
              if (userData.exists) {
                this.setUser = userData.data();
                clearInterval(fetchUser);
              }
            }, 2000);
          } else {
            this.setUser = userData.data();
            this.achievementStore.fetchAchievements(uid);

            await firestore()
              .collection("users")
              .doc(uid)
              .update({ status: "idle", startTime: 0 });

            const week_progress_fetch = await firestore()
              .collection("users")
              .doc(uid)
              .collection("progress_history")
              .get();

            const progress_history = [];
            week_progress_fetch.forEach((progress) => {
              progress_history.push(progress.data());
            });

            this.setWeekProgress = progress_history;
          }
          this.setUid = uid;
        }
        this.setIsLoading = false;
      });
    } catch {}
  };

  get getWeekProgress() {
    const progress_db = toJS(this.week_progress);
    const template = [
      { day: "จันทร์", hour: 0, seconds: 0 },
      { day: "อังคาร", hour: 0, seconds: 0 },
      { day: "พุธ", hour: 0, seconds: 0 },
      { day: "พฤหัส", hour: 0, seconds: 0 },
      { day: "ศุกร์", hour: 0, seconds: 0 },
      { day: "เสาร์", hour: 0, seconds: 0 },
      { day: "อาทิตย์", hour: 0, seconds: 0 },
    ];

    if (progress_db.length > 0) {
      progress_db.map((db) => {
        const index = template.findIndex((data) => data.day === db.day);
        return (template[index] = db);
      });
    }

    return template;
  }

  setMode() {
    this.timerStore.status = "idle";
    return this.mode === "focus" ? (this.mode = "rest") : (this.mode = "focus");
  }

  async clearLinkwithGoogle() {
    await clearPersistedStore(this);
    console.log("clear!");
  }

  get allFinishTask() {
    return this.user.finishTask.length;
  }

  async clearStore() {
    await clearPersistedStore();
  }

  get doneTask() {
    return toJS(this.user.finishTask);
  }

  setFinishTask(task) {
    this.user.finishTask.push(...task);
  }

  setFocus(focusTime) {
    return (this.user.focusTime += focusTime);
  }
  setRest(restTime) {
    return (this.user.restTime += restTime);
  }

  // Hide How to
  hideHowto() {
    this.isHideHowto = true;
  }
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
