import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./App.css";

export const Layout = (props) => {
  const [theme] = useContext(ThemeContext);
  return (
    <div className="App" theme={theme}>
      <section className="Screen">{props.children}</section>
    </div>
  );
};

export default Layout;
