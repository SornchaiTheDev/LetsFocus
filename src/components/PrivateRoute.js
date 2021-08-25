import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const mainStore = useContext(MainStore);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (mainStore.isRegister === null) {
          return;
        }
        if (mainStore.isRegister) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
});

export default PrivateRoute;
