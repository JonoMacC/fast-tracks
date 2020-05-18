import React from "react";

// import react-icons to use the material design play and
// pause button icons
import { IconContext } from "react-icons";
import { MdPlayArrow, MdPause } from "react-icons/md";

import "./Player.css";

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: this.props.isPlaying,
    };

    this.startPlayback = this.startPlayback.bind(this);
    this.endPlayback = this.endPlayback.bind(this);
  }

  startPlayback() {
    // this.props.onPlay(this.props.preview);
    this.player.play();
    this.setState({ isPlaying: true });
  }

  endPlayback() {
    // this.props.onStop(this.props.preview);
    this.player.pause();
    this.setState({ isPlaying: false });
  }

  renderAction() {
    if (this.state.isPlaying) {
      return (
        <button className="Player-action" onClick={this.endPlayback}>
          <MdPause></MdPause>
        </button>
      );
    } else {
      return (
        <button className="Player-action" onClick={this.startPlayback}>
          <MdPlayArrow></MdPlayArrow>
        </button>
      );
    }
  }

  render() {
    return (
      <div
        className="Player"
        style={{
          backgroundImage: `url(${this.props.img})`,
          backgroundSize: "cover",
        }}
      >
        <audio
          src={this.props.preview}
          type="audio/mpeg"
          ref={(ref) => (this.player = ref)}
        >
          Audio Playback Not Supported
        </audio>
        <IconContext.Provider value={{ color: "white", size: "1.5rem" }}>
          {this.renderAction()}
        </IconContext.Provider>
      </div>
    );
  }
}

export default Player;
