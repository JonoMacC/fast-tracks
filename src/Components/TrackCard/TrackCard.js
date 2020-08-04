import React from "react";
import { motion } from "framer-motion";

import Player from "../Player/Player";
import { TrackAction } from "../TrackAction/TrackAction";
import { Icon } from "../Icons/Icons";
import "./TrackCard.css";

class TrackCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdded: false,
      isDiscard: false,
      isClosed: false,
      isPlaying: this.props.isPlaying,
    };

    this.addTrack = this.addTrack.bind(this);
    this.discardTrack = this.discardTrack.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // if the card is closed, remove it from the list of tracks{
    // delay removing the card from the DOM to give time for
    // "exit" animations to occur
    if (prevState.isClosed !== this.state.isClosed && this.state.isClosed) {
      setTimeout(() => this.props.onRemove(this.props.track), 800);
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.setState({ isPlaying: this.props.isPlaying });
    }
  }

  // change the state of the card to change its appearance
  addTrack() {
    this.setState({ isAdded: true, isClosed: true, isPlaying: false }, () => {
      this.props.onAdd(this.props.track);
    });
  }

  // change the state of the card to change its appearance
  discardTrack() {
    this.setState({ isDiscard: true, isClosed: true, isPlaying: false });
  }

  getTrackAction() {
    if (this.state.isAdded) {
      return "addTrack";
    } else if (this.state.isDiscard) {
      return "discard";
    } else {
      return null;
    }
  }

  togglePlay() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false }, () => {
        this.props.onStop();
      });
    } else {
      this.setState({ isPlaying: true }, () => {
        this.props.onPlay(this.props.track);
      });
    }
  }

  render() {
    const { trackName, artist, album, img, index } = this.props;
    const trackNameColor = this.state.isClosed ? "#ffffff" : "var(--text)";
    const trackNameColorSecondary = this.state.isClosed
      ? "#ffffff"
      : "var(--text-secondary)";

    return (
      <motion.li
        className={"TrackCardContainer"}
        key={index}
        variants={{
          hidden: { opacity: 0, x: 375 },
          enter: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.1 },
          },
        }}
        style={{
          zIndex: 1,
        }}
      >
        <motion.div
          className={"TrackCard surface"}
          variants={{
            addTrack: {
              transition: { ease: "easeOut", delay: 0.6, duration: 0.2 },
              y: -800,
              x: -20,
              rotate: -5,
            },
            discard: {
              transition: { ease: "easeOut", delay: 0.6, duration: 0.2 },
              y: 800,
              x: -20,
              rotate: 5,
            },
          }}
          initial={"enter"}
          animate={this.getTrackAction()}
          translateY={-index * 4}
          style={{
            zIndex: index + 1,
          }}
        >
          {this.state.isClosed && (
            <motion.div
              className="TrackOverlay"
              variants={{
                open: { opacity: 0 },
                closed: { opacity: 1 },
              }}
              initial={"open"}
              animate={"closed"}
            >
              <TrackAction name={this.getTrackAction()} />
            </motion.div>
          )}

          <div className="TrackContent">
            <motion.div
              className="TrackPreview"
              variants={{
                open: { height: "70%" },
                closed: { height: "100%", transition: { duration: 0.1 } },
              }}
              initial={"open"}
              animate={this.state.isClosed ? "closed" : "open"}
            >
              <Player
                track={this.props.track}
                img={img}
                onPlay={this.props.onPlay}
                onStop={this.props.onStop}
                isPlaying={this.state.isPlaying}
                onStopAllPlayback={this.props.onStopAllPlayback}
                stopAllTracks={this.props.stopAllTracks}
                miniPlayer={false}
                hasEnded={this.props.hasEnded}
              />
            </motion.div>

            <motion.div
              className="TrackControls"
              variants={{
                open: { opacity: 1 },
                closed: { opacity: 0, height: 0, y: 400, visibility: "hidden" },
              }}
              initial="open"
              animate={this.state.isClosed ? "closed" : "open"}
            >
              <button
                id="discardTrack"
                className="TrackBtn"
                onClick={this.discardTrack}
              >
                <span className="ActionText label">Discard</span>
                <div className="ActionIcon" aria-label="Discard">
                  <Icon name="discard" color="var(--text)" size="32px" />
                </div>
              </button>
              <button
                id="addTrack"
                className="TrackBtn"
                onClick={this.addTrack}
              >
                <span className="ActionText label">Add Track</span>
                <div className="ActionIcon" aria-label="Add Track">
                  <Icon name="add-track" color="var(--text)" size="32px" />
                </div>
              </button>
            </motion.div>
          </div>

          <motion.div
            className="TrackName"
            variants={{
              open: { top: "72%" },
              closed: { top: "85%" },
            }}
            initial={"open"}
            animate={this.state.isClosed ? "closed" : "open"}
          >
            <h2 style={{ color: trackNameColor }}>{trackName}</h2>
            <p style={{ color: trackNameColorSecondary }}>
              {artist} | {album}
            </p>
          </motion.div>
        </motion.div>
      </motion.li>
    );
  }
}

export default TrackCard;
