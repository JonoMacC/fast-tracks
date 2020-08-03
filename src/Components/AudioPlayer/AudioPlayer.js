import React from "react";

class AudioPlayer extends React.Component {
  componentDidMount() {
    this.player.onended = () => {
      this.props.onEnd();
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      if (this.props.isPlaying) {
        this.startPlayback();
      } else {
        this.endPlayback();
      }
    }
  }

  getProgress() {
    this.player.ontimeupdate = () => {
      let progress = Math.floor(
        (this.player.currentTime / this.player.duration) * 100
      );
      this.setState({ progress: progress }, () => {
        this.props.onPlay(this.state.progress);
      });
    };
  }

  startPlayback() {
    this.player.play();
  }

  endPlayback() {
    this.player.pause();
  }

  render() {
    return (
      <audio
        src={this.props.track}
        type="audio/mpeg"
        ref={(player) => (this.player = player)}
      >
        Audio Playback Not Supported
      </audio>
    );
  }
}

export default AudioPlayer;
