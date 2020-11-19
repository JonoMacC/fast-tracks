import React from "react";
import { motion } from "framer-motion";
import { Player } from "../Player/Player";
import { Icon } from "../Icons/Icons";
import "./TrackItem.css";

export const TrackItem = ({ onAdd, onRemove, track, isRemoval, ...props }) => {
  const add = () => {
    onAdd(track);
  };

  const remove = () => {
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
        transition: { duration: 0.07, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        x: -375,
        transition: { duration: 0.15, ease: "easeIn" },
      }}
    >
      <div className="TrackPlayerContainer">
        <Player
          track={track}
          img={track.imageSrc}
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
