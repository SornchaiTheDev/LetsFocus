import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage";

class TodosStore {
  todos = [];

  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    makePersistable(this, {
      name: "TodosStore",
      properties: ["todos"],
      storage: localforage,
      removeOnExpiration: true,
      stringify: false,
    });
    this.rootStore = rootStore;
  }

  clearTodo() {
    const remainTodos = this.todos.filter((todo) => todo.completed === false);
    return (this.todos = remainTodos);
  }

  get TodosLength() {
    return this.todos.filter((todo) => todo.completed === false).length;
  }

  isCompleted(id) {
    const currentId = this.todos.findIndex((todo) => todo.id === id);
    return this.todos[currentId].completed;
  }

  addTodo(todo) {
    return this.todos.push(todo);
  }

  removeTodo(id) {
    const remain = this.todos.filter((todo) => todo.id !== id);
    return (this.todos = remain);
  }

  changeTodo(id) {
    const currentId = this.todos.findIndex((todo) => todo.id === id);
    this.todos[currentId] = {
      id: id,
      event: this.todos[currentId].event,
      completed: !this.todos[currentId].completed,
    };
  }
}

export default TodosStore;
