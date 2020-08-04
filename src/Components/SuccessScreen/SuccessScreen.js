import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./SuccessScreen.css";
import { ReactComponent as PlaylistSaved } from "../TrackAction/PlaylistSaved.svg";
import VinylRecord from "../TrackAction/vinyl_record.png";

export const SuccessScreen = ({ delay }) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, delay);
  });

  return (
    <motion.div
      className="SuccessScreen"
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 1 },
      }}
      initial={"closed"}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.1 }}
    >
      <div className="Content">
        <motion.div
          className="Title"
          variants={{
            closed: {
              scale: 0.1,
              rotate: 0,
            },
            open: {
              scale: 1,
              rotate: 720,
            },
          }}
          transition={{ duration: 0.9 }}
        >
          <PlaylistSaved />
        </motion.div>
        <motion.div
          className={"Vinyl"}
          variants={{
            closed: { scale: 0.01 },
            open: { scale: 0.4 },
          }}
          transition={{ duration: 0.9 }}
        >
          <div className="VinylLoop">
            <img src={VinylRecord} alt="Vinyl Record" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
