import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrackItem } from "../TrackItem/TrackItem";
import "./TrackList.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

const variants = {
  open: { opacity: 1, y: 0, transition: spring },
  closed: { opacity: 0, y: "-100vh", transition: spring },
};

export const TrackList = ({ tracks, isOpen, ...props }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="TrackListContainer overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: spring }}
          exit={{ opacity: 0, transition: spring }}
        >
          <motion.div
            className="TrackListScrollContainer"
            variants={variants}
            initial={"closed"}
            animate={"open"}
            exit={"closed"}
          >
            <motion.ul
              className="TrackList"
              layout
              transition={{ duration: 0.1 }}
            >
              <AnimatePresence>
                {tracks.map((track) => {
                  return <TrackItem key={track.id} track={track} {...props} />;
                })}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
