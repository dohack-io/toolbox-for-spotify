import * as P from "parsimmon";
import * as condition from "./condition";

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

const quotedString = P.seq(P.string("\""), P.takeWhile((c) => c != "\""), P.string("\"")).map(([, val,]) => val);
const ops = {
    equals: P.string("="),
}

function makeBinOp<T>(field: P.Parser<any>, op: P.Parser<any>, value: P.Parser<T>, producer: (value: T) => ConditionExpression) {
    return P.seq(field, P.optWhitespace, op, P.optWhitespace, value)
        .map(([, , , , v]) => {
            return producer(v);
        });
}

const conditions = [
    makeBinOp(P.string("artist"), ops.equals, quotedString, condition.matchArtist),
];

interface LanguageSpec {
    attr: ConditionExpression;
    parens: Expression;
    cond: Expression;
    term: Expression;
    expr: Expression;
    base: Expression;
}

const lang = P.createLanguage<LanguageSpec>({
    attr: () => P.alt(...conditions),
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
