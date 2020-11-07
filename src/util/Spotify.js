import { routerBasePath } from "./routerBasePath";

const Spotify = {
  access_token: "",
  refresh_token: "",
  expires_at: "",
  headers: "",

  getAccessToken() {
    return this.access_token;
  },

  getRefreshToken() {
    return this.refresh_token;
  },

  getHeaders() {
    return this.headers;
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

  isExpired() {
    // trigger expiration when 1s out from expiration time
    return Date.now() > this.expires_at - 1000;
  },

  async refreshTokens() {
    await fetch(
      `${routerBasePath}/refresh_token?refresh_token=${this.refresh_token}`
    );
  },

  authorize(auth) {
    this.setAccessToken(auth.access_token);
    this.setRefreshToken(auth.refresh_token);
    this.setExpiresIn(auth.expires_in);
  },

  checkAuth() {
    console.log(this.isExpired());
    if (this.isExpired()) {
      this.refreshTokens();
    } else {
      return;
    }
  },

  search(term) {
    this.checkAuth();
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

  getTracks(numTracks = 5) {
    this.checkAuth();
    const terms = [
      "Tycho",
      "The%20Dots",
      "Tiger%20&%20Woods",
      "Scattle",
      "Plaid",
      "Elsiane",
      "Gramatik",
      "Spoonbill",
      "Parov%20Stelar",
    ];

    const index = Math.floor(Math.random() * terms.length);
    const term = terms[index];

    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}&limit=${numTracks}`,
      { headers: this.headers }
    )
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

  savePlaylist(name, trackUris) {
    this.checkAuth();
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
