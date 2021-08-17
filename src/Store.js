import React, { createContext } from "react";
import { action, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage";
export const StoreContext = createContext();

class Store {
  todos = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "Store",
      properties: ["todos"],
      storage: localforage,
      removeOnExpiration: true,
      stringify: false,
    //   debugMode: true,
    }).then(() => {
      action((persiststore) => {
        console.log(persiststore.isHydrated);
      });
    });
  }

  get todoCount() {
    return this.todos.length;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }
}

const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={new Store()}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
