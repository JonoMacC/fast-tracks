const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRACK":
      // if the playlist already contains the track, do nothing
      // otherwise, append the track to the end of the playlist
      if (
        state.playlistTracks.find((track) => track.id === action.payload.id)
      ) {
        console.log("track already in playlist");
        return state;
      }
      return {
        ...state,
        playlistTracks: [...state.playlistTracks, action.payload],
      };
    case "REMOVE_SUGGESTED_TRACK":
      return {
        ...state,
        suggestedTracks: state.suggestedTracks.filter(
          (track) => track.id !== action.payload.id
        ),
      };
    case "REMOVE_PLAYLIST_TRACK":
      return {
        ...state,
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
      // if a track is provided, playback stops if the provided track matches the
      // currently playing track, if no track is provided, playback stops
      if (action.payload === state.track || action.payload === null) {
        return {
          ...state,
          isPlaying: false,
        };
      }
      return state;
    case "START_PLAYBACK":
      return {
        ...state,
        track: action.payload,
        isPlaying: true,
      };
    case "SAVE_PLAYLIST":
      return {
        ...state,
        playlistSaved: true,
        playlistName: "Fast Tracks",
        playlistTracks: [],
      };
    case "UNSAVE_PLAYLIST":
      return {
        ...state,
        playlistSaved: false,
      };
    case "SET_TRACKS":
      return {
        ...state,
        suggestedTracks: action.payload,
      };
    case "RESET_TRACKS":
      // reset the state for a new list of suggested tracks
      return {
        ...state,
        suggestedTracks: [],
      };
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
