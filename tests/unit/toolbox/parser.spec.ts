import { expect } from "chai";
import { parseExpression } from "@/toolbox/parser"

describe("parser.ts", () => {
  it("parses stuff", () => {
    const result = parseExpression("foo AND foo OR foo AND NOT foo");

    expect(result).to.equal({status: true})
  });
});
