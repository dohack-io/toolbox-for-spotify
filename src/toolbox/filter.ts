
import { Condition } from "./condition"

export interface AndExpression {
    type: "and";
    left: Expression;
    right: Expression;
}

export interface OrExpression {
    type: "or";
    left: Expression;
    right: Expression;
}

export interface NotExpression {
    type: "not";
    expr: Expression;
}

export type ConditionExpression = Condition;

export type Expression = AndExpression | OrExpression | NotExpression | ConditionExpression;


function testExpression(track: SpotifyApi.TrackObjectFull, filter: Expression): boolean {
    if (filter.type == "and") {
        return testExpression(track, filter.left) && testExpression(track, filter.right);
    } else if (filter.type == "or") {
        return testExpression(track, filter.left) || testExpression(track, filter.right);
    } else if (filter.type == "not") {
        return !testExpression(track, filter.expr);
    } else {
        return filter.test(track);
    }
}

export function filterTracks(tracks: SpotifyApi.TrackObjectFull[], filter: Expression) {
    return tracks.filter(t => testExpression(t, filter));
}
