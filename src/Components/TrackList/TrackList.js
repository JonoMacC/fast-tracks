import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./TrackList.css";
import { TrackItem } from "../TrackItem/TrackItem";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 40,
};

export const TrackList = (props) => {
  const {
    tracks,
    onAdd,
    onRemove,
    onPlay,
    onStop,
    isRemoval,
    isPlaying,
    onStopAllPlayback,
    stopAllTracks,
    isOpen,
    hasEnded,
  } = props;
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
              return (
                <TrackItem
                  key={track.id}
                  track={track}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  isRemoval={isRemoval}
                  onPlay={onPlay}
                  onStop={onStop}
                  isPlaying={isPlaying}
                  onStopAllPlayback={onStopAllPlayback}
                  stopAllTracks={stopAllTracks}
                  hasEnded={hasEnded}
                  {...props}
                />
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </motion.div>
    </div>
  );
};
