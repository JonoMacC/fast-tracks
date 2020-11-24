import React, { useContext, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AppDispatch } from "../../contexts/AppContext";
import { Player } from "../Player/Player";
import { TrackAction } from "../TrackAction/TrackAction";
import "./TrackCard.css";

const variants = {
  add: {
    transition: { ease: "easeOut", delay: 0.8, duration: 0.15 },
    y: "-120vh",
    x: -20,
    rotate: -5,
  },
  discard: {
    transition: { ease: "easeOut", delay: 0.6, duration: 0.15 },
    y: "120vh",
    x: -20,
    rotate: 5,
  },
};

export const TrackCard = ({ track, index }) => {
  const dispatch = useContext(AppDispatch);
  const [state, setState] = useState(null);

  const isClosed = useCallback(() => {
    return state === "add" || state === "discard";
  }, [state]);

  // if the card has closed, remove it from the list of tracks
  // delay removing the card to give time for "exit" animations
  useEffect(() => {
    if (isClosed()) {
      let timeout = state === "add" ? 1000 : 800;
      const onAdd = () => {
        dispatch({ type: "ADD_TRACK", payload: track });
      };
      const onRemove = () => {
        dispatch({ type: "PAUSE_PLAYBACK", payload: track });
        dispatch({ type: "REMOVE_SUGGESTED_TRACK", payload: track });
      };

      setTimeout(() => {
        onRemove();
        state === "add" && onAdd();
      }, timeout);
    }
  }, [state, track, dispatch, isClosed]);

  // change the state of the card to change its appearance
  const addTrack = () => {
    setState("add");
  };

  // change the state of the card to change its appearance
  const discardTrack = () => {
    setState("discard");
  };

  return (
    <motion.li
      className={"TrackCardContainer"}
      key={track.id}
      variants={{
        hidden: { opacity: 0, x: 375 },
        enter: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.1 },
        },
      }}
      style={{
        zIndex: 1,
      }}
    >
      <motion.div
        className={"TrackCard surface"}
        variants={variants}
        initial={"enter"}
        animate={state ? state : "enter"}
        translateY={-index * 4}
        style={{
          zIndex: index + 1,
        }}
      >
        {isClosed() && (
          <TrackOverlay>
            <TrackAction name={state} />
          </TrackOverlay>
        )}

        <div className="TrackContent">
          <TrackPreview isClosed={isClosed()}>
            <Player track={track} miniPlayer={false} />
          </TrackPreview>
          {!isClosed() && (
            <TrackControls discardTrack={discardTrack} addTrack={addTrack} />
          )}
        </div>
        <TrackInfo track={track} isClosed={isClosed()} />
      </motion.div>
    </motion.li>
  );
};

const TrackPreview = ({ isClosed, ...props }) => (
  <motion.div
    className="TrackPreview"
    variants={{
      open: { height: "70%" },
      closed: { height: "100%", transition: { duration: 0.1 } },
    }}
    initial={"open"}
    animate={isClosed ? "closed" : "open"}
  >
    {props.children}
  </motion.div>
);

const TrackOverlay = (props) => (
  <motion.div
    className="TrackOverlay"
    variants={{
      open: { opacity: 0 },
      closed: { opacity: 1 },
    }}
    initial={"open"}
    animate={"closed"}
  >
    {props.children}
  </motion.div>
);

const TrackControls = ({ discardTrack, addTrack }) => (
  <div className="TrackControls">
    <button className="Btn" onClick={discardTrack}>
      <span className="label">Discard</span>
    </button>
    <button className="Btn" onClick={addTrack}>
      <span className="label">Add Track</span>
    </button>
  </div>
);

const TrackInfo = ({ isClosed, track }) => {
  const { name, artist, album } = track;
  const primaryColor = isClosed ? "#ffffff" : "var(--text)";
  const secondaryColor = isClosed ? "#ffffff" : "var(--text-secondary)";
  return (
    <motion.div
      className="TrackName"
      variants={{
        open: { top: "72%" },
        closed: { top: "85%" },
      }}
      initial={"open"}
      animate={isClosed ? "closed" : "open"}
    >
      <h2 style={{ color: primaryColor }}>{name}</h2>
      <p style={{ color: secondaryColor }}>
        {artist} | {album}
      </p>
    </motion.div>
  );
};