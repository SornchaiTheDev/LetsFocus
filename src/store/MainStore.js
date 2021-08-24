import React, { createContext, useContext } from "react";
import { makeAutoObservable, toJS, autorun } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";
class mainStore {
  username = null;
  uid = null;
  focusTime = 0;
  finishTask = [];
  isRegister = false;
  isMember = false; // use Google to Save Account
  mode = "focus";
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
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
      ],
      storage: localforage,
      stringify: false,
    });
  }

  setMode() {
    return this.mode === "focus"
      ? ((this.mode = "rest"), (this.timerStore.status = "idle"))
      : ((this.mode = "focus"), (this.timerStore.status = "idle"));
  }

  async clearLinkwithGoogle() {
    await clearPersistedStore(this);
    console.log("clear!");
  }
  linkwithGoogle() {
    this.isMember = true;
  }

  set initUser(user) {
    this.username = user.username;
    this.focusTime = user.focusTime;
  }

  set UserUid(uid) {
    return (this.uid = uid);
  }

  registered() {
    return (this.isRegister = true);
  }

  get allFinishTask() {
    return this.finishTask.length;
  }

  async clearStore() {
    await clearPersistedStore();
  }

  set setUsername(name) {
    return (this.username = name);
  }
  async updateUser(user) {
    await firestore()
      .collection("users")
      .doc(user.uid)
      .set({ username: user.name }, { merge: true });
    console.log("Change Completed!");
  }

  get doneTask() {
    return toJS(this.finishTask);
  }

  setFinishTask(task) {
    this.finishTask.push(...task);
  }

  setFocus(focusTime) {
    return (this.focusTime += focusTime);
  }
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
