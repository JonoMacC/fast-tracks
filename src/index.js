import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import App from "./components/App/AppRouter";

import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
