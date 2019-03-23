
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

export type ConditionExpression = MatchArtistCondition | MatchYearCondition;

export type Expression = AndExpression | OrExpression | NotExpression | ConditionExpression;
