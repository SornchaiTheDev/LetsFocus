import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Timer from "./pages/Timer";
import Leaderboard from "./pages/Leaderboard";
import Me from "./pages/Me";
import { observer } from "mobx-react-lite";
import { MainStore } from "./store/MainStore";
import { auth, firestore } from "./firebase";

const Tree = observer(() => {
  const { timerStore, todosStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  // User Authentication
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user === null) {
        auth()
          .signInAnonymously()
          .then(() => {
            mainStore.registered();
          });
      } else {
        mainStore.UserUid = user.uid;
      }
    });
  }, []);

  // useEffect(() => {
  //   const generateUser = () => {
  //     new Array(50).fill("").map(
  //       async (data, index) =>
  //         await firestore()
  //           .collection("users")
  //           .add({ username: `User#${index + 4}`, focusTime: 0 })
  //     );
  //   };
  //   generateUser();
  // }, []);
  // useEffect(() => {
  //   auth().signOut();
  //   mainStore.clearLinkwithGoogle();
  // }, []);

  useEffect(() => {
    auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          console.log(result);
          mainStore.linkwithGoogle();
        }
      });
  }, []);

  // Fetch User Data
  const FetchUserData = async () => {
    await firestore()
      .collection("users")
      .doc(mainStore.uid)
      .onSnapshot((snapshot) => (mainStore.initUser = snapshot.data()));
  };

  useEffect(() => {
    if (mainStore.uid !== null) FetchUserData();
  }, [mainStore.uid]);

  const focusTimeOnDb = async () => {
    if (timerStore.isFinish && timerStore.status === "end") {
      const focusTime = timerStore.saveFocusTime;
      mainStore.setFocus(focusTime);
      mainStore.setFinishTask(todosStore.finishedTask);

      await firestore()
        .collection("users")
        .doc(mainStore.uid)
        .set(
          {
            finishTask: firestore.FieldValue.arrayUnion(
              ...todosStore.finishedTask
            ),
          },
          { merge: true }
        );

      if (focusTime > 0) {
        await firestore()
          .collection("users")
          .doc(mainStore.uid)
          .set(
            {
              focusTime: firestore.FieldValue.increment(focusTime),
            },
            { merge: true }
          );
      }
      timerStore.resetSaveFocusTime();
      todosStore.clearTodo();
      mainStore.setMode();
    }
  };

  useEffect(() => {
    focusTimeOnDb();
    // console.log(timerStore.status);
  }, [timerStore.isFinish]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Timer} />
          <Route path="/leaderboard" exact component={Leaderboard} />
          <Route path="/me" exact component={Me} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
});

export default Tree;
