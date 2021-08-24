import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import localforage from "localforage";
import { firestore } from "../firebase";

class LeaderBoardStore {
  leaderboard = [];
  rootStore;
  constructor(rootStore) {
    makeAutoObservable(this, { rootStore: false });
    makePersistable(this, {
      name: "LeaderBoard",
      properties: ["leaderboard"],
      storage: localforage,
    });
    this.rootStore = rootStore;
  }

  updateRank = async () => {
    await firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const allUser = [];
        snapshot.forEach((user) => allUser.push(user.data()));

        this.leaderboard = allUser;
      });
  };

  get userRank() {
    return toJS(this.leaderboard);
  }
}

export default LeaderBoardStore;
