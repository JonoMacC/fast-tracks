import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../Icons/Icons";
import { Toggle } from "./Toggle";
import "./NavBar.css";

export const NavBar = ({
  theme,
  toggleTheme,
  showSettings,
  toggleSettings,
}) => (
  <nav className="NavBar">
    <Toggle state={showSettings} onToggle={toggleSettings}>
      <Icon
        name="profile"
        size="var(--icon-size)"
        color={showSettings ? "var(--brand-primary)" : "var(--icon)"}
      />
    </Toggle>
    <Toggle state={theme} onToggle={toggleTheme}>
      <motion.div
        className="iconContainer"
        variants={{
          light: { rotate: 0 },
          dark: { rotate: 180 },
        }}
        initial={false}
        animate={theme}
      >
        <Icon name="dark-mode" color="var(--icon)" size="var(--icon-size)" />
      </motion.div>
    </Toggle>
  </nav>
);
