import Spotify from "spotify-web-api-js";
import SpotifyWebApi from "spotify-web-api-js";
import * as _ from "lodash";

import { Expression } from "./filter"

const spotitfy = new Spotify();

export type QuerySource = {
    type: "all"
} | {
    type: "playlists",
    playlistIds: ReadonlyArray<string>
} | {
    type: "user",
}

interface QueryResult {
    foo: "test";
}

export function loadTracksFromSource(accessCode: string, source: QuerySource, filterHint: Expression|undefined): Promise<SpotifyApi.TrackObjectFull[]> {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(accessCode);

    // User Library
    if (source.type === "user") {
        return new Promise<SpotifyApi.TrackObjectFull[]>((resolve, reject) => {
            let items: SpotifyApi.TrackObjectFull[] = [];

            function handler(err: SpotifyWebApi.ErrorObject, response: SpotifyApi.UsersSavedTracksResponse) {
                console.log(response);
                if (err) {
                    reject(err);
                } else {
                    items = [...items, ...response.items.map((x) => x.track)];

                    if (response.next !== null) {
                        spotify.getMySavedTracks({
                            offset: response.offset + response.limit,
                            limit: response.limit,
                        }, handler);
                    } else {
                        resolve(items);
                    }
                }
            }

            spotify.getMySavedTracks(handler);
        });
    }

    // Playlists
    if (source.type === "playlists") {
        const promises = source.playlistIds.map((playlistId) => {
            return new Promise<SpotifyApi.TrackObjectFull[]>((resolve, reject) => {
                let items: SpotifyApi.TrackObjectFull[] = [];

                function handler(err: SpotifyWebApi.ErrorObject, response: SpotifyApi.PlaylistTrackResponse) {
                    if (err) {
                        reject(err);
                    } else {
                        items = [...items, ...response.items.map((x) => x.track)];

                        if (response.next !== null) {
                            spotify.getPlaylistTracks(playlistId, {
                                offset: response.offset + response.limit,
                                limit: response.limit,
                            }, handler);
                        } else {
                            resolve(items);
                        }
                    }
                }

                spotify.getPlaylistTracks(playlistId, handler);
            });
        });

        return Promise.all(promises).then((results) => {
            return _.flatten(results);
        });
    }

    // all
    return Promise.resolve([]);
}