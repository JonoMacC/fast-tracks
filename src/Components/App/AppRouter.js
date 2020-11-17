/**
 * Manages the user authentication and routing for the app
 * if the user is authenticated, direct them to the main app
 * if the user is not authenticated, redirect them to the login screen
 */

import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import Login from "./Login";
import App from "./App";
import "./App.css";

function AppRouter(props) {
  // component renders before the authentication data can be
  // retrieved from local storage, so it will initially be null
  const [auth] = useContext(AuthContext);

  return (
    <Switch>
      <PrivateRoute exact path="/" component={App} auth={auth} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default AppRouter;
