import React, { useState, useEffect } from "react";

import "./ActionBar.css";

export const ActionBar = ({ onGet, onSave, disableSave }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const largeDisplay = windowWidth >= 415;
  const wideBtns = largeDisplay ? "large" : "";

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <section className="ActionBar">
      <button
        className={`Btn ${wideBtns} rounded`}
        onClick={onSave}
        disabled={disableSave}
        aria-label="Save Playlist"
      >
        <div className="label">Save Playlist</div>
      </button>
      <button
        className={`Btn ${wideBtns} primary rounded`}
        onClick={onGet}
        aria-label="Get Tracks"
      >
        <div className="label">Get Tracks</div>
      </button>
    </section>
  );
};
