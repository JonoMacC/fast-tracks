import React, { useContext, useEffect } from "react";
import { AppDispatch, AppState } from "../../contexts/AppContext";
import { useToggle } from "../../util/useToggle";
import { PlayerControl, MiniPlayerControl } from "./PlayerControl";
import "./Player.css";

export const Player = ({ track, miniPlayer }) => {
  const dispatch = useContext(AppDispatch);
  const appState = useContext(AppState);
  const [playing, togglePlay] = useToggle(false);

  // toggling the player changes playback for
  // the app audio player and toggles the player state
  const onTogglePlay = () => {
    if (playing) {
      dispatch({ type: "PAUSE_PLAYBACK", payload: track });
    } else {
      dispatch({ type: "START_PLAYBACK", payload: track });
    }
    togglePlay();
  };

  useEffect(() => {
    if (appState.track.id !== track.id) {
      playing && togglePlay();
    } else {
      !playing && appState.isPlaying && togglePlay();
    }
  }, [playing, togglePlay, appState.track, appState.isPlaying, track]);

  return (
    <button
      onClick={onTogglePlay}
      className="Player"
      style={{
        backgroundImage: `url(${track.imageSrc})`,
      }}
      aria-label="Start/Stop Playback"
    >
      {miniPlayer ? (
        <MiniPlayerControl playing={playing} />
      ) : (
        <PlayerControl playing={playing} />
      )}
    </button>
  );
};
