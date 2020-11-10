// External libraries
import React from "react";

// Styling
import "./App.css";

// App components
import { Playlist } from "../Playlist/Playlist";
import { NavBar } from "../NavBar/NavBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { TrackStack } from "../TrackStack/TrackStack";
import { ActionBar } from "../ActionBar/ActionBar";
import { Settings } from "../Settings/Settings";

// Utilities
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
      trackIsPlaying: false,
      trackHasEnded: false,
      stopAllTracks: true,
      stopCurrentTrack: false,
      trackListIsOpen: false,
      theme: "light",
      playlistSaved: false,
      showSettings: false,
      numTracks: 5,
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
    this.togglePlaylist = this.togglePlaylist.bind(this);

    // Audio playback
    this.startPlayback = this.startPlayback.bind(this);
    this.pausePlayback = this.pausePlayback.bind(this);
    this.endPlayback = this.endPlayback.bind(this);
    this.stopAllPlayback = this.stopAllPlayback.bind(this);
    this.stopCurrentTrack = this.stopCurrentTrack.bind(this);

    // Theme control (dark mode or light mode)
    this.toggleTheme = this.toggleTheme.bind(this);

    // Settings
    this.toggleShowSettings = this.toggleShowSettings.bind(this);
    this.setNumTracks = this.setNumTracks.bind(this);
  }

  // if the theme is stored in the user's browser cache, use
  // the previously set theme as the default
  componentDidMount() {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && this.setState({ theme: localTheme });

    // set up the Spotify authorization
    Spotify.authorize(this.props.auth);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updated...", this.state.trackIsPlaying);
    if (
      prevState.nextTrack !== this.state.nextTrack &&
      this.state.nextTrack !== ""
    ) {
      this.setState({
        trackIsPlaying: true,
        currentTrack: this.state.nextTrack,
        stopAllTracks: false,
        stopCurrentTrack: false,
        nextTrack: "",
      });
      console.log("playing next track...", this.state.trackIsPlaying);
    }
  }

  // get list of suggested new tracks
  // update the set of tracks with those returned from Spotify
  getTracks() {
    this.resetTracks();
    Spotify.getTracks(this.state.numTracks).then((suggestedTracks) => {
      this.setState({ suggestedTracks: suggestedTracks });
    });
  }

  // reset the state for a new list of suggested tracks
  resetTracks() {
    this.setState({
      suggestedTracks: [],
      activeTrack: "",
      currentTrack: "",
      trackIsPlaying: false,
      trackHasEnded: false,
      stopAllTracks: true,
    });
  }

  // add a track to the playlist
  // if the playlist already contains the track, do nothing
  // otherwise, append the track to the end of the playlist
  // remove the track from the list of suggested tracks
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  // remove a track from the suggested tracks list
  removeSuggestedTrack(track) {
    let tracks = this.state.suggestedTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({
      suggestedTracks: tracks,
      trackIsPlaying: false,
      trackHasEnded: false,
    });
  }

  // remove a track from the playlist
  // filters the playlist of track and removes any occurrences of the passed in track
  removePlaylistTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks, trackIsPlaying: false });
  }

  // pause playback for the current track
  pausePlayback(track = "") {
    if (track === this.state.currentTrack) {
      this.setState({
        trackIsPlaying: false,
      });
    }
  }

  // start playback for the current track
  startPlayback(track) {
    console.log("starting playback...");
    // check if a track is already playing
    if (this.state.trackIsPlaying) {
      console.log("changing tracks...");
      this.stopCurrentTrack(track);
    } else {
      this.setState({
        trackIsPlaying: true,
        currentTrack: track,
        stopAllTracks: false,
        stopCurrentTrack: false,
      });
    }
  }

  // end playback when the end of the current track is reached
  endPlayback() {
    console.log("ending playback...");
    this.setState({
      trackHasEnded: true,
      trackIsPlaying: false,
      stopAllTracks: true,
    });
  }

  // stop playback for the currently playing track
  stopCurrentTrack(track = "") {
    console.log("stopping current track...");
    this.setState({
      stopCurrentTrack: true,
      nextTrack: track,
    });
  }

  // stop playback for all tracks
  stopAllPlayback() {
    this.setState({
      trackIsPlaying: false,
      stopAllTracks: true,
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
      });
    });
    this.togglePlaylistSaved();
  }

  // toggle visibility of the playlist
  togglePlaylist() {
    this.setState((prevState) => {
      return { trackListIsOpen: !prevState.trackListIsOpen };
    });
  }

  // set playlistSaved to true, causing the celebration animation to play
  // after a delay, set the state back to false
  togglePlaylistSaved() {
    this.setState({ playlistSaved: true }, () => {
      setTimeout(() => this.setState({ playlistSaved: false }), 1600);
    });
  }

  setMode(mode) {
    // set the mode in the browser cache,
    // allowing it to persist between sessions
    window.localStorage.setItem("theme", mode);
    this.setState({ theme: mode });
  }

  // toggle the display mode between light and dark mode
  toggleTheme() {
    if (this.state.theme === "light") {
      this.setMode("dark");

      // change the background outside of "App"
      document.body.style = "background: #111111";
    } else {
      this.setMode("light");

      // change the background outside of "App"
      document.body.style = "background: #ffffff";
    }
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
      <div className="App" theme={this.state.theme}>
        <AudioPlayer
          track={this.state.currentTrack.preview}
          isPlaying={this.state.trackIsPlaying}
          onEnd={this.endPlayback}
        />

        {this.state.playlistSaved && <div className="SuccessScreen"></div>}
        <section className={`Container ${isPlaylistCollapsed}`}>
          <NavBar
            theme={this.state.theme}
            toggleTheme={this.toggleTheme}
            isVisible={this.state.showSettings}
            toggleSettings={this.toggleShowSettings}
          />
          <Playlist
            playlistName={this.state.playlistName}
            onNameChange={this.updatePlaylistName}
            onToggle={this.togglePlaylist}
            trackListIsOpen={this.state.trackListIsOpen}
            playlistTracks={this.state.playlistTracks}
            isPlaying={this.state.trackIsPlaying}
            onRemove={this.removePlaylistTrack}
            onPlay={this.startPlayback}
            onStop={this.pausePlayback}
            onStopAllPlayback={this.stopAllPlayback}
            stopAllTracks={this.state.stopAllTracks}
            hasEnded={this.state.trackHasEnded}
            currentTrack={this.state.currentTrack}
            stopCurrentTrack={this.state.stopCurrentTrack}
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
              hasEnded={this.state.trackHasEnded}
              onStopAllPlayback={this.stopAllPlayback}
              stopAllTracks={this.state.stopAllTracks}
              onAdd={this.addTrack}
              onDiscard={this.removeSuggestedTrack}
              isPlaying={this.state.trackIsPlaying}
              currentTrack={this.state.currentTrack}
              stopCurrentTrack={this.state.stopCurrentTrack}
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
