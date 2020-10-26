import React from "react";

import "./App.css";

export const Layout = ({ children }) => {
  return (
    <div className="App">
      <section className="Screen">{children}</section>
    </div>
  );
};

export default Layout;
