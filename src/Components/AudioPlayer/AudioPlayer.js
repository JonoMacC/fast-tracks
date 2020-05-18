import React from "react";

class AudioPlayer extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.startPlayback = this.startPlayback.bind(this);
  //   this.endPlayback = this.endPlayback.bind(this);
  // }

  // startPlayback() {
  //   this.player.play();
  // }

  // endPlayback() {
  //   this.player.pause();
  // }

  render() {
    return (
      <audio
        src={this.props.preview}
        type="audio/mpeg"
        ref={(ref) => (this.player = ref)}
      >
        Audio Playback Not Supported
      </audio>
    );
  }
}

export default AudioPlayer;
