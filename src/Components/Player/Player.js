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
  onStopAllPlayback,
  isPlaying,
  ...props
}) => {
  const [playing, setPlaying] = useState(false);

  // toggle the player when the track comes to an end
  useEffect(() => {
    const stopPlaying = async () => {
      if (hasEnded && playing) {
        await togglePlay();
      }
    };
    stopPlaying();
  }, [hasEnded]);

  // if stopAllTracks has changed
  // update the state to not playing
  useEffect(() => {
    if (stopAllTracks) {
      setPlaying(false);
    }
  }, [stopAllTracks]);

  const togglePlay = async () => {
    if (playing) {
      await setPlaying(false);
      onStop();
    } else {
      // if another track is currently playing, stop the playback for all tracks
      // await the result before initiating play for the current track
      if (isPlaying) {
        await onStopAllPlayback();
      }

      await setPlaying(true);
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
        <PlayerControl isPlaying={playing} />
      )}
    </button>
  );
};
