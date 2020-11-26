import { motion } from "framer-motion";
import { Icon } from "../Icons";
import { PlayerProgress } from "./PlayerProgress";
import "./PlayerControl.css";

const Path = (props) => <motion.path fill="hsl(0, 0%, 100%)" {...props} />;

const pausePaths = [
  "M 17.5 10 L 32.5 10 L 32.5 70 L 17.5 70 Z",
  "M 47.5 10 L 62.5 10 L 62.5 70 L 47.5 70 Z",
];

const playPaths = [
  "M 20 31 L 20 5.5 L 80 40 L 20 64.5 Z",
  "M 20 40 L 80 40 L 20 74.5 L 20 48.5 Z",
];

export const PlayerControl = ({ playing }) => (
  <motion.div
    className="TrackPlayer"
    variants={{
      open: { opacity: 1 },
      closed: { opacity: 0, transition: { duration: 0.07 } },
    }}
  >
    <motion.div
      initial={false}
      animate={playing ? "play" : "pause"}
      className="TrackToggle"
    >
      <div className="PlayerControl">
        <div className="PlayerElement">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <Path
              variants={{
                play: { d: pausePaths[1] },
                pause: { d: playPaths[0] },
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            />
            <Path
              variants={{
                play: { d: pausePaths[0] },
                pause: { d: playPaths[1] },
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
        <PlayerProgress playing={playing} />
      </div>
    </motion.div>
  </motion.div>
);

export const MiniPlayerControl = ({ playing }) => (
  <div className="PlayerAction">
    {playing ? (
      <Icon name="pause" color="var(--text-dark)" size="24px" />
    ) : (
      <Icon name="play" color="var(--text-dark)" size="24px" />
    )}
  </div>
);
