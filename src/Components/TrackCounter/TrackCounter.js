import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./TrackCounter.css";

export const TrackCounter = ({ numTracks }) => {
  // create an open state to manage whether
  // the counter appears enlarged
  const [open, setOpen] = useState(false);

  // update the state from closed to open when
  // the numTracks props is updated, then set
  // the state back to closed after a delay
  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 150);
  }, [numTracks]);

  // animate the scale of the counter based on
  // whether it is "open" or "closed"
  // when the numTracks prop is updated, the
  // counter will grow in size then shrink again
  return (
    <motion.div
      className="TrackCounter"
      variants={{
        open: { scale: 1.5 },
        closed: { scale: 1 },
      }}
      initial={false}
      animate={open ? "open" : "closed"}
    >
      {numTracks}
    </motion.div>
  );
};
