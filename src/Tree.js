import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Alert from "./components/Alert";
import Timer from "./pages/Timer";
import Leaderboard from "./pages/Leaderboard";
import Me from "./pages/Me";
import { observer } from "mobx-react-lite";
import { MainStore } from "./store/MainStore";
const Tree = observer(() => {
  const { timerStore } = useContext(MainStore);

  const onBlur = (e) => {
    if (document.visibilityState === "hidden") {
      timerStore.timeSave = new Date().getTime();
    }

    timerStore.updateTimer =
      (new Date().getTime() - timerStore.saveTime) / 1000;
  };
  useEffect(() => {
    document.addEventListener("visibilitychange", onBlur);

    return () => {
      document.removeEventListener("visibilitychange", onBlur);
    };
  }, []);

  return (
    <>
      {/* {mainStore.alert && <Alert />} */}

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
