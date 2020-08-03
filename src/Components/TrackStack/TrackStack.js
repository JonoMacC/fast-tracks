import React from "react";
import { motion } from "framer-motion";

import "./TrackStack.css";
import TrackCard from "../TrackCard/TrackCard";

class TrackStack extends React.Component {
  // the list of tracks copies the set of tracks
  // from the App into its own state
  // this way tracks can be removed from the list
  // without affecting the display of the tracks
  constructor(props) {
    super(props);

    this.state = {
      trackList: [],
    };

    this.onRemove = this.onRemove.bind(this);
  }

  componentDidUpdate(prevProps) {
    // set the list of tracks based on the tracks received via props
    if (prevProps.tracks !== this.props.tracks) {
      this.setState({ trackList: this.props.tracks });
    }
  }

  // when a track has been added to the playlist or
  // discarded, it is removed from the local list of tracks
  onRemove(track) {
    let newTracks = this.state.trackList;
    newTracks = newTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );

    this.setState({ trackList: newTracks });
    this.props.onStop();
    this.props.onDiscard(track);
  }

  render() {
    return (
      <section className="TrackStackContainer">
        {this.props.tracks.length !== 0 && (
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
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {this.props.tracks.map((track, index) => (
              <TrackCard
                key={index}
                track={track}
                trackName={track.name}
                artist={track.artist}
                album={track.album}
                img={track.imageSrc}
                index={index}
                onPlay={this.props.onPlay}
                onStop={this.props.onStop}
                onRemove={this.onRemove}
                hasEnded={this.props.hasEnded}
                onAdd={this.props.onAdd}
                stopAllTracks={this.props.stopAllTracks}
                onStopAllPlayback={this.props.onStopAllPlayback}
                isPlaying={this.props.isPlaying}
              />
            ))}
          </motion.ul>
        )}
      </section>
    );
  }
}

export default TrackStack;
