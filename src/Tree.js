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
  const { timerStore, todosStore } = useContext(MainStore);
  const mainStore = useContext(MainStore);

  useEffect(() => {
    if (timerStore.isFinish && timerStore.status === "end") {
      mainStore.setFocus(timerStore.saveFocusTime);
      mainStore.setFinishTask(todosStore.finishedTask);
      timerStore.resetSaveFocusTime();
      todosStore.clearTodo();
      timerStore.setMode();
    }
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
