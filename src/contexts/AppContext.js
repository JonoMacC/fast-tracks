import React, { createContext, useState, useReducer } from "react";
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
export const ProgressContext = createContext([{}, () => {}]);

const AppProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [progress, setProgress] = useState(0);

  return (
    <AppDispatch.Provider value={dispatch}>
      <AppState.Provider value={state}>
        <ProgressContext.Provider value={[progress, setProgress]}>
          {props.children}
        </ProgressContext.Provider>
      </AppState.Provider>
    </AppDispatch.Provider>
  );
};

export default AppProvider;
