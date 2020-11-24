# Fast Tracks

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b74fb2-f506-44c7-9966-f879403e2e04/deploy-status)](https://app.netlify.com/sites/fasttracks/deploys)

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  
> It uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

## Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JonoMacC/fast-tracks)

## Spotify Client ID Setup

Use your Spotify account on the [Spotify developer site](https://developer.spotify.com) to create an app and get a Client ID. This app assumes that two apps have been created: one for testing purposes and one for production. You need to set up your redirect URIs on the Spotify dashboard.

### Redirect URIs for Local Development

> http://localhost:3000/api/callback  
> http://localhost:3000/.netlify/functions/callback

## Local Development

Create a file called .env to store environment variables. Follow the format in .env.sample to set up your client ID, client secret, and redirect URI for testing and production.

Never share your Client ID in public such as in a git repository.

### Initialize

Install the dependencies

    yarn

### Running with Node Express Server

Set REACT_APP_NETLIFY=false in your .env file or omit this variable altogether.

    yarn devstart

You can view the app by navigating to **http://localhost:3000/** in your browser. The node server will be running on **http://localhost:4001/** and requests to **http://localhost:3000/api/** are proxied to the server.

### Running with Netlify Functions

Be sure to set REACT_APP_NETLIFY=true in your .env file.

    yarn start

You can view the app by navigating to **http://localhost:3000/** in your browser.
