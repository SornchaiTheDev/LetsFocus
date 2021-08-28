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
import Friend from "./pages/Friend";
import { observer } from "mobx-react-lite";
import { MainStore } from "./store/MainStore";
import { focusTimeLocal, focusTimeOnDb } from "./SaveTimer";
import Alert from "./components/Alert";
import BadgeReceive from "./components/Me/BadgeReceive";

import Howto from "./components/Howto";
import Preloader from "./components/Preloader";

import { autorun } from "mobx";

const Tree = observer(() => {
  const { timerStore, todosStore, achievementStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  // useEffect(() => {
  //   auth().signOut();
  //   mainStore.clearLinkwithGoogle();
  // }, []);

  // Achievement Run
  useEffect(() => {
    autorun(() => {
      console.log("call");
      if (achievementStore.started_date === null) {
        achievementStore.setStarted_date = new Date().getTime();
      }
      if (achievementStore.started_date !== null) {
        const lastest_dated =
          new Date(achievementStore.lastest_date)
            .setHours(0, 0, 0, 0)
            .valueOf() / 86400000;
        const today =
          new Date(Date.now()).setHours(0, 0, 0, 0).valueOf() / 86400000;
        if (today - lastest_dated === 1) {
          achievementStore.updateStreak();
        } else {
          achievementStore.clearStreak();
        }
        if (today - lastest_dated === 7) {
          achievementStore.clearOverall();
        }
        achievementStore.setLastest_date = new Date().getTime();
      }
    });
  }, []);

  useEffect(() => {
    if (mainStore.uid !== null) {
      focusTimeOnDb(mainStore, timerStore, todosStore, achievementStore);
    } else {
      focusTimeLocal(mainStore, timerStore);
    }
  }, [timerStore.isFinish]);

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
  }, [timerStore.timer]);

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
      {mainStore.isLoading && <Preloader />}
      {!mainStore.isHideHowto && <Howto />}
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

      {/* {mainStore.isReceived && ( */}
      {/* <BadgeReceive
        data={achievementStore.received}
        onClick={() => (mainStore.isReceived = false)}
      /> */}
      {/* )} */}
      <Router basename="/">
        <Switch>
          {/* <Route path="/" exact component={Login} /> */}
          <Route path="/" exact component={Timer} />
          <Route path="/leaderboard" exact component={Leaderboard} />
          <Route path="/me" exact component={Me} />
          <Route path="/user/:username" exact component={Friend} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
});

export default Tree;
