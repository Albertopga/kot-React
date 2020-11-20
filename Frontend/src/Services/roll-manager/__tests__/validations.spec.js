import {
  validateDieIndex,
  validateRolledDie,
  validateRollManagerData,
  validateSettings,
  validateState,
} from "../private/validations";
import {
  DEFAULT_DIE_STATE,
  testValidatesData,
  testValidatesDieIndex,
  testValidatesSettings,
  testValidatesState,
  testValidatesRolledDie,
  VALID_SETTINGS,
  VALID_STATE_UNROLLED,
} from "../private/test-utils";
import {
  InvalidRollManagerSettingsError,
  InvalidRollManagerStateError,
} from "../errors";
import { isValidRollManagerData } from "../queries";

describe("validateSettings(settings)", () => {
  // we can share some specs code by extracting it into functions
  testValidatesSettings((settings) => validateSettings(settings));
});

describe("validateState(state)", () => {
  // we can share some specs code by extracting it into functions
  testValidatesState((state) => validateState(state));
});

describe("validateRollManagerData(data)", () => {
  // we can share some specs code by extracting it into functions
  testValidatesData((data) => validateRollManagerData(data));
});

describe("validateDieIndex(data, index)", () => {
  testValidatesDieIndex((data, index) => validateDieIndex(data, index));
});

describe("validateRolledDie(data, index)", () => {
  testValidatesRolledDie((data, index) => validateRolledDie(data, index));
});

describe("isValidRollManagerData(data)", () => {
  describe("check settings", () => {
    testValidatesSettings((settings) => {
      validateRollManagerData({
        settings,
        state: { ...VALID_STATE_UNROLLED },
      });
    });
  });

  describe("check state", () => {
    testValidatesState((state) => {
      const res = isValidRollManagerData({
        settings: VALID_SETTINGS,
        state,
      });
      if (!res) {
        throw new InvalidRollManagerStateError("invalid");
      }
    });
  });

  describe("checks the number of dice is the right one according to the settings", () => {
    const settings = { ...VALID_SETTINGS, numberOfDice: 6 };

    it("ok with the right amount of dice", () => {
      const state = {
        numberOfRolls: 0,
        dice: [
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
        ],
      };
      expect(isValidRollManagerData({ settings, state })).toBeTruthy();
    });

    it("returns false with more dice", () => {
      const state = {
        numberOfRolls: 0,
        dice: [
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
          { ...DEFAULT_DIE_STATE },
        ],
      };
      expect(isValidRollManagerData({ settings, state })).toBeFalsy();
    });

    it("returns false with less dice", () => {
      const state = {
        numberOfRolls: 0,
        dice: [{ ...DEFAULT_DIE_STATE }, { ...DEFAULT_DIE_STATE }],
      };
      expect(isValidRollManagerData({ settings, state })).toBeFalsy();
    });
  });
});
