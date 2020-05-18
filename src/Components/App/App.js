import React from "react";

import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      isPlaying: false,
      currentTrack: "",
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
    this.endPlayback = this.endPlayback.bind(this);
  }

  // add a track to the playlist
  // if the playlist already contains the track, do nothing
  // otherwise, append the track to the end of the playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  // remove a track from the playlist
  // filters the playlist of track and removes any occurrences of the passed in track
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  // stop playback
  endPlayback(track) {
    // AudioPlayer.endPlayback();

    this.setState({
      isPlaying: false,
      currentTrack: track,
    });
  }

  startPlayback(track) {
    // if (this.state.isPlaying) {
    //   this.endPlayback();
    // }

    // AudioPlayer.startPlayback(track);

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
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  // search for a term
  // update the set of search results with those returned from Spotify
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <AudioPlayer preview={this.state.currentTrack} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onPlay={this.startPlayback}
              onStop={this.endPlayback}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onPlay={this.startPlayback}
              onStop={this.endPlayback}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
