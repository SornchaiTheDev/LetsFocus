import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";

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

  get finishedTask() {
    const refTodo = toJS(this.todos);
    return refTodo.filter((todo) => todo.completed === true);
  }

  set addTodo(todo) {
    return this.todos.push(todo);
  }

  removeTodo(id) {
    const remain = this.todos.filter((todo) => todo.id !== id);
    return (this.todos = remain);
  }

  addFinishTask = async () => {
    if (this.rootStore.uid !== null) {
      this.rootStore.setFinishTask(this.finishedTask);
      const finishTask = this.finishedTask;
      this.clearTodo();
      await firestore()
        .collection("users")
        .doc(this.rootStore.uid)
        .set(
          {
            finishTask: firestore.FieldValue.arrayUnion(...finishTask),
          },
          { merge: true }
        );
    } else {
      this.clearTodo();
    }
  };

  changeTodo(id) {
    const currentId = this.todos.findIndex((todo) => todo.id === id);
    this.todos[currentId] = {
      id: id,
      event: this.todos[currentId].event,
      completed: !this.todos[currentId].completed,
      dated: this.todos[currentId].dated,
    };

    this.addFinishTask();
  }
}

export default TodosStore;
