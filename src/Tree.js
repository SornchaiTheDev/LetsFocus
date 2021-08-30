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
import { auth } from "./firebase";

import { autorun } from "mobx";

const Tree = observer(() => {
  const { timerStore, todosStore, achievementStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  // Achievement Run
  useEffect(() => {
    autorun(() => {
      if (achievementStore.stats.started_date === "") {
        achievementStore.setStarted_dated = new Date().getTime();
      }
      if (achievementStore.stats.started_date !== "") {
        const lastest_dated = parseInt(
          new Date(achievementStore.stats.lastest_date).setHours(0, 0, 0, 0) /
            86400000
        );
        const today = parseInt(
          new Date(Date.now()).setHours(0, 0, 0, 0) / 86400000
        );

        if (lastest_dated > 0) {
          console.log("today :" + today);
          console.log("lastest dated :" + lastest_dated);
          if (today - lastest_dated === 1) {
            achievementStore.updateStreak();
          } else {
            achievementStore.clearStreak();
          }
        }
        achievementStore.setLastest_dated = new Date().getTime();
      }
    });
  }, []);

  // Achievement Validate
  useEffect(() => {
    autorun(() => {
      if (!mainStore.isLoading) achievementStore.checkAvailable();
    });
  }, []);

  useEffect(() => {
    if (mainStore.uid !== null) {
      focusTimeOnDb(mainStore, timerStore, todosStore, achievementStore);
    } else {
      focusTimeLocal(mainStore, timerStore);
    }
  }, [timerStore.isFinish]);

  return (
    <>
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
          <Route path="/user/:id" exact component={Friend} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
});

export default Tree;
