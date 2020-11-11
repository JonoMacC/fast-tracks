import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "../Icons/Icons";
import { TrackCounter } from "../TrackCounter/TrackCounter";
import { TrackList } from "../TrackList/TrackList";
import "./Playlist.css";

const transition = {
  ease: "easeInOut",
  duration: 0.15,
};

export const Playlist = ({
  onToggle,
  onNameChange,
  trackListIsOpen,
  tracks,
  ...props
}) => {
  // use the size of the window to determine whether to always show
  // the playlist (large displays) or to only show it when it is
  // toggled to show (on smaller displays)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // the playlist input field and list of tracks is always visible
  //  ('stayOpen') on larger displays
  const stayOpen = windowWidth >= 768;

  // the playlist is open when either it is toggled to open
  // ('trackListIsOpen') or it is set to always visible ('stayOpen')
  const isOpen = trackListIsOpen || stayOpen;

  // set the playlist to a 'collapsed' state on desktop when no
  // tracks have been added to it
  const collapsePlaylist = stayOpen && tracks.length === 0;

  // the dropdown arrow that toggles the visibility of the playlist
  // is not visible on larger displays ('stayOpen')
  // on smaller displays it is visible when the playlist is toggled
  // to the open state
  const showToggle = () => {
    if (stayOpen) {
      return false;
    } else {
      return isOpen;
    }
  };

  // use an effect hook to get the size of the window
  // this will cause an update on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (collapsePlaylist) {
    return null;
  } else {
    return (
      <section className="Playlist">
        <div className="PlaylistAction">
          <motion.div
            variants={{
              closed: {
                borderRadius: "16px",
                width: "32px",
              },
              open: {
                borderRadius: "8px",
                width: "100%",
              },
            }}
            transition={transition}
            className="PlaylistInput"
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <input
              className="PlaylistName"
              defaultValue="Fast Tracks"
              onChange={(event) => onNameChange(event.target.value)}
              isopen={isOpen.toString()}
            />

            <button
              className="PlaylistExpand "
              onClick={() => onToggle()}
              isopen={isOpen.toString()}
            >
              <div className="inner">
                <Icon name="playlist" color="var(--text-light)" size="24px" />
              </div>
            </button>

            <TrackCounter numTracks={tracks.length} />
          </motion.div>
          <button
            className="PlaylistDropdown"
            aria-label="Show/hide tracks"
            onClick={() => onToggle()}
            isopen={showToggle().toString()}
          >
            <motion.div
              className="iconContainer"
              variants={{
                closed: { rotate: 0 },
                open: { rotate: -180 },
              }}
              initial={false}
              animate={isOpen ? "open" : "closed"}
            >
              <Icon name="dropdown" color="var(--text)" size="24px" />
            </motion.div>
          </button>
        </div>

        <TrackList
          tracks={tracks}
          isRemoval={true}
          isOpen={isOpen}
          {...props}
        />
      </section>
    );
  }
};
