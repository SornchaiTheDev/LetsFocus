import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Timer from "./pages/Timer";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import PrivateRoute from "./components/PrivateRoute";
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
  //   auth().signOut();
  //   mainStore.clearLinkwithGoogle();
  // }, []);

  useEffect(() => {
    auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          mainStore.linkwithGoogle();
        }
      });
  }, []);

  // Fetch User Data
  const FetchUserData = async () => {
    const userData = await firestore()
      .collection("users")
      .doc(mainStore.uid)
      .get();

    mainStore.setUserFromDb(userData.data());
  };

  useEffect(() => {
    if (mainStore.uid !== null) FetchUserData();
  }, [mainStore.uid]);

  const focusTimeOnDb = async () => {
    if (timerStore.isFinish && timerStore.status === "end") {
      const focusTime = timerStore.saveFocusTime;
      console.log(focusTime);
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
  }, [timerStore.isFinish]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/timer" exact component={Timer} />
          <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
          <PrivateRoute path="/me" exact component={Me} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
});

export default Tree;
