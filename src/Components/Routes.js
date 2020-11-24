/**
 * Manages the user authentication and routing for the app
 * if the user is authenticated, direct them to the main app
 * if the user is not authenticated, redirect them to the login screen
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Login } from "./Login";
import App from "./App";
import "../styles/global.css";

function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={App} />
      <Route path="/login" component={Login} />
    </Switch>
  );
}

export default Routes;
