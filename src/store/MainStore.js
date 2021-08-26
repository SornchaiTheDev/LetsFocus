import React, { createContext, useContext } from "react";
import { makeAutoObservable, toJS, autorun } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import LeaderBoardStore from "./LeaderboardStore";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";
class mainStore {
  user = { username: null, focusTime: 0, restTime: 0, finishTask: [] };
  uid = null;
  isRegister = null;
  isGoogle = false; // use Google to Save Account
  mode = "focus";
  isNotificationAllow = false;
  isPageVisible = true;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    this.leaderBoardStore = new LeaderBoardStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["isRegister", "mode", "isGoogle", "uid", "user"],
      storage: localforage,
      stringify: false,
    });
    this.leaderBoardStore.updateRank();
  }

  // User Authen
  set UserUid(uid) {
    this.FetchUserData(uid);
    return (this.uid = uid);
  }

  linkwithGoogle() {
    this.isGoogle = true;
  }

  registered() {
    return (this.isRegister = true);
  }

  get isMember() {
    return this.isGoogle || this.isRegister;
  }

  async updateUser(user) {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .set({ username: user.name }, { merge: true });
  }

  FetchUserData = async (uid) => {
    const sleep = (timeout) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    sleep(2000).then(async () => {
      const userData = await firestore().collection("users").doc(uid).get();
      this.user = userData;
    });
  };

  setMode() {
    return this.mode === "focus"
      ? ((this.mode = "rest"), (this.timerStore.status = "idle"))
      : ((this.mode = "focus"), (this.timerStore.status = "idle"));
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
    const week_progress = await firestore()
      .collection("users")
      .doc(mainStore.uid)
      .collection("progress_history")
      .get();

    week_progress.forEach((progress) => progress_history.push(progress.data()));
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
