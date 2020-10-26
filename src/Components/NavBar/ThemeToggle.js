import React from "react";
import { motion } from "framer-motion";

import { Icon } from "../Icons/Icons";

export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button className="TapItem" onClick={onToggle}>
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
    </button>
  );
};
