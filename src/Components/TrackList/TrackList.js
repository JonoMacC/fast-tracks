import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrackItem } from "../TrackItem/TrackItem";
import "./TrackList.css";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

export const TrackList = ({ tracks, isOpen, ...props }) => {
  return (
    <div className="TrackListContainer overlay" isopen={isOpen.toString()}>
      <motion.div
        className="TrackListScrollContainer"
        variants={{
          open: { opacity: 1, y: 0 },
          closed: { opacity: 0, y: "-100vh" },
        }}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        transition={spring}
      >
        <motion.ul className="TrackList" layout transition={{ duration: 0.1 }}>
          <AnimatePresence>
            {tracks.map((track) => {
              return <TrackItem key={track.id} track={track} {...props} />;
            })}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </div>
  );
};
