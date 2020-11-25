import React from "react";
import { motion } from "framer-motion";
import "./TrackCounter.css";

const animation = {
  scale: [null, 1.5, 1],
  transition: { duration: 0.2 },
};

// animates when the count prop is updated
export const TrackCounter = ({ count }) => (
  <motion.div className="TrackCounter" animate={animation} key={count}>
    {count}
  </motion.div>
);
