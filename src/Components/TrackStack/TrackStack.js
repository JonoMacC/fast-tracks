import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrackCard } from "../TrackCard/TrackCard";
import "./TrackStack.css";

export const TrackStack = ({ tracks, onStop, onDiscard, ...props }) => {
  // the list of tracks copies the set of tracks
  // from the App into its own state
  // this way tracks can be removed from the list
  // without affecting the display of the tracks
  const [trackList, setTrackList] = useState([]);

  // set the list of tracks based on the tracks received via props
  useEffect(() => {
    setTrackList(tracks);
  }, [tracks]);

  // when a track has been added to the playlist or
  // discarded, it is removed from the local list of tracks
  const onRemove = (track) => {
    let newTracks = trackList;
    newTracks = newTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );

    setTrackList(newTracks);
    onStop(track);
    onDiscard(track);
  };

  return (
    <section className="TrackStackContainer">
      {tracks.length !== 0 && (
        <motion.ul
          className="TrackStack"
          variants={{
            hidden: {},
            enter: {
              transition: {
                staggerChildren: 0.07,
                ease: "easeInOut",
              },
            },
          }}
          initial={"hidden"}
          animate={"enter"}
        >
          {tracks.map((track, index) => (
            <TrackCard
              key={index}
              track={track}
              trackName={track.name}
              artist={track.artist}
              album={track.album}
              index={index}
              onStop={onStop}
              onRemove={onRemove}
              {...props}
            />
          ))}
        </motion.ul>
      )}
    </section>
  );
};
