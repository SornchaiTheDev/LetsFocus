import React, { createContext, useContext } from "react";
import { makeAutoObservable, toJS, autorun } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import LeaderBoardStore from "./LeaderboardStore";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";
class mainStore {
  user = { username: null, focusTime: 0, finishTask: [] };
  uid = null;
  isRegister = false;
  isMember = false; // use Google to Save Account
  mode = "focus";
  rank = null;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    this.leaderBoardStore = new LeaderBoardStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: [
        "username",
        "focusTime",
        "finishTask",
        "isRegister",
        "mode",
        "isMember",
        "uid",
        "rank",
        "user",
      ],
      storage: localforage,
      stringify: false,
    });
    this.leaderBoardStore.updateRank();
  }

  setMode() {
    return this.mode === "focus"
      ? ((this.mode = "rest"), (this.timerStore.status = "idle"))
      : ((this.mode = "focus"), (this.timerStore.status = "idle"));
  }

  get username() {
    return this.user.username;
  }

  async clearLinkwithGoogle() {
    await clearPersistedStore(this);
    console.log("clear!");
  }
  linkwithGoogle() {
    this.isMember = true;
  }

  setUserFromDb(user) {
    this.user = user;
  }

  set userRank(rank) {
    this.userRank = rank;
  }

  set UserUid(uid) {
    return (this.uid = uid);
  }

  registered() {
    return (this.isRegister = true);
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

  async updateUser(user) {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .set({ username: user.name }, { merge: true });
    console.log("Change Completed!");
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
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
