import { cloneDeep, isPlainObject, range } from "lodash";
import { InvalidRollManagerDataError } from "./errors";
import { validateSettings, validateState } from "./private/validations";

/**
 * returns a new object with the given settings and a new fresh state: set numberOfRolls = 0 and dice with a new array of unrolled dice
 *
 * @param {RollManagerSettings} settings
 * @return {RollManagerData}
 */
export function buildRollManagerFresh(settings) {
  validateSettings(settings);
  /**
   * @type {DieState[]}
   */
  const dice = range(settings.numberOfDice).map(() => buildDieState());
  return { settings, state: { dice, numberOfRolls: 0 } };
}

/**
 * returns a new object with the same data with the same settings and a deep-clone of the given state
 *
 * @param {RollManagerData} data
 * @return {RollManagerData}
 */
export function buildRollManagerFrom(data) {
  if (!isPlainObject(data)) {
    throw new InvalidRollManagerDataError(
      "The given data param is not a plain object"
    );
  }

  validateSettings(data.settings);
  validateState(data.state);
  return { settings: data.settings, state: cloneDeep(data.state) };
}

/**
 * builds a default DieState
 * @return {DieState}
 */
export function buildDieState() {
  return { value: DEFAULT_UNROLLED_DIE_VALUE, isSelected: false };
}

/**
 * determines the value of the die that indicates that it has not been rolled yet.
 *
 * @type {number}
 */
export const DEFAULT_UNROLLED_DIE_VALUE = -1;
