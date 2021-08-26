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
import { focusTimeLocal, focusTimeOnDb } from "./SaveTimer";
import Alert from "./components/Alert";
const Tree = observer(() => {
  const { timerStore, todosStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

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

  useEffect(() => {
    if (mainStore.uid !== null) {
      focusTimeOnDb(mainStore, timerStore, todosStore);
    } else {
      focusTimeLocal(mainStore, timerStore);
    }
  }, [timerStore.isFinish, timerStore.status]);

  //User More Focus

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerStore.status === "extra") {
        timerStore.updateTimer =
          parseInt((Date.now() - timerStore.startTime) / 1000) +
          timerStore.maxTime;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const startTime = parseInt((Date.now() - timerStore.startTime) / 1000);
    if (timerStore.status === "extra" && startTime > 3600) {
      timerStore.status = "cheat";
      timerStore.isFinish = true;
    }
  }, [timerStore.timer, timerStore.status]);

  const PageViewState = () => {
    const isPageVisible = document.visibilityState === "visible";
    mainStore.isPageVisible = isPageVisible;
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", PageViewState);

    return () =>
      document.removeEventListener("visibilitychange", PageViewState);
  }, []);

  return (
    <>
      {timerStore.status === "cheat" && (
        <Alert
          msg="คุณขี้โกงอ่าา"
          btn={[
            {
              title: "ปิด",
              background: "red",
              onClick: () => (timerStore.status = "idle"),
            },
          ]}
        />
      )}
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
