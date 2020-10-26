/**
 * Retrieve the access token and refresh token from the URL hash
 * and return an object with them stored in it
 * requires the URL to have been formed by the redirect from router.js
 * returns null if no hash substring
 */
export const getHashParams = (location = window.location) => {
  const q = location.hash.substring(2);

  // if the substring is non-empty, split it up based on hashes
  // return the parameters as an object
  if (q) {
    const qArray = q.split("/");
    const hashParams = {
      access_token: qArray[1],
      refresh_token: qArray[2],
      expires_in: qArray[3],
    };
    return hashParams;
  }
  return null;
};

// Get the hash parameters where the URL was formed by the
// redirect from Spotify API
export const getSpotifyHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q);
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
};
