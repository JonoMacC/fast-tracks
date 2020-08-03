import React from "react";

import "./ActionBar.css";
import { Icon } from "../Icons/Icons";

export const ActionBar = ({ onGet, onSave, disableSave }) => {
  return (
    <section className="ActionBar">
      <button
        className="ActionBtn"
        onClick={() => onSave()}
        disabled={disableSave}
      >
        <span className="ActionText label">Save Playlist</span>
        <div className="ActionIcon" aria-label="Save Playlist">
          <Icon name="save" color="var(--text)" size="24px" />
        </div>
      </button>
      <button className="ActionBtn" onClick={() => onGet()}>
        <span className="ActionText label">Get Tracks</span>
        <div className="ActionIcon" aria-label="Get Tracks">
          <Icon name="get-tracks" color="var(--text)" size="24px" />
        </div>
      </button>
    </section>
  );
};
