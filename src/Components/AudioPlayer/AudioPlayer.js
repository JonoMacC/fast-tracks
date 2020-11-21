import React, { useContext, useEffect, useRef } from "react";
import { AppDispatch, ProgressContext } from "../../contexts/AppContext";

export const AudioPlayer = ({ isPlaying, track }) => {
  // Create a reference to the player object
  const player = useRef();
  const [, setProgress] = useContext(ProgressContext);
  const dispatch = useContext(AppDispatch);

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
    player.current.play().catch((err) => console.error(err.message));
  };

  const endPlayback = () => {
    player.current.pause();
  };

  const onEnd = () => {
    dispatch({ type: "END_PLAYBACK" });
    setProgress(0);
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
