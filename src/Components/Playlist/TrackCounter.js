import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "./TrackCounter.css";

const animation = {
  scale: [null, 1.5, 1],
  transition: { duration: 0.2 },
};

export const TrackCounter = ({ numTracks }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(animation);
  }, [numTracks, controls]);

  return (
    <motion.div className="TrackCounter" animate={controls}>
      {numTracks}
    </motion.div>
  );
};
