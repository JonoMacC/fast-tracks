import React from "react";
import "./NavBar.css";

export const NavBar = ({ isVisible, ...props }) => {
  return isVisible && <nav className="NavBar">{props.children}</nav>;
};
