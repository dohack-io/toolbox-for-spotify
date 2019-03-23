import * as P from "parsimmon";

// simpleCond := x | (expr)
// cond := simpleCond | "NOT" simpleCond
//
// term := cond "AND" cond
//
// expr := term | term "OR" term
//
//

import { ConditionExpression, NotExpression, AndExpression, OrExpression, Expression } from "./filter";

const ws = P.whitespace;

type LanguageSpec = {
    attr: ConditionExpression,
    parens: Expression,
    cond: Expression,
    term: Expression,
    expr: Expression,
    base: Expression,
}

const lang = P.createLanguage<LanguageSpec>({
    attr: () => P.string("foo").map(x => {
        return {

        } as ConditionExpression;
    }),
    parens: (r) => P.seq(P.string("("), r.expr, P.string(")")).map(([_1, expr, _2]) => expr),
    cond: (r) => P.alt(
        r.attr,
        r.parens,
        P.seq(P.string("NOT"), ws, r.expr).map(([_1, _2, expr]) => {
            return {
                type: "not",
                expr
            } as NotExpression;
        })),
    term: (r) => P.seqMap(r.cond,
        P.seq(ws, P.string("AND"), ws, r.cond).map(([, , , right]) => right).many(), (first, rest) => {
            return rest.reduce((left, right) => {
                return {
                    type: "and",
                    left,
                    right,
                } as AndExpression;
            }, first);
        }),
    expr: (r) => P.seqMap(r.term,
        P.seq(ws, P.string("OR"), ws, r.term).map(([, , , right]) => right).many(), (first, rest) => {
            return rest.reduce((left, right) => {
                return {
                    type: "or",
                    left,
                    right,
                } as OrExpression;
            }, first);
        }),
    base: (r) => P.seq(P.optWhitespace, r.expr, P.optWhitespace).map(([_1, expr, _2]) => expr),
});

export function parseExpression(input: string) {
    return lang.base.parse(input);
}