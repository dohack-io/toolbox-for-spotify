import Spotify from "spotify-web-api-js";
import SpotifyWebApi from "spotify-web-api-js";
import * as _ from "lodash";
import { getAllPages } from './utils';



export function createPlaylist(token: string, name: string, publicPlaylist: boolean): Promise<SpotifyApi.PlaylistObjectFull> {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    return spotify.getMe()
        .then(me => {
            return spotify.createPlaylist(me.id, {
                name,
                "public": publicPlaylist,
            });
        });
}

export function getAvailablePlaylists(token: string) :  Promise<SpotifyApi.PlaylistObjectSimplified[]> {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    return getAllPages<SpotifyApi.PlaylistObjectSimplified>((offset,  limit, cb) => {
        spotify.getUserPlaylists(undefined, {offset, limit}, cb);
    });
}

export function appendTracks(token: string, playlistId: string, tracks: SpotifyApi.TrackObjectSimplified[]): Promise<any> {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    const chunks = _.chunk(tracks, 100);
    const promises = chunks.map(chunk => {
        const uris = chunk.map(i => i.uri);
        return spotify.addTracksToPlaylist(playlistId, uris);
    });

    return Promise.all(promises);
}

export function replaceTracks(token: string, playlistId: string, tracks: SpotifyApi.TrackObjectSimplified[]): Promise<any> {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    const chunks = _.chunk(tracks, 100);
    const promises = chunks.map(chunk => {
        const uris = chunk.map(i => i.uri);
        return spotify.replaceTracksInPlaylist(playlistId, uris);
    });

    return Promise.all(promises);
}

export function saveToLibrary(token: string, tracks: SpotifyApi.TrackObjectSimplified[]): Promise<any> {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    const chunks = _.chunk(tracks, 50);
    const promises = chunks.map(chunk => {
        const ids = chunk.map(i => i.id);
        return spotify.addToMySavedTracks(ids);
    });

    return Promise.all(promises);
}