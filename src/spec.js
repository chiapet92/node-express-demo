// Example test block
// describe('test suite', () => {
//     it('test case', () => {
//       ...
//     });
//   });

import { expect } from "chai";
import sum from "./sum.js";

describe("true or false", () => {
  it("true is true", () => {
    expect(true).to.eql(true);
  });
  it("false is false", () => {
    expect(false).to.eql(false);
  });
});

describe("sum function", () => {
  it("sums up two integers", () => {
    expect(sum(1, 2)).to.eql(3);
  });
});
