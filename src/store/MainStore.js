import React, { createContext } from "react";
import { makeAutoObservable, toJS } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";
import { clearPersistedStore, makePersistable } from "mobx-persist-store";
import localforage from "localforage";

class mainStore {
  username = "กำลังโหลด";
  focusTime = 0;
  finishTask = [];
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
    makePersistable(this, {
      name: "MeStore",
      properties: ["username", "focusTime", "finishTask"],
      storage: localforage,
      stringify: false,
    });
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
