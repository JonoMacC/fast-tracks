const reducer = (state, action) => {
  // Determine whether to pause the current playback
  // if a track is provided, playback stops if the provided track matches the
  // currently playing track, if no track is provided, playback stops
  // If conditions not met, the player state is unchanged
  const pausePlayback = () => {
    if (
      state.isPlaying &&
      (action.payload === state.track || action.payload === undefined || null)
    ) {
      return false;
    }
    return state.isPlaying;
  };

  // Returns the updated playlist when adding a track
  const updatePlaylist = () => {
    // if the playlist already contains the track, do nothing
    // otherwise, append the track to the end of the playlist
    if (state.playlistTracks.find((track) => track.id === action.payload.id)) {
      console.log("Track is already in playlist");
      return state.playlistTracks;
    }
    return [...state.playlistTracks, action.payload];
  };

  switch (action.type) {
    case "ADD_TRACK":
      return {
        ...state,
        isPlaying: pausePlayback(),
        suggestedTracks: state.suggestedTracks.filter(
          (track) => track.id !== action.payload.id
        ),
        playlistTracks: updatePlaylist(),
      };
    case "REMOVE_SUGGESTED_TRACK":
      return {
        ...state,
        isPlaying: pausePlayback(),
        suggestedTracks: state.suggestedTracks.filter(
          (track) => track.id !== action.payload.id
        ),
      };
    case "REMOVE_PLAYLIST_TRACK":
      return {
        ...state,
        isPlaying: pausePlayback(),
        playlistTracks: state.playlistTracks.filter(
          (track) => track.id !== action.payload.id
        ),
      };
    case "RENAME_PLAYLIST":
      return {
        ...state,
        playlistName: action.payload,
      };
    case "PAUSE_PLAYBACK":
      return {
        ...state,
        isPlaying: pausePlayback(),
      };
    case "START_PLAYBACK":
      return {
        ...state,
        track: action.payload,
        isPlaying: true,
      };
    case "END_PLAYBACK":
      return {
        ...state,
        track: {},
        isPlaying: false,
      };
    case "RESET_PLAYLIST":
      return {
        ...state,
        playlistName: "Fast Tracks",
        playlistTracks: [],
      };
    case "SET_TRACKS":
      return {
        ...state,
        suggestedTracks: action.payload || [],
      };
    case "RESET_TRACKS":
      return {
        ...state,
        suggestedTracks: [],
      };
    default:
      return state;
  }
};

export default reducer;
