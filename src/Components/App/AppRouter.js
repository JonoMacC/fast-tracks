/**
 * Manages the user authentication and routing for the app
 * acting as the root node for the app
 * if the user is authorized, direct them to the app
 * if the user is unauthorized, redirect them to the login screen
 */

// External libraries
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { getHashParams } from "../../util/auth";

// Components
import Layout from "./Layout";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import App from "./App";

// Styling
import "./App.css";

function AppRouter(props) {
  // component renders before the authentication data can be
  // retrieved from local storage, so it will initially be null
  const [auth, setAuthData] = useContext(AuthContext);
  const [params, setParams] = useState();
  const history = useHistory();

  // get authentication tokens from the URL
  // returns null if no hash with parameters in URL
  // allows Private Routes to be displayed on first login
  const tokens = getHashParams(window.location);

  // when the component mounts, check URL for authentication
  // data, if it is present, update the parameters state
  useEffect(() => {
    const location = window.location;
    const authData = getHashParams(location);
    if (authData) {
      setParams(authData);
    }
  }, []);

  // when the parameters state updates, update
  // the authentication context
  // clear parameters from the URL
  useEffect(() => {
    if (params) {
      setAuthData(params);
      history.replace("/");
    }
  }, [params]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={App} auth={auth} tokens={tokens} />
    </Switch>
  );
}

export const Login = (props) => {
  return (
    <Layout>
      <div className="titleText">
        <span className="title">Fast Tracks</span>
        <p className="subtitle">Discover new music now.</p>
      </div>
      <a href="/api/login" className="Btn large label">
        Log In With Spotify
      </a>
    </Layout>
  );
};

export default AppRouter;
