import { motion, AnimatePresence } from "framer-motion";
import { TrackItem } from "./TrackItem";
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

export const TrackList = ({ tracks, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
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
          <div className="TrackListWrapper">
            <ul className="TrackList">
              <AnimatePresence>
                {tracks.map((track) => {
                  return (
                    <TrackItem key={track.id} track={track} isRemoval={true} />
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
