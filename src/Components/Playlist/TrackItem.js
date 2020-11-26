import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AppDispatch } from "../../contexts/AppContext";
import { Player } from "../Player/Player";
import { Icon } from "../Icons";
import "./TrackItem.css";

export const TrackItem = ({ track, isRemoval }) => {
  const dispatch = useContext(AppDispatch);

  const add = () => {
    dispatch({ type: "ADD_TRACK", payload: track });
  };

  const remove = () => {
    dispatch({ type: "REMOVE_PLAYLIST_TRACK", payload: track });
  };

  // console.log("TrackItem render", Date.now());

  return (
    <motion.li
      layout
      transition={{ duration: 0.07, layoutY: { duration: 0.07 } }}
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
        transition: { duration: 0.1, ease: "easeIn" },
      }}
    >
      <div className="TrackPlayerContainer">
        <Player track={track} miniPlayer={true} />
      </div>

      <div className="TrackInformation">
        <h2>{track.name}</h2>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button
        className="TapItem"
        onClick={isRemoval ? remove : add}
        aria-label={isRemoval ? "Remove Track" : "Add Track"}
      >
        <Icon
          name={isRemoval ? "remove" : "add"}
          color="var(--text-secondary)"
          size="24px"
        />
      </button>
    </motion.li>
  );
};
