import React from "react";

import "./App.css";

export const Layout = (props) => {
  return (
    <div className="App" theme={props.theme}>
      <section className="Screen">{props.children}</section>
    </div>
  );
};

export default Layout;
