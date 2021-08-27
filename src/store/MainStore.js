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
  isRegister = null;
  isGoogle = false; // use Google to Save Account
  mode = "focus";
  isNotificationAllow = false;
  isPageVisible = true;
  isReceived = false;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    this.leaderBoardStore = new LeaderBoardStore(this);
    this.achievementStore = new AchievementStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["isRegister", "mode", "isGoogle", "uid", "user"],
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

  registered() {
    return (this.isRegister = true);
  }

  get isMember() {
    return this.isGoogle || this.isRegister;
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
            setInterval(async () => {
              const userData = await firestore()
                .collection("users")
                .doc(uid)
                .get();
              this.user = userData.data();
            }, 1000);
          } else {
            this.user = userData.data();
          }
          this.uid = uid;
        }
      });
    } catch {}
  };

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

  async userProgressHistory() {
    const progress_history = [];
    try {
      const week_progress = await firestore()
        .collection("users")
        .doc(mainStore.uid)
        .collection("progress_history")
        .get();

      week_progress.forEach((progress) =>
        progress_history.push(progress.data())
      );
    } catch {}
    return progress_history;
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
