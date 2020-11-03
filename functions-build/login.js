!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=50)}({18:function(e,t,n){n(19).config();const o=process.env.NETLIFY_DEV,r="https://accounts.spotify.com",c=process.env.NETLIFY_DEV?"http://localhost:8888":"http://localhost:3000",s=process.env.URL||c,i=o?process.env.REACT_APP_TEST_CLIENT_ID:process.env.REACT_APP_CLIENT_ID,u=o?process.env.REACT_APP_TEST_CLIENT_SECRET:process.env.REACT_APP_CLIENT_SECRET,l=`${r}/authorize?`,a=`${r}/api/token`,p=`${r}/v1/me/`,f=`${s}/.netlify/functions/callback`;e.exports={clientId:i,clientSecret:u,tokenHost:"https://accounts.spotify.com",authorizePath:l,tokenPath:a,profilePath:p,redirectUri:f}},19:function(e,t,n){const o=n(3),r=n(20);function c(e){console.log(`[dotenv][DEBUG] ${e}`)}const s=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,i=/\\n/g,u=/\n|\r|\r\n/;function l(e,t){const n=Boolean(t&&t.debug),o={};return e.toString().split(u).forEach((function(e,t){const r=e.match(s);if(null!=r){const e=r[1];let t=r[2]||"";const n=t.length-1,c='"'===t[0]&&'"'===t[n];"'"===t[0]&&"'"===t[n]||c?(t=t.substring(1,n),c&&(t=t.replace(i,"\n"))):t=t.trim(),o[e]=t}else n&&c(`did not match key and value when parsing line ${t+1}: ${e}`)})),o}e.exports.config=function(e){let t=r.resolve(process.cwd(),".env"),n="utf8",s=!1;e&&(null!=e.path&&(t=e.path),null!=e.encoding&&(n=e.encoding),null!=e.debug&&(s=!0));try{const e=l(o.readFileSync(t,{encoding:n}),{debug:s});return Object.keys(e).forEach((function(t){Object.prototype.hasOwnProperty.call(process.env,t)?s&&c(`"${t}" is already defined in \`process.env\` and will not be overwritten`):process.env[t]=e[t]})),{parsed:e}}catch(e){return{error:e}}},e.exports.parse=l},20:function(e,t){e.exports=require("path")},3:function(e,t){e.exports=require("fs")},4:function(e,t){e.exports=require("querystring")},50:function(e,t,n){const o=n(4),{clientId:r,redirectUri:c,authorizePath:s}=n(18),i=["user-library-read","user-top-read","playlist-modify-public"];t.handler=(e,t,n)=>{const u=(e=>{let t="";const n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let o=0;o<e;o++)t+=n.charAt(Math.floor(Math.random()*n.length));return t})(16),l=`spotify_auth_state=${u}`;return n(null,{statusCode:302,headers:{Location:s+o.stringify({response_type:"code",show_dialog:!0,client_id:r,scope:i.join("%20"),redirect_uri:c,state:u}),"Cache-Control":"no-cache","Set-Cookie":l}})}}}));