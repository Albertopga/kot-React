import { range, uniq } from "lodash";
import { getRandom } from "./Global";

describe("getRandom()", () => {
  it("returns a random value from 0 to 5", () => {
    const res = getRandom();
    expect(res).toBeGreaterThanOrEqual(0);
    expect(res).toBeLessThanOrEqual(5);
  });
  it("returns a random value", () => {
    // in order to check that we don't always get the same number, let's try this 10,000 times and check that we don't always get the same result
    const results = [];
    range(10_000).forEach(() => {
      results.push(getRandom());
    });

    expect(uniq(results).length).toBeGreaterThan(1);
  });
});
