import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./SuccessScreen.css";
import { ReactComponent as PlaylistSaved } from "../TrackAction/PlaylistSaved.svg";
import VinylRecord from "../TrackAction/vinyl_record.png";

export const SuccessScreen = (props) => {
  return (
    <AnimatePresence>
      <motion.div
        className="SuccessScreen"
        variants={{
          open: { opacity: 0 },
          closed: { opacity: 1 },
        }}
        initial={"open"}
        animate={"closed"}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <div className="Content">
          <motion.div
            className="Title"
            variants={{
              open: {
                scale: 0.1,
                rotate: 0,
              },
              closed: {
                scale: 1,
                rotate: 720,
                transition: { duration: 0.9 },
              },
            }}
            exit={{ scale: 0.1, rotate: 0 }}
          >
            <PlaylistSaved {...props} />
          </motion.div>
          <motion.div
            className={"Vinyl"}
            variants={{
              open: { scale: 0.01 },
              closed: {
                scale: 0.4,
                transition: { duration: 0.9 },
              },
            }}
            exit={{ scale: 0.01 }}
          >
            <div className="VinylLoop">
              <img src={VinylRecord} alt="Vinyl Record" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
