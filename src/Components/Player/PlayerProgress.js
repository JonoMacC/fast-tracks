import { useContext, useEffect, useState } from "react";
import { AppState, ProgressContext } from "../../contexts/AppContext";
import { ProgressRing } from "./ProgressRing";

export const PlayerProgress = ({ playing }) => {
  const { isPlaying } = useContext(AppState);
  const [progress] = useContext(ProgressContext);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    if (playing) {
      setLocalProgress(progress);
    } else if (isPlaying) {
      setLocalProgress(0);
    }
  }, [playing, isPlaying, progress]);

  return (
    <div className="PlayerElement">
      <ProgressRing
        radius={70}
        stroke={4}
        progress={localProgress || 0}
        strokeColor="white"
      />
    </div>
  );
};
