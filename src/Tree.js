import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Alert from "./components/Alert";
import Timer from "./pages/Timer";
import { observer } from "mobx-react-lite";
import { MainStore } from "./store/MainStore";
const Tree = observer(() => {
  const mainStore = useContext(MainStore);
  return (
    <>
      {mainStore.alert && <Alert />}

      <Router>
        <Switch>
          <Route path="/" exact component={Timer} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
});

export default Tree;
