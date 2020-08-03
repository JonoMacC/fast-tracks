import React from "react";
import { motion } from "framer-motion";

import "./TrackItem.css";
import Player from "../Player/Player";
import { Icon } from "../Icons/Icons";

class TrackItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: this.props.isPlaying,
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.setState({ isPlaying: this.props.isPlaying });
    }
  }

  addTrack() {
    this.setState({ isPlaying: false }, () => {
      this.props.onAdd(this.props.track);
    });
  }

  removeTrack() {
    this.setState({ isPlaying: false }, () => {
      this.props.onRemove(this.props.track);
    });
  }

  render() {
    const trackAction = this.props.isRemoval ? "removeTrack" : "addTrack";
    const trackClass = this.props.isRemoval ? "remove" : "add";

    return (
      <motion.li
        layout
        transition={{ duration: 0.07 }}
        key={this.props.track.id}
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
            track={this.props.track}
            img={this.props.track.imageSrc}
            onPlay={this.props.onPlay}
            onStop={this.props.onStop}
            isPlaying={this.state.isPlaying}
            onStopAllPlayback={this.props.onStopAllPlayback}
            stopAllTracks={this.props.stopAllTracks}
            hasEnded={this.props.hasEnded}
            miniPlayer={true}
          />
        </div>

        <div className="TrackInformation">
          <h2>{this.props.track.name}</h2>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <button className="TapItem" onClick={this[trackAction]}>
          <Icon name={trackClass} color="var(--text-secondary)" size="24px" />
        </button>
      </motion.li>
    );
  }
}

export default TrackItem;
