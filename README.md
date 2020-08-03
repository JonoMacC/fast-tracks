# Fast Tracks
[![Netlify Status](https://api.netlify.com/api/v1/badges/a1b74fb2-f506-44c7-9966-f879403e2e04/deploy-status)](https://app.netlify.com/sites/fasttracks/deploys)
> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br />
> It uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). <br />
> Animations using [Framer Motion](https://github.com/framer/motion). <br />

## Spotify Client ID Setup

Use your Spotify account on the Spotify developer site (developer.spotify.com) to create an app and get a Client ID. This app assumes that two apps have been created: one for testing purposes and one for production. In the testing app, set the redirect URI to https://localhost:3000/ while in the production app this will need to be set to the appropriate web address. 

## Local Development

Create a file called .env to store enviornment variables. In that file type (n.b. no spaces):

    REACT_APP_CLIENT_ID=your-production-app-client-id-goes-here
    REACT_APP_TEST_CLIENT_ID=your-test-app-client-id-goes-here
    REACT_APP_REDIRECT_URI=your-production-web-address-goes-here

Never share your Client ID in public such as in a git repository.

### Running

In your terminal

    yarn
    yarn start
    
You can view the app by navigating to **http://localhost:3000/** in your browser.

## Deploying on Netlify

Ensure that you have set up your Client ID and Redirect URI as an environment variables for your site on Netlify.
