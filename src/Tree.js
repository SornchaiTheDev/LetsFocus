import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import StoreProvider from "./store/MainStore";
import PrivateRoute from "./components/PrivateRoute";
import Timer from "./pages/Timer";

function Tree() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Timer} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default Tree;
