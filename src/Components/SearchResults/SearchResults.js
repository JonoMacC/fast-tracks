import React from "react";

import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="SearchList">
          <TrackList
            tracks={this.props.searchResults}
            onAdd={this.props.onAdd}
            onPlay={this.props.onPlay}
            onStop={this.props.onStop}
            isRemoval={false}
            isPlaying={false}
          />
        </div>
      </div>
    );
  }
}

export default SearchResults;
