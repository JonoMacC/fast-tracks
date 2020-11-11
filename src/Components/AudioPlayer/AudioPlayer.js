import React, { useEffect, useRef } from "react";

export const AudioPlayer = ({ isPlaying, track, onEnd, setProgress }) => {
  // Create a reference to the player object
  const player = useRef();

  // End playback when the player reaches the end
  useEffect(() => {
    player.current.onended = () => {
      onEnd();
    };
  }, []);

  // Toggle playback when isPlaying or track changes
  useEffect(() => {
    if (isPlaying) {
      startPlayback();
    } else {
      endPlayback();
    }
  }, [isPlaying, track]);

  // Update the player progress
  useEffect(() => {
    player.current.ontimeupdate = () => {
      setProgress(
        Math.floor((player.current.currentTime / player.current.duration) * 100)
      );
    };
  }, []);

  const startPlayback = () => {
    player.current.play();
  };

  const endPlayback = () => {
    player.current.pause();
  };

  return (
    <audio src={track} type="audio/mpeg" ref={player}>
      Audio Playback Not Supported
    </audio>
  );
};
