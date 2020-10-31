# Fast Tracks

[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b74fb2-f506-44c7-9966-f879403e2e04/deploy-status)](https://app.netlify.com/sites/fasttracks/deploys)

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br />
> It uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). <br />
> Animations using [Framer Motion](https://github.com/framer/motion). <br />

## Spotify Client ID Setup

Use your Spotify account on the Spotify developer site (developer.spotify.com) to create an app and get a Client ID. This app assumes that two apps have been created: one for testing purposes and one for production.

## Local Development

Create a file called .env to store environment variables. Follow the format in .env.sample to set up your client ID, client secret, and redirect URI for testing and production.

Never share your Client ID in public such as in a git repository.

### Running

In your terminal

    yarn
    yarn dev

You can view the app by navigating to **http://localhost:3000/** in your browser.

## Deploying on Netlify

Ensure that you have set up your Client ID, Client Secret, and Redirect URI as environment variables for your site on Netlify.
