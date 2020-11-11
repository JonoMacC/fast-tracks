import React from "react";
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
  ...props
}) => {
  // get the player state from the props
  const playing = isPlaying && currentTrack.id === track.id;

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
        <MiniPlayerControl isPlaying={playing} />
      ) : (
        <PlayerControl isPlaying={playing} progress={props.progress} />
      )}
    </button>
  );
};
