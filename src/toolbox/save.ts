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

export async function getAvailablePlaylists(token: string) {
    const spotify = new Spotify();
    spotify.setAccessToken(token);

    let items: SpotifyApi.PlaylistObjectSimplified[] = [];
    var offset = 0;
    const limit = 50;

    // FIXME...
    // let done = false;

    // while (!done) {
    //     let result = await spotify.getUserPlaylists(undefined, { offset, limit });
    //     items = [...items, ...result.items];
    //     offset = result.offset + result.limit;

    //     if (result.next == null) {
    //         done = true;
    //     }
    // }

    // One request shall be enough...
    let result = await spotify.getUserPlaylists(undefined, { offset, limit });

    return result.items;
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