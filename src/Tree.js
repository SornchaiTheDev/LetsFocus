import React, { useContext, useEffect, useState } from "react";
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
import FouroFour from "./pages/FouroFour";
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
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   auth().signOut();
  //   mainStore.clearLinkwithGoogle();
  // }, []);

  // Achievement Run
  useEffect(() => {
    autorun(() => {
      if (achievementStore.stats.started_date === "") {
        achievementStore.setStarted_dated = new Date().getTime();
      }
      if (achievementStore.stats.started_date !== "") {
        const lastest_dated =
          new Date(achievementStore.stats.lastest_date)
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
      }
      achievementStore.setLastest_dated = new Date().getTime();
    });
  }, []);

  // Achievement Validate
  useEffect(() => {
    autorun(() => {
      if (!mainStore.isLoading) achievementStore.checkAvailable();
    });
    // achievementStore.setStats = {
    //   ...achievementStore.stats,
    //   focus_overall: 3590,
    // };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      mainStore.realtimeFocusTimer();
      mainStore.realtimeRestTimer();
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);
  // Update Realtime Time
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (timerStore.startTime !== 0) mainStore.setRealtimeTime = 1;
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [timerStore.startTime]);

  useEffect(() => {
    if (mainStore.uid !== null) {
      focusTimeOnDb(mainStore, timerStore, todosStore, achievementStore);
    } else {
      focusTimeLocal(mainStore, timerStore);
    }
  }, [timerStore.isFinish]);

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

      {achievementStore.received.length > 0 &&
        achievementStore.received.map((data, index) => (
          <BadgeReceive
            key={index}
            data={data}
            onClick={() => achievementStore.acceptReceived()}
          />
        ))}
      <Router basename="/">
        <Switch>
          <Route path="/" exact component={Timer} />
          <Route path="/404" exact component={FouroFour} />
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
