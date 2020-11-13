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
    this.setHeaders();
  },

  setRefreshToken(refresh_token) {
    this.refresh_token = refresh_token;
  },

  setExpiresIn(expires_in) {
    // set expiration time to a fixed time in the future
    this.expires_at = Date.now() + expires_in * 1000;
  },

  setHeaders() {
    this.headers = { Authorization: `Bearer ${this.access_token}` };
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
      // check if a simple request succeeds
    } else {
      fetch(`https://api.spotify.com/v1/search?type=track&q=Miserlou`, {
        headers: this.headers,
      })
        .then((response) => {
          if (response.status === 401) {
            return true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return false;
    }
  },

  /* Refresh the access token using the refresh token */
  refreshTokens() {
    console.log("refreshing authorization...");
    return fetch(
      `${routerBasePath}/refresh_token?refresh_token=${this.refresh_token}`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        this.authorize(jsonResponse);
      })
      .catch((err) => {
        console.log(err);
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

  /* Check whether authorization for api requests is granted */
  async checkAuth() {
    if (await this.isExpired()) {
      await this.refreshTokens();
    } else {
      return;
    }
  },

  /* Retrieve the user's top tracks from the recent past */
  async retrieveTopTracks() {
    await this.checkAuth();
    return fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0`,
      { headers: this.headers }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.items) {
          return [];
        }
        return jsonResponse.items.map((track) => ({
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
        console.log(err);
      });
  },

  /* Search for a specific track using a term */
  async search(term) {
    await this.checkAuth();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: this.headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
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
        console.log(err);
      });
  },

  /*
   * Return a list of seed tracks
   * retrieves 5 random (non-repeating) tracks from the user's
   * list of recent top tracks
   */
  getSeedTracks() {
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
    return seedTracks.join(",");
  },

  /*
   * Get a list of recommended tracks
   */
  async getTracks(numTracks = 5) {
    await this.checkAuth();

    // get a list of the user's top tracks
    // if no top tracks have been set, retrieve them
    // otherwise, leave the list as is
    if (this.topTracks.length === 0) {
      this.setTopTracks(await this.retrieveTopTracks());
    }

    // retrieve a list of 5 seed tracks based on the user's recent top tracks
    const seedTrackList = this.getSeedTracks();

    return fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTrackList}&limit=${numTracks}`,
      { headers: this.headers }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks
          .map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            imageSrc: track.album.images[0].url,
            preview: track.preview_url,
          }))
          .filter((track) => track.preview !== null || undefined);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async savePlaylist(name, trackUris) {
    await this.checkAuth();
    if (!name || !trackUris.length) {
      return;
    }

    let userID;

    return fetch("https://api.spotify.com/v1/me", { headers: this.headers })
      .then((response) => response.json())
      .then((jsonResponse) => {
        userID = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
          headers: this.headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
  },
};

export default Spotify;
