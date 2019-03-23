interface Condition {
    type: string;
    apply: (track: SpotifyApi.TrackObjectFull) => boolean;
}

interface MatchArtistCondition extends Condition {
    type: "artist";
    name: string;
}

interface MatchYearCondition extends Condition {
    type: "year";
    year: Number;
}

