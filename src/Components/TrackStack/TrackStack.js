import React from "react";
import { motion } from "framer-motion";
import { TrackCard } from "./TrackCard";
import "./TrackStack.css";

export const TrackStack = ({ tracks }) => (
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
          <TrackCard key={track.id} track={track} index={index} />
        ))}
      </motion.ul>
    )}
    <SpinningRecord />
  </section>
);

const SpinningRecord = () => (
  <div className="TrackStackRecordContainer">
    <motion.div
      className="TrackStackRecord"
      animate={{ rotate: [0, 360] }}
      transition={{
        loop: Infinity,
        duration: 1.6,
        ease: "linear",
      }}
    ></motion.div>
  </div>
);
