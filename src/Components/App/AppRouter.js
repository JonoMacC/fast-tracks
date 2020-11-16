/**
 * Manages the user authentication and routing for the app
 * acting as the root node for the app
 * if the user is authorized, direct them to the app
 * if the user is unauthorized, redirect them to the login screen
 */

// External libraries
import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

// Utilities
import { AuthContext } from "../../contexts/AuthContext";
import { routerBasePath } from "../../util/routerBasePath";

// Components
import Layout from "./Layout";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import App from "./App";

// Styling
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

export const Login = (props) => (
  <Layout>
    <div className="titleText">
      <span className="title">Fast Tracks</span>
      <p className="subtitle">Discover new music now.</p>
    </div>
    <a href={`${routerBasePath}/login`} className="Btn large label rounded">
      Log In With Spotify
    </a>
  </Layout>
);

export default AppRouter;
