/**
 * Manages the user authentication and routing for the app
 * if the user is authenticated, direct them to the main app
 * if the user is not authenticated, redirect them to the login screen
 */

import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { useTheme } from "../../util/useTheme";
import Login from "./Login";
import App from "./App";
import "./App.css";

function AppRouter() {
  const [auth] = useContext(AuthContext);
  const [theme, toggleTheme] = useTheme();

  return (
    <Switch>
      <PrivateRoute
        exact
        path="/"
        component={App}
        auth={auth}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Route path="/login" render={() => <Login theme={theme} />} />
    </Switch>
  );
}

export default AppRouter;
