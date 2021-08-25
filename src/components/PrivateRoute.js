import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MainStore } from "../store/MainStore";
import { observer } from "mobx-react-lite";
const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const mainStore = useContext(MainStore);
  console.log(mainStore.isRegister);
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
});

export default PrivateRoute;
