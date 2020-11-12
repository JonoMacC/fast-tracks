import React, { useEffect, useRef } from "react";

export const AudioPlayer = ({ isPlaying, track, onEnd, setProgress }) => {
  // Create a reference to the player object
  const player = useRef();

  // Toggle playback when isPlaying or track changes
  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    } else {
      endPlayback();
    }
  }, [isPlaying, track]);

  // Reset progress when the track changes
  useEffect(() => {
    setProgress(0);
  }, [track, setProgress]);

  const handleTimeUpdate = () => {
    setProgress(
      Math.floor((player.current.currentTime / player.current.duration) * 100)
    );
  };

  const startPlayback = () => {
    player.current.play();
  };

  const endPlayback = () => {
    player.current.pause();
  };

  return (
    <audio
      src={track}
      type="audio/mpeg"
      ref={player}
      onEnded={onEnd}
      onTimeUpdate={handleTimeUpdate}
    >
      Audio Playback Not Supported
    </audio>
  );
};
