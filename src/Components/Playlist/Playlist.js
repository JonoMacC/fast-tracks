import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToggle } from "../../util/useToggle";
import { TrackCounter } from "./TrackCounter";
import { TrackList } from "./TrackList";
import { Icon } from "../Icons";
import "./Playlist.css";

const transition = {
  ease: "easeInOut",
  duration: 0.15,
};

const variants = {
  closed: {
    borderRadius: "16px",
    width: "32px",
  },
  open: {
    borderRadius: "8px",
    width: "100%",
  },
};

export const Playlist = ({ onNameChange, isVisible, tracks }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPlaylist, togglePlaylist] = useToggle(false);

  // the playlist input field and list of tracks is always visible
  //  ('stayOpen') on larger displays
  const stayOpen = windowWidth >= 768;

  // the playlist is open when either it is toggled to open
  // ('showPlaylist') or it is set to always visible ('stayOpen')
  const isOpen = showPlaylist || stayOpen;

  // update the window width state on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    isVisible && (
      <section className="Playlist">
        <ActionBar isOpen={isOpen}>
          {isOpen && <PlaylistInput onNameChange={onNameChange} />}
          {!isOpen && <OpenPlaylist onToggle={togglePlaylist} />}
          {isOpen && <ClosePlaylist onToggle={togglePlaylist} />}
          <TrackCounter count={tracks.length} />
        </ActionBar>
        <TrackList tracks={tracks} isVisible={isOpen} />
      </section>
    )
  );
};

const ActionBar = ({ isOpen, children }) => (
  <div className="PlaylistAction" isopen={isOpen.toString()}>
    <motion.div
      variants={variants}
      transition={transition}
      className="PlaylistInput"
      initial={false}
      animate={isOpen ? "open" : "closed"}
    >
      {children}
    </motion.div>
  </div>
);

const ClosePlaylist = ({ onToggle }) => {
  return (
    <button
      className="PlaylistDropdown"
      aria-label="Close Playlist"
      onClick={onToggle}
    >
      <motion.div
        className="iconContainer"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: -180, opacity: 1 }}
      >
        <Icon name="dropdown" color="var(--text)" size="24px" />
      </motion.div>
    </button>
  );
};

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
