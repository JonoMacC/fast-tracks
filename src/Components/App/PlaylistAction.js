import React from "react";
import { motion } from "framer-motion";
import "./PlaylistAction.css";

const transition = {
  duration: 1.6,
  times: [0, 0.25, 0.85, 1],
  ease: "easeOut",
};

export const PlaylistAction = () => (
  <motion.div
    className="SaveActionContainer"
    animate={{ opacity: [0, 1, 1, 0] }}
    transition={transition}
  >
    <motion.div
      className="SaveRecord"
      animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
      transition={transition}
    ></motion.div>
    <motion.div
      className="SaveAction"
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        rotate: [0, 720, 720, 0],
      }}
      transition={transition}
    ></motion.div>
  </motion.div>
);
