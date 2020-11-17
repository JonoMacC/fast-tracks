import React from "react";
import { routerBasePath } from "../../util/routerBasePath";

const Login = (props) => (
  <div className="App" theme={props.theme}>
    <div className="Background"></div>
    <div className="RecordContainer">
      <div className="Record"></div>
    </div>
    <div className="LoginScreen">
      <div className="Screen">
        <div className="titleText">
          <span className="title">Fast Tracks</span>
          <p className="subtitle">Discover new music now.</p>
        </div>
        <a href={`${routerBasePath}/login`} className="Btn large label rounded">
          Log In With Spotify
        </a>
      </div>
    </div>
  </div>
);

export default Login;
