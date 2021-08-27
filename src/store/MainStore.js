import React, { createContext, useContext } from "react";
import { makeAutoObservable, toJS, autorun } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import LeaderBoardStore from "./LeaderboardStore";
import AchievementStore from "./AchievementStore";
import {
  clearPersistedStore,
  makePersistable,
  configurePersistable,
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
  mode = "focus";
  isNotificationAllow = false;
  isPageVisible = true;
  isReceived = false;
  week_progress = [];
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    this.leaderBoardStore = new LeaderBoardStore(this);
    this.achievementStore = new AchievementStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["mode", "isGoogle", "uid", "user"],
    });
    this.leaderBoardStore.updateRank();
    this.fetchUserData();
  }

  // User Authen
  set UserUid(uid) {
    return (this.uid = uid);
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

  fetchUserData = async () => {
    try {
      await auth().onAuthStateChanged(async (user) => {
        if (user !== null) {
          const uid = user.uid;

          const userData = await firestore().collection("users").doc(uid).get();
          if (!userData.exists) {
            let fetchUser;
            fetchUser = setInterval(async () => {
              console.log("call");
              const userData = await firestore()
                .collection("users")
                .doc(uid)
                .get();
              if (userData.exists) {
                this.user = userData.data();
                clearInterval(fetchUser);
              }
            }, 2000);
          } else {
            this.user = userData.data();
            const week_progress_fetch = await firestore()
              .collection("users")
              .doc(uid)
              .collection("progress_history")
              .get();

            const progress_history = [];
            week_progress_fetch.forEach((progress) => {
              progress_history.push(progress.data());
            });

            this.week_progress = progress_history;
          }
          this.uid = uid;
        }
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
        template[index] = db;
      });
    }

    return template;
  }

  setMode() {
    this.timerStore.status = "idle";
    return this.mode === "focus" ? (this.mode = "rest") : (this.mode = "focus");
  }

  set allowNotification(bool) {
    this.isNotificationAllow = bool;
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
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
