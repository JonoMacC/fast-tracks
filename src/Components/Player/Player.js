import { useContext, useEffect, useRef, useState } from "react";
import { AppDispatch, AppState } from "../../contexts/AppContext";
import { useToggle } from "../../util/useToggle";
import { PlayerControl, MiniPlayerControl } from "./PlayerControl";
import "./Player.css";

export const Player = ({ track, miniPlayer }) => {
  const dispatch = useContext(AppDispatch);
  const appState = useContext(AppState);
  const player = useRef(null);
  const [playing, togglePlay] = useToggle(false);
  const [progress, setProgress] = useState(0);

  // Pause playback when the global play state or the current track changes
  useEffect(() => {
    const endPlayback = () => {
      player.current.pause();
      dispatch({ type: "PAUSE_PLAYBACK", payload: track });
    };

    if (appState.track.id !== track.id && playing) {
      endPlayback();
      togglePlay();
    }
  }, [appState.track, track, playing, togglePlay, dispatch]);

  // Reset progress when a different track is playing
  // reload the audio so that it starts playing from 0
  useEffect(() => {
    if (appState.isPlaying && !playing) {
      setProgress(0);
      player.current.load();
    }
  }, [appState.isPlaying, playing, setProgress]);

  const onTogglePlay = () => {
    if (playing) {
      dispatch({ type: "PAUSE_PLAYBACK", payload: track });
      player.current.pause();
    } else {
      dispatch({ type: "START_PLAYBACK", payload: track });
      player.current.play().catch((err) => {
        console.error(err.message);
        dispatch({ type: "PAUSE_PLAYBACK", payload: track });
      });
    }
    togglePlay();
  };

  const handleTimeUpdate = () => {
    setProgress(
      Math.floor((player.current.currentTime / player.current.duration) * 100)
    );
  };

  const onEnd = () => {
    dispatch({ type: "END_PLAYBACK" });
    setProgress(0);
  };

  return (
    <>
      <audio
        ref={player}
        onEnded={onEnd}
        onTimeUpdate={handleTimeUpdate}
        src={track.preview}
        type="audio/mpeg"
      >
        Audio Playback Not Supported{" "}
      </audio>
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
          <PlayerControl playing={playing} progress={progress} />
        )}
      </button>
    </>
  );
};
