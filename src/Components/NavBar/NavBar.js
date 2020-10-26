import React from "react";

import "./NavBar.css";
import { SettingsToggle } from "./SettingsToggle";
import { ThemeToggle } from "./ThemeToggle";

export const NavBar = ({ theme, toggleTheme, isVisible, toggleSettings }) => {
  return (
    <nav className="NavBar">
      <SettingsToggle isVisible={isVisible} onToggle={toggleSettings} />
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </nav>
  );
};
