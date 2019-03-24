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

type ComparisonOp = "eq" | "gt" | "lt" | "ge" | "le";

export interface MatchYearCondition extends Condition {
  type: "condition";
  attribute: "year",
  op: ComparisonOp,
  year: number;
}

export function matchArtist(artist: string): MatchArtistCondition {
  const normalized = artist.toLocaleLowerCase();

  return {
    type: "condition",
    attribute: "artist",
    artist: normalized,
    test(track: SpotifyApi.TrackObjectFull) {
      return track.artists.map(a => a.name.toLocaleLowerCase()).filter(a => a.toLocaleLowerCase().includes(normalized)).length > 0;
    }
  }
}

export function matchYear(op: ComparisonOp, year: number): MatchYearCondition {
  return {
    type: "condition",
    attribute: "year",
    op,
    year,
    test(track: SpotifyApi.TrackObjectFull): boolean {
      const album = track.album as SpotifyApi.AlbumObjectFull;
      console.log(album);
      if (album.release_date !== undefined) {
        const release = parseInt(album.release_date.substring(0, 4), 10);
        console.log(release);
        switch (op) {
          case "eq":
            return release == year;
          case "gt":
            return release > year;
          case "lt":
            return release < year;
          case "ge":
            return release >= year;
          case "le":
            return release <= year;
        }
      }
      return false;
    }
  }
}

