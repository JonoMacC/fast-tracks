import React, { useState, useEffect, useReducer } from "react";
import { Playlist } from "../Playlist/Playlist";
import { NavBar } from "../NavBar/NavBar";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { TrackStack } from "../TrackStack/TrackStack";
import { ActionBar } from "../ActionBar/ActionBar";
import { Settings } from "../Settings/Settings";
import Spotify from "../../util/Spotify";
import reducer from "../../reducers/reducer";

const initialState = {
  playlistTracks: [],
  suggestedTracks: [],
  playlistSaved: false,
  playlistName: "Fast Tracks",
  track: {},
  isPlaying: false,
  progress: 0,
};

const App = ({ auth, theme, toggleTheme }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [numTracks, setNumTracks] = useState(5);

  // when playlistSaved has been set to true
  // set it back to false after a delay
  useEffect(() => {
    if (state.playlistSaved) {
      setTimeout(() => {
        dispatch({ type: "UNSAVE_PLAYLIST" });
      }, 1600);
    }
  }, [state.playlistSaved]);

  // set up authorization on the Spotify API object
  // updates whenever the 'auth' prop is updated
  useEffect(() => {
    Spotify.authorize(auth);
  }, [auth]);

  // reset the player progress when the track changes
  useEffect(() => {
    dispatch({ type: "SET_PROGRESS", payload: 0 });
  }, [state.track]);

  // get list of suggested new tracks
  // update the set of tracks with those returned from Spotify
  const getTracks = () => {
    // if the currently playing track is in the suggested tracks list, stop playback
    if (state.suggestedTracks.includes(state.track)) {
      pausePlayback();
    }

    // flush the list of suggested tracks
    dispatch({ type: "RESET_TRACKS" });

    // get recommended tracks from Spotify
    Spotify.getTracks(numTracks)
      .then((tracks) => {
        dispatch({ type: "SET_TRACKS", payload: tracks });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const savePlaylist = () => {
    if (state.playlistTracks.length === 0) {
      return;
    }
    const trackURIs = state.playlistTracks.map((track) => track.uri);

    // if the currently playing track is in the playlist, stop playback
    if (state.playlistTracks.includes(state.track)) {
      pausePlayback();
    }

    // save the playlist to Spotify
    // reset the playlist name and tracks
    // set playlistSaved to true, causing the celebration animation to play
    Spotify.savePlaylist(state.playlistName, trackURIs)
      .then(() => dispatch({ type: "SAVE_PLAYLIST" }))
      .catch((err) => console.error(err.message));
  };

  const pausePlayback = (track = null) => {
    state.isPlaying && dispatch({ type: "PAUSE_PLAYBACK", payload: track });
  };

  // toggle visibility of the playlist
  const toggleShowPlaylist = () => {
    setShowPlaylist((prevState) => !prevState);
  };

  // toggle visibility of the settings
  const toggleShowSettings = () => {
    setShowSettings((prevState) => !prevState);
  };

  const setPlaylistName = (name) => {
    dispatch({ type: "RENAME_PLAYLIST", payload: name });
  };

  const addTrack = (track) => {
    dispatch({ type: "ADD_TRACK", payload: track });
  };

  const removePlaylistTrack = (track) => {
    dispatch({ type: "REMOVE_PLAYLIST_TRACK", payload: track });
  };

  const removeSuggestedTrack = (track) => {
    dispatch({ type: "REMOVE_SUGGESTED_TRACK", payload: track });
  };

  const startPlayback = (track) => {
    dispatch({ type: "START_PLAYBACK", payload: track });
  };

  const setProgress = (progress) => {
    dispatch({ type: "SET_PROGRESS", payload: progress });
  };

  // determine if the playlist should be in a collapsed state
  // based on whether there are zero tracks in the playlist
  // this only affects desktop, so applying the class without
  // checking the screen width is harmless
  const isPlaylistCollapsed =
    state.playlistTracks.length === 0 ? "collapsed" : "";

  return (
    <div className="App" theme={theme}>
      <AudioPlayer
        track={state.track.preview}
        isPlaying={state.isPlaying}
        onEnd={() => dispatch({ type: "PAUSE_PLAYBACK" })}
        setProgress={setProgress}
      />

      {state.playlistSaved && <div className="SuccessScreen"></div>}
      <section className={`Container ${isPlaylistCollapsed}`}>
        <NavBar
          theme={theme}
          toggleTheme={toggleTheme}
          showSettings={showSettings}
          toggleSettings={toggleShowSettings}
          showPlaylist={showPlaylist}
        />
        <Playlist
          onNameChange={setPlaylistName}
          onToggle={toggleShowPlaylist}
          showPlaylist={showPlaylist}
          tracks={state.playlistTracks}
          onRemove={removePlaylistTrack}
          onAdd={addTrack}
          onPlay={startPlayback}
          onStop={pausePlayback}
          currentTrack={state.track}
          progress={state.progress}
          isPlaying={state.isPlaying}
        />
        <Settings
          isVisible={showSettings}
          numTracks={numTracks}
          setNumTracks={setNumTracks}
          toggleSettings={toggleShowSettings}
        />

        <main className="TrackSelect">
          <TrackStack
            tracks={state.suggestedTracks}
            onPlay={startPlayback}
            onStop={pausePlayback}
            onAdd={addTrack}
            onDiscard={removeSuggestedTrack}
            currentTrack={state.track}
            progress={state.progress}
            isPlaying={state.isPlaying}
          />
          <ActionBar
            onGet={getTracks}
            onSave={savePlaylist}
            disableSave={state.playlistTracks.length === 0}
          />
        </main>
      </section>
    </div>
  );
};

export default App;
