import "./ActionBar.css";

export const ActionBar = ({ onGet, onSave, disableSave }) => (
  <section className="ActionBar">
    <button
      className="Btn rounded"
      onClick={onSave}
      disabled={disableSave}
      aria-label="Save Playlist"
    >
      <div className="label">Save Playlist</div>
    </button>
    <button
      className="Btn primary rounded"
      onClick={onGet}
      aria-label="Get Tracks"
    >
      <div className="label">Get Tracks</div>
    </button>
  </section>
);
