import React from "react";
import { motion } from "framer-motion";

import "./NavBar.css";
import { Icon } from "../Icons/Icons";

export const NavBar = ({ theme, onToggle }) => {
  return (
    <nav className="NavBar">
      <button className="TapItem">
        <Icon name="profile" color="var(--icon)" size="var(--size)" />
      </button>
      <button className="TapItem" onClick={() => onToggle()}>
        <motion.div
          className="iconContainer"
          variants={{
            light: { rotate: 0 },
            dark: { rotate: 180 },
          }}
          initial={false}
          animate={theme === "light" ? "light" : "dark"}
        >
          <Icon name="dark-mode" color="var(--icon)" size="var(--size)" />
        </motion.div>
      </button>
    </nav>
  );
};
