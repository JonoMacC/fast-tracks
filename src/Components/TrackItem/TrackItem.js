import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./TrackItem.css";
import { Player } from "../Player/Player";
import { Icon } from "../Icons/Icons";

export const TrackItem = ({
  onAdd,
  onRemove,
  track,
  isPlaying,
  isRemoval,
  ...props
}) => {
  const [playing, setPlaying] = useState(isPlaying);

  // Update the local 'isPlaying' state when the isPlaying prop updates
  useEffect(() => {
    setPlaying(isPlaying);
  }, [isPlaying]);

  const add = () => {
    setPlaying(false);
    onAdd(track);
  };

  const remove = () => {
    setPlaying(false);
    onRemove(track);
  };

  return (
    <motion.li
      layout
      transition={{ duration: 0.07 }}
      key={track.id}
      className="TrackItem"
      initial={{ opacity: 0, x: -375 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.07 },
      }}
      exit={{
        opacity: 0,
        x: -375,
        transition: { duration: 0.07 },
      }}
    >
      <div className="TrackPlayerContainer">
        <Player
          track={track}
          img={track.imageSrc}
          isPlaying={playing}
          miniPlayer={true}
          {...props}
        />
      </div>

      <div className="TrackInformation">
        <h2>{track.name}</h2>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button className="TapItem" onClick={isRemoval ? remove : add}>
        <Icon
          name={isRemoval ? "remove" : "add"}
          color="var(--text-secondary)"
          size="24px"
        />
      </button>
    </motion.li>
  );
};
