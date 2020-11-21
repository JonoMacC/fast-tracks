import React from "react";
import { motion } from "framer-motion";
import { TrackAction } from "./TrackAction";
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
    <TrackAction name="savePlaylist" transition={transition} />
  </motion.div>
);
