import * as _ from "lodash";

export interface Condition {
    type: "condition";
    test: (track: SpotifyApi.TrackObjectFull) => boolean;
}

export interface MatchArtistCondition extends Condition {
    type: "condition";
    attribute: "artist";
    artist: string;
}

export interface MatchYearCondition extends Condition {
    type: "condition";
    attribute: "year"
    year: Number;
}

export function matchArtist(artist: string): MatchArtistCondition {
    const normalized = artist.toLocaleLowerCase();

    return {
        type: "condition",
        attribute: "artist",
        artist: normalized,
        test(track: SpotifyApi.TrackObjectFull ) {
            return track.artists.map(a => a.name.toLocaleLowerCase()).filter(a => a.toLocaleLowerCase().includes(normalized)).length > 0;
        }
    }
}

