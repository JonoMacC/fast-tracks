import axios from "axios";
import { routerBasePath } from "./routerBasePath";

const Spotify = {
  access_token: "",
  refresh_token: "",
  expires_at: "",
  headers: "",
  topTracks: [],

  getAccessToken() {
    return this.access_token;
  },

  getRefreshToken() {
    return this.refresh_token;
  },

  getHeaders() {
    return this.headers;
  },

  getTopTracks() {
    return this.topTracks;
  },

  setAccessToken(access_token) {
    this.access_token = access_token;
    this.headers = { Authorization: `Bearer ${this.access_token}` };
  },

  setRefreshToken(refresh_token) {
    this.refresh_token = refresh_token;
  },

  setExpiresIn(expires_in) {
    // set expiration time to a fixed time in the future
    this.expires_at = Date.now() + expires_in * 1000;
  },

  setTopTracks(top_tracks) {
    this.topTracks = top_tracks;
  },

  /* Check whether access token is expired */
  isExpired() {
    // trigger expiration when 1s out from expiration time
    const timeUp = Date.now() > this.expires_at - 1000;
    if (
      timeUp ||
      this.access_token === "" ||
      this.access_token === null ||
      this.access_token === undefined
    ) {
      return true;
    }
    return false;
  },

  /* Refresh the access token using the refresh token */
  refreshTokens() {
    console.log("refreshing authorization...");
    const options = {
      method: "get",
      url: `${routerBasePath}/refresh_token`,
      params: {
        refresh_token: this.refresh_token,
      },
    };

    return axios(options)
      .then((res) => {
        this.authorize(res.data);
      })
      .catch((err) => console.error(err.message));
  },

  /*
   * axios call that includes automatic retries when the
   * call fails, it recursively calls itself until there
   * are no more retry attempts
   * If the call fails due to lack of authorization, it
   * refreshes the authorization tokens
   */
  retryAxios(options, retries = 3) {
    // response codes to attempt a retry without requiring a
    // token refresh
    const retryCodes = [408, 500, 502, 503, 504, 522, 524];

    return axios(options)
      .then((res) => res)
      .catch((err) => {
        console.error(err.message);

        // attempt a retry if there are retries left and a response
        // status code was received
        if (retries > 0 && err.response) {
          // refresh the authorization and retry the call with the
          // updated authorization
          if (err.response.status === 401) {
            return this.refreshTokens().then(() => {
              // update the options with the latest authorization headers
              const retryOptions = { ...options, headers: this.headers };
              return this.retryAxios(retryOptions, retries - 1);
            });
          } else if (retryCodes.includes(err.response.status)) {
            return this.retryAxios(options, retries - 1);
          }
        } else {
          throw new Error(err.response ? err.response : "No response.");
        }
      });
  },

  /* Set the authorization parameters */
  authorize(auth) {
    this.setAccessToken(auth.access_token);
    this.setRefreshToken(auth.refresh_token);
    this.setExpiresIn(auth.expires_in);
  },

  removeAuth() {
    console.log("removing authorization...");
    this.setAccessToken("");
  },

  /*
   * Check whether authorization for api requests is granted
   * if the expiration time has been reached, refresh the tokens
   */
  async checkAuth() {
    if (this.isExpired()) {
      await this.refreshTokens();
    } else {
      return;
    }
  },

  /*
   * Retrieve the user's top tracks from the recent past
   */
  async retrieveTopTracks(timeRange = "short_term") {
    const options = {
      method: "get",
      url: "https://api.spotify.com/v1/me/top/tracks",
      params: {
        time_range: timeRange,
        limit: 50,
        offset: 0,
      },
      headers: this.headers,
    };

    return this.retryAxios(options)
      .then((res) => {
        if (!res?.data?.items) {
          return [];
        }
        return res.data.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          imageSrc: track.album.images[0].url,
          preview: track.preview_url,
        }));
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  /*
   * Search for a specific track using a query term
   */
  search(term) {
    const options = {
      method: "get",
      url: "https://api.spotify.com/v1/search",
      params: {
        type: "track",
        q: term,
      },
      headers: this.headers,
    };

    return this.retryAxios(options)
      .then((res) => {
        if (!res?.data?.tracks) {
          return [];
        }
        return res.data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          imageSrc: track.album.images[0].url,
          preview: track.preview_url,
        }));
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  /*
   * Return a list of seed tracks
   * retrieves 5 random (non-repeating) tracks from the user's
   * list of recent top tracks
   */
  getSeedTracks() {
    let seedTracksList = "";
    // create an array for the indices in the topTracks array
    let a = [...Array(this.topTracks.length).keys()];
    // a = [0,1,2....49]

    // extract 5 random indices from the index array and store
    // them in trackIndices
    let trackIndices = [];
    for (let n = 0; n < 5; n++) {
      let i = Math.floor(Math.random() * (this.topTracks.length - n));
      trackIndices.push(a[i]);
      a[i] = a[this.topTracks.length - n];
    }
    // remove potential undefined entries from track index array
    trackIndices = trackIndices.filter((idx) => idx !== undefined);

    // retrieve tracks at indices from top tracks and store track ids in seed tracks
    let seedTracks = [];
    for (let i = 0; i < trackIndices.length; i++) {
      seedTracks.push(this.topTracks[trackIndices[i]].id);
    }

    // return seed tracks as a comma-separated list
    seedTracksList = seedTracks.join(",");
    return seedTracksList;
  },

  /*
   * Retrieve the user's top tracks for a given time range
   */
  async getNewTopTracks(timeRange) {
    const timeRanges = {
      short_term: "past 4 weeks",
      medium_term: "past 6 months",
      long_term: "past several years",
    };

    const timeString = timeRanges[timeRange];

    let newTopTracks = await this.retrieveTopTracks(timeRange);

    if (newTopTracks?.length > 0) {
      return newTopTracks;
    } else {
      console.log(`Could not retrieve user's top tracks for ${timeString}.`);
    }

    return [];
  },

  /*
   * Get a list of recommended tracks
   */
  async getTracks(numTracks = 5) {
    // if no top tracks have been set, retrieve them
    if (this.topTracks.length === 0) {
      const timeRanges = ["short_term", "medium_term", "long_term"];
      let i = 0;
      let newTopTracks = [];

      do {
        console.log(`Attempting to retrieve top tracks ${timeRanges[i]}`);
        newTopTracks = await this.getNewTopTracks(timeRanges[i]);
        i += 1;
      } while (newTopTracks.length === 0 && i < timeRanges.length);

      if (newTopTracks.length === 0 && i === timeRanges.length) {
        console.log("Failed to retrieve user's top tracks. Cannot continue...");
        return;
      }

      if (newTopTracks.length > 0) {
        this.setTopTracks(newTopTracks);
      }
    }

    // retrieve a list of 5 seed tracks based on the user's recent top tracks
    const seedTracksList = this.getSeedTracks();

    if (seedTracksList === "") {
      console.log("Could not retrieve list of seed tracks. Cannot continue...");
      return;
    }

    const options = {
      method: "get",
      url: "https://api.spotify.com/v1/recommendations",
      params: {
        seed_tracks: seedTracksList,
        limit: 20,
      },
      headers: this.headers,
    };

    return this.retryAxios(options)
      .then((res) => {
        if (!res?.data?.tracks) {
          return [];
        }
        return res.data.tracks.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
          imageSrc: track.album.images[0].url,
          preview: track.preview_url, // can be null
        }));
      })
      .then((tracks) => {
        // filter out any tracks where there is no preview
        // trim the array to the requested size
        return tracks
          .filter((track) => track.preview !== null)
          .slice(0, numTracks);
      })
      .catch((err) => {
        console.error(err.message);
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    let userID;

    const getUserID = {
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: this.headers,
    };

    const postPlaylistName = (userID) => {
      return {
        method: "post",
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        headers: this.headers,
        data: JSON.stringify({ name: name }),
      };
    };

    const postPlaylistTracks = (userID, playlistID) => {
      return {
        method: "post",
        url: `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
        headers: this.headers,
        data: JSON.stringify({ uris: trackUris }),
      };
    };

    return this.retryAxios(getUserID).then((res) => {
      userID = res.data.id;
      return axios(postPlaylistName(userID))
        .then((res) => {
          const playlistID = res.data.id;
          return axios(postPlaylistTracks(userID, playlistID));
        })
        .catch((err) => {
          console.error(err.message);
        });
    });
  },
};

export default Spotify;
