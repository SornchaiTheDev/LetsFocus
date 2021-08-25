import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Timer from "./pages/Timer";
import Leaderboard from "./pages/Leaderboard";
import PrivateRoute from "./components/PrivateRoute";
import Me from "./pages/Me";
import { observer } from "mobx-react-lite";
import { MainStore } from "./store/MainStore";
import { auth, firestore, messaging } from "./firebase";

const Tree = observer(() => {
  const { timerStore, todosStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  // Notification
  useEffect(() => {
    messaging()
      .getToken({
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      })
      .then((token) => {
        if (token) {
          mainStore.allowNotification = true;
          console.log(token);
        } else {
          mainStore.allowNotification = false;
        }
      })
      .catch((err) => {
        console.log("เกิดข้อผิดพลาดโปรดลองอีกครั้งภายหลัง.");
      });
  }, []);

  // User Authentication
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user !== null) {
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
    const sleep = (timeout) =>
      new Promise((resolve) => setTimeout(resolve, timeout));

    sleep(2000).then(async () => {
      const userData = await firestore()
        .collection("users")
        .doc(mainStore.uid)
        .get();
      mainStore.setUserFromDb(userData.data());
    });
  };

  useEffect(() => {
    if (mainStore.uid !== null) FetchUserData();
  }, [mainStore.uid]);

  const focusTimeOnDb = async () => {
    if (timerStore.isFinish && timerStore.status === "end") {
      const focusTime = timerStore.saveFocusTime;
      const restTime = timerStore.saveRestTime;

      mainStore.setFocus(focusTime);
      mainStore.setRest(restTime);
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

      if (focusTime || restTime) {
        await firestore()
          .collection("users")
          .doc(mainStore.uid)
          .set(
            {
              focusTime: firestore.FieldValue.increment(focusTime),
              restTime: firestore.FieldValue.increment(restTime),
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
          {/* <Route path="/" exact component={Login} /> */}
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
