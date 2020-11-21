import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppDispatch, AppState } from "../../contexts/AppContext";
import { Player } from "../Player/Player";
import { TrackAction } from "../TrackAction/TrackAction";
import "./TrackCard.css";

export const TrackCard = ({ track, index }) => {
  const dispatch = useContext(AppDispatch);
  const appState = useContext(AppState);
  const trackName = track.name,
    artist = track.artist,
    album = track.album;
  const [state, setState] = useState({
    isAdded: false,
    isDiscard: false,
    isClosed: false,
  });

  // if the card has closed, remove it from the list of tracks
  // delay removing the card to give time for "exit" animations
  useEffect(() => {
    if (state.isClosed) {
      // set the timeout duration based on whether the track has been
      // added or discarded
      let timeout = state.isAdded ? 1000 : 800;
      const onAdd = () => {
        dispatch({ type: "ADD_TRACK", payload: track });
      };
      const onRemove = () => {
        if (!state.isAdded) {
          dispatch({ type: "PAUSE_PLAYBACK", payload: track });
        } else if (track.id === appState.track.id && appState.isPlaying) {
          dispatch({ type: "START_PLAYBACK", payload: track });
        }
        dispatch({ type: "REMOVE_SUGGESTED_TRACK", payload: track });
      };

      setTimeout(() => {
        onRemove();
        state.isAdded && onAdd();
      }, timeout);
    }
  }, [state, track, appState.track.id, appState.isPlaying, dispatch]);

  // change the state of the card to change its appearance
  const addTrack = () => {
    setState({ isAdded: true, isDiscard: false, isClosed: true });
  };

  // change the state of the card to change its appearance
  const discardTrack = () => {
    setState({ isAdded: false, isDiscard: true, isClosed: true });
  };

  const getTrackAction = () => {
    if (state.isAdded) {
      return "addTrack";
    } else if (state.isDiscard) {
      return "discard";
    } else {
      return null;
    }
  };

  const trackNameColor = state.isClosed ? "#ffffff" : "var(--text)";
  const trackNameColorSecondary = state.isClosed
    ? "#ffffff"
    : "var(--text-secondary)";

  const variants = {
    addTrack: {
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
        animate={getTrackAction()}
        translateY={-index * 4}
        style={{
          zIndex: index + 1,
        }}
      >
        {state.isClosed && (
          <motion.div
            className="TrackOverlay"
            variants={{
              open: { opacity: 0 },
              closed: { opacity: 1 },
            }}
            initial={"open"}
            animate={"closed"}
          >
            <TrackAction name={getTrackAction()} />
          </motion.div>
        )}

        <div className="TrackContent">
          <motion.div
            className="TrackPreview"
            variants={{
              open: { height: "70%" },
              closed: { height: "100%", transition: { duration: 0.1 } },
            }}
            initial={"open"}
            animate={state.isClosed ? "closed" : "open"}
          >
            <Player track={track} miniPlayer={false} />
          </motion.div>

          <motion.div
            className="TrackControls"
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0, height: 0, y: 400, visibility: "hidden" },
            }}
            initial="open"
            animate={state.isClosed ? "closed" : "open"}
          >
            <button className="Btn" onClick={discardTrack}>
              <span className="label">Discard</span>
            </button>
            <button className="Btn" onClick={addTrack}>
              <span className="label">Add Track</span>
            </button>
          </motion.div>
        </div>

        <motion.div
          className="TrackName"
          variants={{
            open: { top: "72%" },
            closed: { top: "85%" },
          }}
          initial={"open"}
          animate={state.isClosed ? "closed" : "open"}
        >
          <h2 style={{ color: trackNameColor }}>{trackName}</h2>
          <p style={{ color: trackNameColorSecondary }}>
            {artist} | {album}
          </p>
        </motion.div>
      </motion.div>
    </motion.li>
  );
};
