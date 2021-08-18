import { makeAutoObservable } from "mobx";

class TodosStore {
  todos = [];

  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
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
