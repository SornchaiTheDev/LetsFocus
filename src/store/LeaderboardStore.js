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
    try {
      await firestore()
        .collection("users")
        .onSnapshot((snapshot) => {
          const allUser = [];
          snapshot.forEach((user) => allUser.push(user.data()));
          this.leaderboard = allUser;
        });
    } catch {}
  };

  get usersRank() {
    return toJS(this.leaderboard);
  }

  get myRank() {
    const allUsers = toJS(this.leaderboard);
    const sortUsers = allUsers.sort((a, b) => b.focusTime - a.focusTime);
    const mine =
      sortUsers.findIndex(
        (user) => user.username === this.rootStore.user.username
      ) + 1;

    return mine;
  }
}

export default LeaderBoardStore;
