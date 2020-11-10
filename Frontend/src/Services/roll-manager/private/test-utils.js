import {
  UnrolledDiceError,
  InvalidRollManagerDataError,
  InvalidRollManagerSettingsError,
  InvalidRollManagerStateError,
  UnknownDieError,
} from "../errors";
import { buildDieState } from "../creation";
import { validateDieIndex } from "./validations";
import { isValidRollManagerData } from "../queries";

/**
 * @type {RollManagerSettings}
 */
export const VALID_SETTINGS = {
  numberOfDice: 6,
  numberOfExtraDice: 2,
  diceRollLimit: 3,
};

/**
 * @type {DieState}
 */
export const DEFAULT_DIE_STATE = { isSelected: false, value: -1 };

/**
 * @type {DieState}
 */
export const ROLLED_DIE_STATE = { isSelected: false, value: 2 };

/**
 * @type {RollManagerState}
 */
export const VALID_STATE_UNROLLED = {
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

/**
 * @type {RollManagerState}
 */
export const VALID_STATE_ROLLED = {
  numberOfRolls: 1,
  dice: [
    { ...ROLLED_DIE_STATE },
    { ...ROLLED_DIE_STATE },
    { ...ROLLED_DIE_STATE },
    { ...ROLLED_DIE_STATE },
    { ...ROLLED_DIE_STATE },
    { ...ROLLED_DIE_STATE },
  ],
};

/**
 * ensures that the given function will explode with invalid settings as arguments
 * @param {Function} fn
 */
export function testValidatesSettings(fn) {
  describe("validates settings", () => {
    it("fails with `InvalidRollManagerSettingsError` passing null", () => {
      expect(() => fn(null)).toThrow(InvalidRollManagerSettingsError);
    });
    it("fails with `InvalidRollManagerSettingsError` passing a string", () => {
      expect(() => fn("cacafuti")).toThrow(InvalidRollManagerSettingsError);
    });
    it("fails with `InvalidRollManagerSettingsError` passing an array", () => {
      expect(() => fn([])).toThrow(InvalidRollManagerSettingsError);
    });
    it("fails with `InvalidRollManagerSettingsError` passing an number", () => {
      expect(() => fn(1)).toThrow(InvalidRollManagerSettingsError);
    });
    it("fails with `InvalidRollManagerSettingsError` passing {}", () => {
      expect(() => fn({})).toThrow(InvalidRollManagerSettingsError);
    });
    it("fails with `InvalidRollManagerSettingsError` passing settings.numberOfDice with anything else than a number", () => {
      const common = { numberOfExtraDice: 2, diceRollLimit: 3 };
      expect(() => fn({ ...common })).toThrow(InvalidRollManagerSettingsError);
      expect(() => fn({ ...common, numberOfDice: "1" })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, numberOfDice: [1] })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, numberOfDice: {} })).toThrow(
        InvalidRollManagerSettingsError
      );
    });
    it("fails with `InvalidRollManagerSettingsError` passing settings.numberOfExtraDice with anything else than a number", () => {
      const common = { numberOfDice: 6, diceRollLimit: 3 };
      expect(() => fn({ ...common })).toThrow(InvalidRollManagerSettingsError);
      expect(() => fn({ ...common, numberOfExtraDice: "1" })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, numberOfExtraDice: [1] })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, numberOfExtraDice: {} })).toThrow(
        InvalidRollManagerSettingsError
      );
    });
    it("fails with `InvalidRollManagerSettingsError` passing settings.diceRollLimit with anything else than a number", () => {
      const common = { numberOfDice: 6, numberOfExtraDice: 3 };
      expect(() => fn({ ...common })).toThrow(InvalidRollManagerSettingsError);
      expect(() => fn({ ...common, diceRollLimit: "1" })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, diceRollLimit: [1] })).toThrow(
        InvalidRollManagerSettingsError
      );
      expect(() => fn({ ...common, diceRollLimit: {} })).toThrow(
        InvalidRollManagerSettingsError
      );
    });

    // TODO "fails with the extra numeric limitations for allowed number of dice, allowed diceRollLimit, etc."

    it("does not fail with valid settings", () => {
      expect(() => fn(VALID_SETTINGS)).not.toThrow(
        InvalidRollManagerSettingsError
      );
    });
  });
}

/**
 * ensures that the given function will explode with invalid state as arguments
 * @param {Function} fn
 */
export function testValidatesState(fn) {
  describe("validates state", () => {
    it("fails with `InvalidRollManagerStateError` passing null", () => {
      expect(() => fn(null)).toThrow(InvalidRollManagerStateError);
    });
    it("fails with `InvalidRollManagerStateError` passing a string", () => {
      expect(() => fn("cacafuti")).toThrow(InvalidRollManagerStateError);
    });
    it("fails with `InvalidRollManagerStateError` passing an array", () => {
      expect(() => fn([])).toThrow(InvalidRollManagerStateError);
    });
    it("fails with `InvalidRollManagerStateError` passing an number", () => {
      expect(() => fn(1)).toThrow(InvalidRollManagerStateError);
    });
    it("fails with `InvalidRollManagerStateError` passing {}", () => {
      expect(() => fn({})).toThrow(InvalidRollManagerStateError);
    });
    it("fails with `InvalidRollManagerStateError` passing state.numberOfRolls with anything else than a positive number", () => {
      const common = { dice: VALID_STATE_UNROLLED.dice };
      expect(() => fn({ ...common })).toThrow(InvalidRollManagerStateError);
      expect(() => fn({ ...common, numberOfRolls: "1" })).toThrow(
        InvalidRollManagerStateError
      );
      expect(() => fn({ ...common, numberOfRolls: [1] })).toThrow(
        InvalidRollManagerStateError
      );
      expect(() => fn({ ...common, numberOfRolls: {} })).toThrow(
        InvalidRollManagerStateError
      );
    });

    it("fails with `InvalidRollManagerStateError` passing settings.dice with anything else than an array of die state objects with value -1", () => {
      const common = { numberOfRolls: 1 };
      expect(() => fn({ ...common })).toThrow(InvalidRollManagerStateError);
      expect(() => fn({ ...common, dice: "1" })).toThrow(
        InvalidRollManagerStateError
      );
      expect(() => fn({ ...common, dice: [1] })).toThrow(
        InvalidRollManagerStateError
      );
      expect(() => fn({ ...common, dice: {} })).toThrow(
        InvalidRollManagerStateError
      );
      expect(() => fn({ ...common, dice: [{}] })).toThrow(
        InvalidRollManagerStateError
      );
    });

    describe("with numberOfRolls=0", () => {
      it("fails with `InvalidRollManagerStateError` passing settings.numberOfExtraDice with anything else than an array of die state objects with value -1", () => {
        const common = { numberOfRolls: 0 };
        const dice = [
          DEFAULT_DIE_STATE,
          ROLLED_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
        ];
        expect(() => fn({ ...common, dice })).toThrow(
          InvalidRollManagerStateError
        );
      });

      it("is ok with all the dice in a non-rolled default state", () => {
        const common = { numberOfRolls: 0 };
        const dice = [
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
          DEFAULT_DIE_STATE,
        ];
        expect(() => fn({ ...common, dice })).not.toThrow(
          InvalidRollManagerStateError
        );
      });
    });

    describe("with numberOfRolls>0", () => {
      it("fails with `InvalidRollManagerStateError` passing settings.numberOfExtraDice with anything else than an array of die state objects with value -1", () => {
        const common = { numberOfRolls: 1 };
        const dice = [
          ROLLED_DIE_STATE,
          DEFAULT_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
        ];
        expect(() => fn({ ...common, dice })).toThrow(
          InvalidRollManagerStateError
        );
      });

      it("is ok with all the dice in a rolled non-default state", () => {
        const common = { numberOfRolls: 1 };
        const dice = [
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
          ROLLED_DIE_STATE,
        ];
        expect(() => fn({ ...common, dice })).not.toThrow(
          InvalidRollManagerStateError
        );
      });
    });
  });
}

export function testValidatesData(fn) {
  describe("checks data", () => {
    describe("check settings", () => {
      testValidatesSettings((settings) => {
        fn({
          settings,
          state: { ...VALID_STATE_UNROLLED },
        });
      });
    });

    describe("check state", () => {
      testValidatesState((state) => {
        fn({
          settings: VALID_SETTINGS,
          state,
        });
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
        expect(() => fn({ settings, state })).not.toThrow(
          InvalidRollManagerDataError
        );
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
        expect(() => fn({ settings, state })).toThrow(
          InvalidRollManagerDataError
        );
      });

      it("returns false with less dice", () => {
        const state = {
          numberOfRolls: 0,
          dice: [{ ...DEFAULT_DIE_STATE }, { ...DEFAULT_DIE_STATE }],
        };
        expect(() => fn({ settings, state })).toThrow(
          InvalidRollManagerDataError
        );
      });
    });

    it("checks that the number of rolls is not greater than the max in the settings", () => {
      const settings = VALID_SETTINGS;
      const state = {
        ...VALID_STATE_ROLLED,
        numberOfRolls: settings.diceRollLimit + 1,
      };
      expect(() => fn({ settings, state })).toThrow(
        InvalidRollManagerDataError
      );
    });
  });
}

export function testValidatesDieIndex(fn) {
  describe("checks dice index", () => {
    const data = { settings: VALID_SETTINGS, state: VALID_STATE_ROLLED };

    it("explodes with index -1", () => {
      expect(() => fn(data, -1)).toThrow(UnknownDieError);
    });
    it("explodes with index === number of dice", () => {
      expect(() => fn(data, data.state.dice.length)).toThrow(UnknownDieError);
    });
    it("explodes with index > number of dice", () => {
      expect(() => fn(data, data.state.dice.length + 1)).toThrow(
        UnknownDieError
      );
    });

    it("ok with index === 0", () => {
      expect(() => fn(data, 0)).not.toThrow(UnknownDieError);
    });

    it("ok with index === number of dice -1", () => {
      expect(() => fn(data, data.state.dice.length - 1)).not.toThrow(
        UnknownDieError
      );
    });
  });
}

export function testValidatesRolledDie(fn) {
  describe("checks unrolled die", () => {
    const data = { settings: VALID_SETTINGS, state: VALID_STATE_UNROLLED };

    it("explodes with unrolled", () => {
      const data = { settings: VALID_SETTINGS, state: VALID_STATE_UNROLLED };
      expect(() => fn(data, 0)).toThrow(UnrolledDiceError);
    });

    it("ok with rolled", () => {
      const data = { settings: VALID_SETTINGS, state: VALID_STATE_ROLLED };
      expect(() => fn(data, 0)).not.toThrow(UnrolledDiceError);
    });
  });
}
