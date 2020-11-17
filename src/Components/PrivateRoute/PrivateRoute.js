import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "../App/Layout";

export const PrivateRoute = ({ component: Component, auth, ...props }) => {
  // if loading is set to true, render loading text
  if (auth.loading) {
    return (
      <Route
        render={() => {
          return (
            <Layout {...props}>
              <h2>Loading...</h2>
            </Layout>
          );
        }}
      />
    );
  }

  // if the user has authorization render the component,
  // otherwise redirect to the login screen
  return auth.data ? (
    <Component auth={auth.data} {...props} />
  ) : (
    <Redirect to="/login" />
  );
};
