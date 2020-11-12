import React, { useState, useEffect } from "react";
import {
  PlayerControl,
  MiniPlayerControl,
} from "../PlayerControl/PlayerControl";
import "./Player.css";

export const Player = ({
  onStop,
  onPlay,
  track,
  currentTrack,
  isPlaying,
  progress,
  ...props
}) => {
  // get the player state from the props
  const playing = isPlaying && currentTrack.id === track.id;

  const [localProgress, setProgress] = useState(0);

  useEffect(() => {
    if (playing) {
      setProgress(progress);
    } else if (isPlaying) {
      setProgress(0);
    }
  }, [playing, isPlaying, progress]);

  // toggle the player
  const togglePlay = () => {
    if (playing) {
      onStop(track);
    } else {
      onPlay(track);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="Player"
      style={{
        backgroundImage: `url(${props.img})`,
      }}
    >
      {props.miniPlayer ? (
        <MiniPlayerControl playing={playing} />
      ) : (
        <PlayerControl playing={playing} progress={localProgress || 0} />
      )}
    </button>
  );
};
