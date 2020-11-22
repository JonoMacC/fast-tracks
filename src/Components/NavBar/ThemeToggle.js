import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Icon } from "../Icons";
import { Toggle } from "./Toggle";

export const ThemeToggle = () => {
  const [theme, toggleTheme] = useContext(ThemeContext);
  return (
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
        <Icon name="dark-mode" color="var(--icon)" size="var(--icon-size)" />
      </motion.div>
    </Toggle>
  );
};
