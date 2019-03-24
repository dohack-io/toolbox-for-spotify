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

const vals = {
  str: P.seq(P.string("\""), P.takeWhile((c) => c != "\""), P.string("\"")).map(([, val,]) => val),
  num: P.regexp(/[0-9]+/).map((str) => parseInt(str, 10)).desc("integer")
}
const ops = {
  eq: P.string("="),
  gt: P.string(">"),
  lt: P.string("<"),
  ge: P.string(">="),
  le: P.string("<="),
}
function makeBinOp<T>(field: P.Parser<any>, op: P.Parser<any>, value: P.Parser<T>, producer: (value: T) => ConditionExpression) {
  return P.seq(field, P.optWhitespace, op, P.optWhitespace, value)
    .map(([, , , , v]) => {
      return producer(v);
    });
}

const conditions = [
  makeBinOp(P.string("artist"), ops.eq, vals.str, condition.matchArtist),
  makeBinOp(P.string("title"), ops.eq, vals.str, condition.matchSongTitle),
  makeBinOp(P.string("album"), ops.eq, vals.str, condition.matchAlbumTitle),
  makeBinOp(P.string("year"), ops.eq, vals.num, (year: number) => condition.matchYear("eq", year)),
  makeBinOp(P.string("year"), ops.gt, vals.num, (year: number) => condition.matchYear("gt", year)),
  makeBinOp(P.string("year"), ops.lt, vals.num, (year: number) => condition.matchYear("lt", year)),
  makeBinOp(P.string("year"), ops.ge, vals.num, (year: number) => condition.matchYear("ge", year)),
  makeBinOp(P.string("year"), ops.le, vals.num, (year: number) => condition.matchYear("le", year)),
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
