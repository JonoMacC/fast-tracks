import React from "react";

import {
  PlayerControl,
  MiniPlayerControl,
} from "../PlayerControl/PlayerControl";
import "./Player.css";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  componentDidUpdate(prevProps) {
    // end playback upon reaching the end of the track
    if (prevProps.hasEnded !== this.props.hasEnded && this.props.hasEnded) {
      this.togglePlay();
    }

    // if stopAllTracks has changed from false to true,
    // and the track state is currently playing,
    // update the state to not playing
    if (
      prevProps.stopAllTracks !== this.props.stopAllTracks &&
      this.props.stopAllTracks &&
      this.state.isPlaying
    ) {
      this.setState({ isPlaying: false });
    }
  }

  async togglePlay() {
    if (this.state.isPlaying) {
      this.setState({ isPlaying: false }, () => {
        this.props.onStop();
      });
    } else {
      // if another track is currently playing, stop the playback for all tracks
      // await the result before initiating play for the current track
      if (this.props.isPlaying) {
        await this.props.onStopAllPlayback();
      }

      this.setState({ isPlaying: true }, () => {
        this.props.onPlay(this.props.track);
      });
    }
  }

  render() {
    return (
      <button
        onClick={() => this.togglePlay()}
        className="Player"
        style={{
          backgroundImage: `url(${this.props.img})`,
        }}
      >
        {this.props.miniPlayer ? (
          <MiniPlayerControl isPlaying={this.state.isPlaying} />
        ) : (
          <PlayerControl isPlaying={this.state.isPlaying} />
        )}
      </button>
    );
  }
}

export default Player;
