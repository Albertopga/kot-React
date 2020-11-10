import { rollManagerHasResults, rollManagerHasRollsLeft } from "../queries";
import {
  testValidatesData,
  VALID_SETTINGS,
  VALID_STATE_UNROLLED,
  VALID_STATE_ROLLED,
} from "../private/test-utils";

describe("rollManagerHasRollsLeft(data)", () => {
  testValidatesData((data) => rollManagerHasRollsLeft(data));
  const settings = VALID_SETTINGS;

  it("returns true with number of rolls === 0", () => {
    const state = {
      ...VALID_STATE_UNROLLED,
      numberOfRolls: 0,
    };
    expect(rollManagerHasRollsLeft({ settings, state })).toBe(true);
  });

  it("returns true with number of rolls > 0 and < than the settings", () => {
    const state = {
      ...VALID_STATE_ROLLED,
      numberOfRolls: settings.diceRollLimit - 1,
    };
    expect(rollManagerHasRollsLeft({ settings, state })).toBe(true);
  });

  it("returns false with number of rolls === settings.diceRollLimit", () => {
    const state = {
      ...VALID_STATE_ROLLED,
      numberOfRolls: settings.diceRollLimit,
    };
    expect(rollManagerHasRollsLeft({ settings, state })).toBe(false);
  });
});

describe("rollManagerHasResults(data)", () => {
  testValidatesData((data) => rollManagerHasResults(data));
  const settings = VALID_SETTINGS;

  it("returns false with number of rolls === 0", () => {
    const state = {
      ...VALID_STATE_UNROLLED,
      numberOfRolls: 0,
    };
    expect(rollManagerHasResults({ settings, state })).toBe(false);
  });

  it("returns true with number of rolls === 1", () => {
    const state = {
      ...VALID_STATE_ROLLED,
      numberOfRolls: 1,
    };
    expect(rollManagerHasResults({ settings, state })).toBe(true);
  });

  it("returns true with number of rolls > 0 and < than the settings", () => {
    const state = {
      ...VALID_STATE_ROLLED,
      numberOfRolls: settings.diceRollLimit - 1,
    };
    expect(rollManagerHasResults({ settings, state })).toBe(true);
  });

  it("returns true with number of rolls === settings.diceRollLimit", () => {
    const state = {
      ...VALID_STATE_ROLLED,
      numberOfRolls: settings.diceRollLimit,
    };
    expect(rollManagerHasResults({ settings, state })).toBe(true);
  });
});
