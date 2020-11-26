import { motion } from "framer-motion";
import { useToggle } from "../../util/useToggle";
import { TrackCounter } from "./TrackCounter";
import { TrackList } from "./TrackList";
import { Icon } from "../Icons";
import "./Playlist.css";

export const Playlist = ({ onNameChange, isVisible, tracks }) => {
  const [showPlaylist, togglePlaylist] = useToggle(false);

  return (
    isVisible && (
      <section className="Playlist">
        <ActionBar isOpen={showPlaylist}>
          <PlaylistInput onNameChange={onNameChange} />
          {!showPlaylist && <OpenPlaylist onToggle={togglePlaylist} />}
          {showPlaylist && <ClosePlaylist onToggle={togglePlaylist} />}
          <TrackCounter count={tracks.length} />
        </ActionBar>
        <TrackList tracks={tracks} isVisible={showPlaylist} />
      </section>
    )
  );
};

const ActionBar = ({ isOpen, children }) => (
  <div className="PlaylistAction" isopen={isOpen.toString()}>
    <div className="PlaylistInput" isopen={isOpen.toString()}>
      {children}
    </div>
  </div>
);

const ClosePlaylist = ({ onToggle }) => (
  <button
    className="PlaylistDropdown"
    aria-label="Close Playlist"
    onClick={onToggle}
  >
    <motion.div
      className="iconContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Icon name="collapse" color="var(--text)" size="24px" />
    </motion.div>
  </button>
);

const OpenPlaylist = ({ onToggle }) => (
  <button className="PlaylistExpand" onClick={onToggle} aria-label="Playlist">
    <div className="inner">
      <Icon name="playlist" color="var(--text-light)" size="24px" />
    </div>
  </button>
);

const PlaylistInput = ({ onNameChange }) => (
  <input
    className="PlaylistName"
    defaultValue="Fast Tracks"
    onChange={(event) => onNameChange(event.target.value)}
  />
);
