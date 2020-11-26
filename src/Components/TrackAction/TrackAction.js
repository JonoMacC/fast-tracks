import { motion } from "framer-motion";
import { ReactComponent as PlaylistSaved } from "../../images/PlaylistSaved.svg";
import { ReactComponent as TrackAdded } from "../../images/TrackAdded.svg";
import { ReactComponent as Discard } from "../../images/Discard.svg";

const addVariants = {
  open: {
    scale: 0.1,
    rotate: 0,
  },
  closed: {
    scale: 1,
    rotate: 360,
    transition: { duration: 0.3 },
  },
};

const discardVariants = {
  open: {
    scale: 0.1,
    rotate: 0,
  },
  closed: {
    scale: 1,
    rotate: -20,
    transition: { duration: 0.2 },
  },
};

const onSave = {
  opacity: [0, 1, 1, 0],
  scale: [0, 1, 1, 0],
  rotate: [0, 720, 720, 0],
};

export const TrackAction = (props) => {
  switch (props.name) {
    case "add":
      return (
        <motion.div variants={addVariants}>
          <TrackAdded {...props} />
        </motion.div>
      );
    case "discard":
      return (
        <motion.div variants={discardVariants}>
          <Discard {...props} />
        </motion.div>
      );
    case "savePlaylist":
      return (
        <motion.div animate={onSave} transition={props.transition}>
          <PlaylistSaved {...props} />
        </motion.div>
      );
    default:
      return <div />;
  }
};
