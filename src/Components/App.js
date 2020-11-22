import React, { useState, useEffect, useContext } from "react";
import { Playlist } from "./Playlist/Playlist";
import { NavBar } from "./NavBar/NavBar";
import { ThemeToggle } from "./NavBar/ThemeToggle";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { TrackStack } from "./TrackStack/TrackStack";
import { ActionBar } from "./ActionBar/ActionBar";
import { Settings } from "./Settings/Settings";
import { PlaylistAction } from "./TrackAction/PlaylistAction";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { AppState, AppDispatch } from "../contexts/AppContext";
import { useToggle } from "../util/useToggle";
import Spotify from "../util/Spotify";

function App() {
  const [auth, setAuthData] = useContext(AuthContext);
  const [theme] = useContext(ThemeContext);
  const state = useContext(AppState);
  const dispatch = useContext(AppDispatch);
  const [showPlaylist, togglePlaylist] = useToggle(false);
  const [numTracks, setNumTracks] = useState(5);

  // when playlistSaved has been set to true
  // set it back to false after a delay
  useEffect(() => {
    if (state.playlistSaved) {
      setTimeout(() => {
        dispatch({ type: "UNSAVE_PLAYLIST" });
      }, 1600);
    }
  }, [state.playlistSaved, dispatch]);

  // set up authorization on the Spotify API object
  // updates whenever the 'auth' prop is updated
  useEffect(() => {
    Spotify.authorize(auth.data);
  }, [auth]);

  // Reset client-side authorization
  const onLogout = () => {
    console.log("Logging out...");
    // clear authorization context
    setAuthData(null);
  };

  // get list of suggested new tracks
  // update the set of tracks with those returned from Spotify
  const getTracks = () => {
    // if the currently playing track is in the suggested tracks list, stop playback
    if (state.suggestedTracks.includes(state.track)) {
      dispatch({ type: "PAUSE_PLAYBACK" });
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
      dispatch({ type: "PAUSE_PLAYBACK" });
    }

    // save the playlist to Spotify, reset the playlist name and tracks
    // set playlistSaved to true, causing the celebration animation to play
    Spotify.savePlaylist(state.playlistName, trackURIs)
      .then(() => dispatch({ type: "SAVE_PLAYLIST" }))
      .catch((err) => console.error(err.message));
  };

  const setPlaylistName = (name) => {
    dispatch({ type: "RENAME_PLAYLIST", payload: name });
  };

  // determine if the playlist should be in a collapsed state on desktop
  const isPlaylistCollapsed =
    state.playlistTracks.length === 0 ? "collapsed" : "";

  return (
    <div className="App" theme={theme}>
      <AudioPlayer track={state.track.preview} isPlaying={state.isPlaying} />
      {state.playlistSaved && <PlaylistAction />}
      <section className={`Container ${isPlaylistCollapsed}`}>
        <NavBar isVisible={!showPlaylist}>
          <Settings
            numTracks={numTracks}
            setNumTracks={setNumTracks}
            onLogout={onLogout}
          />
          <ThemeToggle />
        </NavBar>
        <Playlist
          onNameChange={setPlaylistName}
          onToggle={togglePlaylist}
          showPlaylist={showPlaylist}
          isVisible={state.playlistTracks.length !== 0}
          tracks={state.playlistTracks}
        />

        <main className="TrackSelect">
          <TrackStack tracks={state.suggestedTracks} />
          <ActionBar
            onGet={getTracks}
            onSave={savePlaylist}
            disableSave={state.playlistTracks.length === 0}
          />
        </main>
      </section>
    </div>
  );
}

export default App;
