import { isBoolean, isPlainObject } from "lodash";
import {
  InvalidRollManagerDataError,
  InvalidRollManagerSettingsError,
  InvalidRollManagerStateError,
  UnknownDieError,
  UnrolledDiceError,
} from "../errors";
import {
  isArrayOfPlainObjects,
  isFiniteInteger,
  isPositiveFiniteInteger,
} from "../../../utils/is-types";
import { DEFAULT_UNROLLED_DIE_VALUE } from "../creation";

/**
 * explodes if the given data is a invalid RollManagerData, with the right amount of dice in the state that the settings indicate
 * @param {RollManagerData} data
 * @throws {InvalidRollManagerStateError | InvalidRollManagerSettingsError | InvalidRollManagerDataError}
 * @private
 */
export function validateRollManagerData(data) {
  if (!isPlainObject(data)) {
    throw new InvalidRollManagerDataError(
      "The given param is not a plain object"
    );
  }

  validateSettings(data.settings);
  validateState(data.state);

  if (data.state.dice.length !== data.settings.numberOfDice) {
    throw new InvalidRollManagerDataError(
      "The given state has a different length of dice than the required by the given settings"
    );
  }

  if (data.state.numberOfRolls > data.settings.diceRollLimit) {
    throw new InvalidRollManagerDataError(
      "The given state has a more rolls than the allowed by the settings"
    );
  }
}

/**
 * explodes with invalid settings
 * @param {RollManagerSettings} settings
 * @private
 */
export function validateSettings(settings) {
  if (!isPlainObject(settings)) {
    throw new InvalidRollManagerSettingsError(
      "The given settings param is not a plain object"
    );
  }

  validateSettingsNumber(settings.numberOfDice, "numberOfDice");
  validateSettingsNumber(settings.numberOfExtraDice, "numberOfExtraDice");
  validateSettingsNumber(settings.diceRollLimit, "diceRollLimit");

  // TODO: validate the rest of the settings
}

/**
 * explodes with invalid state
 * @param {RollManagerState} state
 * @private
 */
export function validateState(state) {
  if (!isPlainObject(state)) {
    throw new InvalidRollManagerStateError(
      "The given state param is not a plain object"
    );
  }

  if (!isPositiveFiniteInteger(state.numberOfRolls)) {
    throw new InvalidRollManagerStateError(
      "state.numberOfRolls is not a finite integer"
    );
  }

  if (!isArrayOfPlainObjects(state.dice)) {
    throw new InvalidRollManagerStateError(`${name} is not a finite integer`);
  }

  if (state.numberOfRolls > 0) {
    state.dice.forEach((d, i) => validateDieRolled(d, i));
  } else {
    state.dice.forEach((d, i) => validateDieUnrolled(d, i));
  }
}

/**
 * explodes if the given index is not a valid die index for the given data
 * @param {RollManagerData} data (it is assumed that it is already validated)
 * @param {number} index
 * @throws {UnknownDieError}
 * @private
 */
export function validateDieIndex(data, index) {
  if (!isPositiveFiniteInteger(index)) {
    throw new UnknownDieError(
      `the given index is not a positive finite integer ${index}`
    );
  }

  if (index >= data.state.dice.length) {
    throw new UnknownDieError(
      `the given index is larger than the number of dice in the given data ${index}`
    );
  }
}

/**
 * explodes if the given die has never been rolled
 *
 * @param {RollManagerData} data (it is assumed that it is already validated)
 * @param {number} index (it is assumed that it is already validated)
 * @throws {UnrolledDiceError}
 */
export function validateRolledDie(data, index) {
  if (data.state.dice[index].value === DEFAULT_UNROLLED_DIE_VALUE) {
    throw new UnrolledDiceError(
      `the die in the given index has never been rolled ${index}`
    );
  }
}

/**
 * explodes with an invalid DieState or with a the value of the default un-rolled value
 * @param {DieState} die
 * @param {number} index
 */
function validateDieRolled(die, index) {
  validateDie(die, index);

  if (die.value === DEFAULT_UNROLLED_DIE_VALUE) {
    throw new InvalidRollManagerStateError(
      `The given die is is unrolled, index: ${index}`
    );
  }
}

/**
 * explodes with an invalid DieState or with a the value that is not the default un-rolled value
 * @param {DieState} die
 * @param {number} index
 */
function validateDieUnrolled(die, index) {
  validateDie(die, index);

  if (die.value !== DEFAULT_UNROLLED_DIE_VALUE) {
    throw new InvalidRollManagerStateError(
      `The given die is is rolled, index: ${index}`
    );
  }
}

/**
 * explodes with an invalid DieState
 * @param {DieState} die
 * @param {number} index
 */
function validateDie(die, index) {
  if (!isPlainObject(die)) {
    throw new InvalidRollManagerStateError(
      `The given die is not a plain object, index: ${index}`
    );
  }

  if (!isBoolean(die.isSelected)) {
    throw new InvalidRollManagerStateError(
      `The given die does not have a boolean in 'isSelected', index: ${index}`
    );
  }

  if (!isFiniteInteger(die.value)) {
    throw new InvalidRollManagerStateError(
      `The given die does not have a finite integer in 'value', index: ${index}`
    );
  }
}

// aux

/**
 * explodes if the given value is not a valid number
 * @param {any} value
 * @param {string} name
 */
function validateSettingsNumber(value, name) {
  if (!isPositiveFiniteInteger(value)) {
    throw new InvalidRollManagerSettingsError(
      `${name} is not a finite integer`
    );
  }
}
