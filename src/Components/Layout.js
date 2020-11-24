import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const Layout = (props) => {
  const [theme] = useContext(ThemeContext);
  return (
    <div className="App" theme={theme}>
      {props.children}
    </div>
  );
};

export const PageLayout = (props) => (
  <Layout>
    <div className="Background"></div>
    <div className="RecordContainer">
      <div className="Record"></div>
    </div>
    <div className="LoginScreen">{props.children}</div>
  </Layout>
);

export default Layout;
