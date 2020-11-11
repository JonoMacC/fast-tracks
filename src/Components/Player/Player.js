import React, { useState, useEffect } from "react";
import {
  PlayerControl,
  MiniPlayerControl,
} from "../PlayerControl/PlayerControl";
import "./Player.css";

export const Player = ({
  hasEnded,
  stopAllTracks,
  onStop,
  onPlay,
  track,
  currentTrack,
  stopCurrentTrack,
  ...props
}) => {
  const [playing, setPlaying] = useState(false);

  // stop the player when the track comes to an end
  useEffect(() => {
    if (hasEnded && playing) {
      setPlaying(false);
    }
  }, [hasEnded]);

  // stop the player when all tracks are told to stop
  useEffect(() => {
    if (stopAllTracks) {
      setPlaying(false);
    }
  }, [stopAllTracks]);

  // stop the player when the current track is told to stop
  useEffect(() => {
    if (stopCurrentTrack && track.id === currentTrack.id) {
      setPlaying(false);
    }
  }, [stopCurrentTrack]);

  // start and stop playback based on the player state
  useEffect(() => {
    if (!playing) {
      onStop(track);
    } else {
      onPlay(track);
    }
  }, [playing]);

  // toggle the player state
  const togglePlay = () => {
    setPlaying((playing) => !playing);
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
        <PlayerControl isPlaying={playing} />
      )}
    </button>
  );
};
