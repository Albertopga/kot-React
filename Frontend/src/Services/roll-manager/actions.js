import {
  validateDieIndex,
  validateRolledDie,
  validateRollManagerData,
} from "./private/validations";

/**
 * after validating the data and dieIndex, as well as that the relevant die has been rolled at least once,
 * it returns a new data object with the same settings and a clone of the state, with the value of `isSelected` of
 * the relevant die flipped, and the rest of the dice are the same objects
 *
 * @param {RollManagerData} data
 * @param {number} dieIndex
 * @return {RollManagerData}
 */
export function toggleDie(data, dieIndex) {
  validateRollManagerData(data);
  validateDieIndex(data, dieIndex);
  validateRolledDie(data, dieIndex);
  // TODO: toggle die
}

/**
 * after validating the data and dieIndex, as well as that the relevant die has been rolled at least once,
 * - if the relevant die is selected, it returns the same data object
 * - otherwise, it returns a new data object with the same settings
 *   and a clone of the state, with the value of `isSelected` of the relevant die is false.
 *   and the rest of the dice are the same objects
 *
 * @param {RollManagerData} data
 * @param {number} dieIndex
 * @return {RollManagerData}
 */
export function selectDie(data, dieIndex) {
  validateRollManagerData(data);
  validateDieIndex(data, dieIndex);
  validateRolledDie(data, dieIndex);
  // TODO: select die
}

/**
 * after validating the data and dieIndex, as well as that the relevant die has been rolled at least once,
 * - if the relevant die is unselected, it returns the same data object
 * - otherwise, it returns a new data object with the same settings
 *   and a clone of the state, with the value of `isSelected` of the relevant die is true.
 *   and the rest of the dice are the same objects
 *
 * @param {RollManagerData} data
 * @param {number} dieIndex
 * @return {RollManagerData}
 */
export function unselectDie(data, dieIndex) {
  validateRollManagerData(data);
  validateDieIndex(data, dieIndex);
  validateRolledDie(data, dieIndex);
  // TODO: unselect die
}

/**
 *
 * @param {RollManagerData} data
 * @return {RollManagerData}
 */
export function rollDice(data) {
  validateRollManagerData(data);

  // TODO: throw if no rolls left
  // TODO: roll dice
}
