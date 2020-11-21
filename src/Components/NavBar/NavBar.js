import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Icon } from "../Icons";
import { Toggle } from "./Toggle";
import "./NavBar.css";

export const NavBar = ({ showSettings, toggleSettings, isVisible }) => {
  const [theme, toggleTheme] = useContext(ThemeContext);
  return (
    isVisible && (
      <nav className="NavBar">
        <Toggle state={showSettings} onToggle={toggleSettings} name="Settings">
          <Icon
            name="profile"
            size="var(--icon-size)"
            color={showSettings ? "var(--brand-primary)" : "var(--icon)"}
          />
        </Toggle>
        <Toggle state={theme} onToggle={toggleTheme} name="Change Theme">
          <motion.div
            className="iconContainer"
            variants={{
              light: { rotate: 0 },
              dark: { rotate: 180 },
            }}
            initial={false}
            animate={theme}
          >
            <Icon
              name="dark-mode"
              color="var(--icon)"
              size="var(--icon-size)"
            />
          </motion.div>
        </Toggle>
      </nav>
    )
  );
};
