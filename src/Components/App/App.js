import React from "react";
import { Playlist } from "../Playlist/Playlist";
import { NavBar } from "../NavBar/NavBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { TrackStack } from "../TrackStack/TrackStack";
import { ActionBar } from "../ActionBar/ActionBar";
import { Settings } from "../Settings/Settings";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestedTracks: [],
      currentTrack: "",
      nextTrack: "",
      playlistName: "Fast Tracks",
      playlistTracks: [],
      trackCount: 0,
      isPlaying: false,
      showPlaylist: false,
      playlistSaved: false,
      showSettings: false,
      numTracks: 5,
      progress: 0,
    };

    // Suggested tracks
    this.addTrack = this.addTrack.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.removeSuggestedTrack = this.removeSuggestedTrack.bind(this);
    this.resetTracks = this.resetTracks.bind(this);

    // Playlist tracks
    this.removePlaylistTrack = this.removePlaylistTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.toggleShowPlaylist = this.toggleShowPlaylist.bind(this);

    // Audio playback
    this.startPlayback = this.startPlayback.bind(this);
    this.pausePlayback = this.pausePlayback.bind(this);
    this.setProgress = this.setProgress.bind(this);

    // Settings
    this.toggleShowSettings = this.toggleShowSettings.bind(this);
    this.setNumTracks = this.setNumTracks.bind(this);
  }

  componentDidMount() {
    Spotify.authorize(this.props.auth);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      Spotify.authorize(this.props.auth);
    }

    if (prevState.currentTrack !== this.state.currentTrack) {
      this.setState({ progress: 0 });
    }
  }

  // get list of suggested new tracks
  // update the set of tracks with those returned from Spotify
  getTracks() {
    // if the currently playing track is in the suggested tracks list, stop playback
    if (
      this.state.suggestedTracks.includes(this.state.currentTrack) &&
      this.state.isPlaying
    ) {
      this.pausePlayback();
    }

    // flush the list of suggested tracks
    this.resetTracks();

    // get recommended tracks from Spotify
    Spotify.getTracks(this.state.numTracks)
      .then((suggestedTracks) => {
        this.setState({ suggestedTracks: suggestedTracks });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  // reset the state for a new list of suggested tracks
  resetTracks() {
    this.setState({
      suggestedTracks: [],
    });
  }

  // add a track to the playlist
  // if the playlist already contains the track, do nothing
  // otherwise, append the track to the end of the playlist
  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    this.setState((prevState) => ({
      playlistTracks: [...prevState.playlistTracks, track],
      trackCount: prevState.trackCount + 1,
    }));
  }

  // remove a track from the suggested tracks list
  removeSuggestedTrack(track) {
    this.setState((prevState) => ({
      suggestedTracks: prevState.suggestedTracks.filter(
        (currentTrack) => currentTrack.id !== track.id
      ),
    }));
  }

  // remove a track from the playlist
  // filters the playlist and removes any occurrences of the passed in track
  removePlaylistTrack(track) {
    this.setState((prevState) => ({
      playlistTracks: prevState.playlistTracks.filter(
        (currentTrack) => currentTrack.id !== track.id
      ),
      trackCount: prevState.trackCount - 1,
    }));
  }

  // pause playback
  // if a track is provided, playback stops if the provided track matches the
  // currently playing track
  // if no track is provided, playback stops
  pausePlayback(track = null) {
    if (
      this.state.isPlaying &&
      (track === this.state.currentTrack || track === null)
    ) {
      this.setState({
        isPlaying: false,
      });
    }
  }

  // start playback for the current track
  startPlayback(track) {
    this.setState({
      isPlaying: true,
      currentTrack: track,
    });
  }

  // update the name of the playlist
  // receives the new name and updates the state
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // save playlist to Spotify
  // sends the playlist and list of tracks to Spotify and then updates
  // the playlist tracks and name back to default
  savePlaylist() {
    // if there are no tracks to save, exit
    if (this.state.playlistTracks.length === 0) {
      return null;
    }

    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "Fast Tracks",
        playlistTracks: [],
        trackCount: 0,
      });
    });

    // if the currently playing track is in the playlist, stop playback
    if (
      this.state.playlistTracks.includes(this.state.currentTrack) &&
      this.state.isPlaying
    ) {
      this.pausePlayback();
    }

    // set playlistSaved to true, causing the celebration animation to play
    // after a delay, set the state back to false
    this.setState({ playlistSaved: true }, () => {
      setTimeout(() => this.setState({ playlistSaved: false }), 1600);
    });
  }

  // toggle visibility of the playlist
  toggleShowPlaylist() {
    this.setState((prevState) => {
      return { showPlaylist: !prevState.showPlaylist };
    });
  }

  setProgress(progress) {
    this.setState({ progress: progress });
  }

  // toggle visibility of the settings
  toggleShowSettings() {
    this.setState((prevState) => {
      return { showSettings: !prevState.showSettings };
    });
  }

  // set number of tracks to display in a stack of tracks
  setNumTracks(numTracks) {
    this.setState({ numTracks: numTracks });
  }

  render() {
    // determine if the playlist should be in a collapsed state
    // based on whether there are zero tracks in the playlist
    // this only affects desktop, so applying the class without
    // checking the screen width is harmless
    const isPlaylistCollapsed =
      this.state.playlistTracks.length === 0 ? "collapsed" : "";

    return (
      <div className="App" theme={this.props.theme}>
        <AudioPlayer
          track={this.state.currentTrack.preview}
          isPlaying={this.state.isPlaying}
          onEnd={this.pausePlayback}
          setProgress={this.setProgress}
        />

        {this.state.playlistSaved && <div className="SuccessScreen"></div>}
        <section className={`Container ${isPlaylistCollapsed}`}>
          <NavBar
            theme={this.props.theme}
            toggleTheme={this.props.toggleTheme}
            showSettings={this.state.showSettings}
            toggleSettings={this.toggleShowSettings}
            showPlaylist={this.state.showPlaylist}
          />
          <Playlist
            onNameChange={this.updatePlaylistName}
            onToggle={this.toggleShowPlaylist}
            showPlaylist={this.state.showPlaylist}
            tracks={this.state.playlistTracks}
            onRemove={this.removePlaylistTrack}
            onAdd={this.addTrack}
            onPlay={this.startPlayback}
            onStop={this.pausePlayback}
            currentTrack={this.state.currentTrack}
            progress={this.state.progress}
            isPlaying={this.state.isPlaying}
            numTracks={this.state.trackCount}
          />
          <Settings
            isVisible={this.state.showSettings}
            numTracks={this.state.numTracks}
            setNumTracks={this.setNumTracks}
            toggleSettings={this.toggleShowSettings}
          />

          <main className="TrackSelect">
            <TrackStack
              tracks={this.state.suggestedTracks}
              onPlay={this.startPlayback}
              onStop={this.pausePlayback}
              onAdd={this.addTrack}
              onDiscard={this.removeSuggestedTrack}
              currentTrack={this.state.currentTrack}
              progress={this.state.progress}
              isPlaying={this.state.isPlaying}
            />
            <ActionBar
              onGet={this.getTracks}
              onSave={this.savePlaylist}
              disableSave={this.state.playlistTracks.length === 0}
            />
          </main>
        </section>
      </div>
    );
  }
}

export default App;
