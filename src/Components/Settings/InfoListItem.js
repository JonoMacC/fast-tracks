import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../Icons/Icons";

import "./Settings.css";
import "../TableCell/TableCell.css";

export const InfoListItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li layout className="TableCell">
      <motion.div className="Header InfoListItem" onClick={toggleOpen}>
        <p>{props.title}</p>
        <motion.div
          className="iconContainer"
          variants={{
            expand: { rotate: 0 },
            collapse: { rotate: 180 },
          }}
          initial={false}
          animate={isOpen ? "collapse" : "expand"}
        >
          <Icon name="expand" color="var(--icon)" size="var(--icon-size)" />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};
