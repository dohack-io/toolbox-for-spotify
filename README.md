# Toolbox for Spotify

Web app that allows some management of spotify playlists.
All processing is performed 100% on client-side, there is no backend besides the spotify web api itself.
First authenticate with your spotify account so the web app has an api token and all the required permissions.
Then specify where your songs come frame and by which criteria they should be filtered.
Complex filters with nested expression are fully supported:
```
(artist = "peter" AND year > 1990) OR artist = "otto" OR (NOT artist = "otto" AND title = "great song" AND "album" = "great album")
```
After processing the songs and applying the filters the results can be viewed.
For fine tuning single songs can be removed from the results.

Finally the songs can be saved to your own library, a new playlist or any of your existing playlists. Have fun! :)

## Project setup
```
npm install
```
Foundation for the app are `vue` and the helpers `vuex` and `vue-router`.
The interface is made using Bootstrap and FontAwesome.
For the interaction with spotify the module `spotify-web-api-js` is needed.
Some more libraries are being used for parsing the filter expressions and some other things.

## Compiles and hot-reloads for development
```
npm run serve
```
Run and navigate to `localhost:8080`and try out the app.
