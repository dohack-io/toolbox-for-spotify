
export type AndExpression = {
    type: "and",
    left: Expression,
    right: Expression,
}

export type OrExpression = {
    type: "or",
    left: Expression,
    right: Expression,
}

export type NotExpression = {
    type: "not",
    expr: Expression,
}

export type ConditionExpression = MatchArtistCondition | MatchYearCondition;

export type Expression = AndExpression | OrExpression | NotExpression | ConditionExpression;