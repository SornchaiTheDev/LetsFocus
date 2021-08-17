import React, { createContext } from "react";
import { makeAutoObservable } from "mobx";
import TimerStore from "./TimerStore";
import Timer from "../pages/Timer";

class mainStore {
  timer = 0;
  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
  }
}

export const MainStore = createContext();

const StoreProvider = ({ children }) => {
  return (
    <MainStore.Provider value={new mainStore()}>{children}</MainStore.Provider>
  );
};

export default StoreProvider;
