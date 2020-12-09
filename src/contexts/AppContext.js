import { createContext, useReducer } from "react";
import reducer from "../reducers/reducer";

const initialState = {
  playlistTracks: [],
  suggestedTracks: [],
  playlistName: "Fast Tracks",
  track: {},
  isPlaying: false,
};

export const AppDispatch = createContext(null);
export const AppState = createContext(null);

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppDispatch.Provider value={dispatch}>
      <AppState.Provider value={state}>{props.children}</AppState.Provider>
    </AppDispatch.Provider>
  );
};

export default AppProvider;
