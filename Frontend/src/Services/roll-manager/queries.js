import { validateRollManagerData } from "./private/validations";

/**
 * returns true if we haven't reached the limit of rolls allowed
 *
 * @param {RollManagerData} data
 * @return {boolean}
 * @throws {InvalidRollManagerDataError} if the data is invalid
 */
export function rollManagerHasRollsLeft(data) {
  validateRollManagerData(data);
  // TODO implement hasRollsLeft()
}

/**
 * returns true if we have rolled the dice at least once
 *
 * @param {RollManagerData} data
 * @return {boolean}
 * @throws {InvalidRollManagerDataError} if the data is invalid
 */
export function rollManagerHasResults(data) {
  validateRollManagerData(data);
  // TODO implement hasResults()
}

/**
 * returns false if the given data is a invalid RollManagerData, with the right amount of dice in the state that the settings indicate
 * @param {RollManagerData} data
 * @see {validateRollManagerData}
 */
export function isValidRollManagerData(data) {
  try {
    validateRollManagerData(data);
    return true;
  } catch (_e) {
    return false;
  }
}
