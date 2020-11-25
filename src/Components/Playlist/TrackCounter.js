import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./TrackCounter.css";

const animation = {
  scale: [null, 1.5, 1],
  transition: { duration: 0.2 },
};

// animates when the count prop is updated
export const TrackCounter = ({ count }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(animation);
  }, [count, controls]);

  return (
    <motion.div className="TrackCounter" animate={controls}>
      {count}
    </motion.div>
  );
};
