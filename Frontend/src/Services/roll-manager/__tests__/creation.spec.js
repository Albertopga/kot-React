import {
  validateRollManagerData,
  validateSettings,
} from "../private/validations";
import {
  testValidatesSettings,
  testValidatesState,
  VALID_SETTINGS,
  VALID_STATE_UNROLLED,
} from "../private/test-utils";

import { buildRollManagerFresh, buildRollManagerFrom } from "../creation";
import { isPlainObject } from "lodash";
import { isValidRollManagerData } from "../queries";

describe("buildRollManagerFresh(settings)", () => {
  // we can share some specs code by extracting it into functions
  testValidatesSettings((settings) => buildRollManagerFresh(settings));

  it("returns a new object with given settings and blank state", () => {
    const settings = {
      numberOfDice: 6,
      numberOfExtraDice: 2,
      diceRollLimit: 3,
    };
    const res = buildRollManagerFresh(settings);
    expect(isPlainObject(res)).toBeTruthy();

    // validateRollManagerData() is already tested, so we can use it here to avoid duplicating a lot of the effort.
    // it has an extra benefit: if we change the rules of what it means to be valid, we should not have to adapt all the creation tests, or it would be way too much effort.
    validateRollManagerData(res);

    expect(res.settings).toBe(settings);
    expect(res.state).toStrictEqual({
      numberOfRolls: 0,
      dice: [
        { isSelected: false, value: -1 },
        { isSelected: false, value: -1 },
        { isSelected: false, value: -1 },
        { isSelected: false, value: -1 },
        { isSelected: false, value: -1 },
        { isSelected: false, value: -1 },
      ],
    });
  });
});

describe("buildRollManagerFrom(settings)", () => {
  testValidatesSettings((settings) =>
    buildRollManagerFrom({ settings, state: VALID_STATE_UNROLLED })
  );
  testValidatesState((state) =>
    buildRollManagerFrom({ settings: VALID_SETTINGS, state })
  );

  it("returns a new object with given settings and a deep-clone of the given state", () => {
    const settings = VALID_SETTINGS;
    const state = VALID_STATE_UNROLLED;
    const res = buildRollManagerFrom({ settings, state });
    expect(isPlainObject(res)).toBeTruthy();

    // validateRollManagerData() is already tested, so we can use it here to avoid duplicating a lot of the effort.
    // it has an extra benefit: if we change the rules of what it means to be valid, we should not have to adapt all the creation tests, or it would be way too much effort.
    validateRollManagerData(res);

    expect(res.settings).toBe(settings);
    expect(res.state).toStrictEqual(state);
    expect(res.state).not.toBe(state);
  });
});
