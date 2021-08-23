import React, { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";
class mainStore {
  username = "";
  uid = null;
  focusTime = 0;
  finishTask = [];
  isMember = false;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["username", "focusTime", "finishTask", "isMember"],
      storage: localforage,
      stringify: false,
    });
  }

  set UserUid(uid) {
    return (this.uid = uid);
  }
  get getUserStatus() {
    return this.isMember;
  }
  registered() {
    return (this.isMember = true);
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
