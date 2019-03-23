import { expect } from "chai";
import { parseExpression } from "@/toolbox/parser"

describe("parser.ts", () => {
  it("parses stuff", () => {
    const result = parseExpression("artist= \"foo\" AND artist=    \"foo\" OR (artist= \"foo\" AND NOT artist=\"foo\")");

    expect(result).to.equal({status: true})
  });
});
