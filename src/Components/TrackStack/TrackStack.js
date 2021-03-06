import { motion } from "framer-motion";
import { TrackCard } from "./TrackCard";
import record from "../../images/vinyl_record_simple.png";
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
  <>
    <div className="TrackStackRecordContainer">
      <img className="TrackStackRecord" src={record} alt="Spinning Record" />
    </div>
  </>
);
