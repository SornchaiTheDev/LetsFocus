import React, { createContext } from "react";
import { makeAutoObservable } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";

class mainStore {
  alert = false;
  page = "timer";
  user = { focusTime: 0, username: "โชกุนนน", finishTask: [] };
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
  }

  setFocus(focusTime) {
    return (this.user.focusTime += focusTime);
  }

  setAlert() {
    this.alert = true;
  }

  setPage(page) {
    this.page = page;
  }

  closeAlert() {
    this.alert = false;
  }
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
