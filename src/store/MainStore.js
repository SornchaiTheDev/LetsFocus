import React, { createContext } from "react";
import { makeAutoObservable } from "mobx";
import TimerStore from "./TimerStore";
import TodosStore from "./TodosStore";

class mainStore {
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.todosStore = new TodosStore(this);
  }
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
