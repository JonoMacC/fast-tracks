import React from "react";
import { motion } from "framer-motion";

import { ReactComponent as PlaylistSaved } from "../../images/PlaylistSaved.svg";
import { ReactComponent as TrackAdded } from "../../images/TrackAdded.svg";
import { ReactComponent as Discard } from "../../images/Discard.svg";

export const TrackAction = (props) => {
  switch (props.name) {
    case "addTrack":
      return (
        <motion.div
          variants={{
            open: {
              scale: 0.1,
              rotate: 0,
            },
            closed: {
              scale: 1,
              rotate: 360,
              transition: { duration: 0.3 },
            },
          }}
        >
          <TrackAdded {...props} />
        </motion.div>
      );
    case "discard":
      return (
        <motion.div
          variants={{
            open: {
              scale: 0.1,
              rotate: 0,
            },
            closed: {
              scale: 1,
              rotate: -20,
              transition: { duration: 0.2 },
            },
          }}
        >
          <Discard {...props} />
        </motion.div>
      );
    case "savePlaylist":
      return (
        <motion.div
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 720, 720, 0],
          }}
          transition={props.transition}
        >
          <PlaylistSaved {...props} />
        </motion.div>
      );
    default:
      return <div />;
  }
};
