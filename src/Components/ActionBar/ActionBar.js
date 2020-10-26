import React, { useState, useEffect } from "react";

import "./ActionBar.css";
import { Icon } from "../Icons/Icons";

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
        className={`Btn ${wideBtns}`}
        onClick={() => onSave()}
        disabled={disableSave}
        aria-label="Save Playlist"
      >
        {largeDisplay ? (
          <div className="label">Save Playlist</div>
        ) : (
          <Icon name="save" color="var(--text)" size="24px" />
        )}
      </button>
      <button
        className={`Btn ${wideBtns}`}
        onClick={() => onGet()}
        aria-label="Get Tracks"
      >
        {largeDisplay ? (
          <div className="label">Get Tracks</div>
        ) : (
          <Icon name="get-tracks" color="var(--text)" size="24px" />
        )}
      </button>
    </section>
  );
};
