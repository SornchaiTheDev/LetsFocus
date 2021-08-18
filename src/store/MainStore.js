import React, { createContext } from "react";
import { makeAutoObservable } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";

class mainStore {
  alert = false;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
  }

  alert() {
    this.alert = true;
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
