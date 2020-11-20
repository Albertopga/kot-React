import {
  validateDieIndex,
  validateNumberOfRolls,
  validateRolledDie,
  validateRollManagerData,
} from "./private/validations";
import { cloneDeep, random } from "lodash";
import { NoRollsLeftError } from "./errors";
import { thereAreAnyUnselectedDie } from "./queries";

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

  const dice = data.state.dice.map((die, i) => {
    if (dieIndex !== i) return die;

    die = {
      isSelected: !die.isSelected,
      value: die.value,
    };
    return die;
  });

  const newData = {
    settings: data.settings,
    state: {
      dice: dice,
      numberOfRolls: data.state.numberOfRolls,
    },
  };

  return newData;
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

  if (data.state.dice[dieIndex].isSelected) return data;

  const dice = data.state.dice.map((die, i) => {
    if (dieIndex !== i) return die;

    return {
      isSelected: true,
      value: die.value,
    };
  });

  const newData = {
    settings: data.settings,
    state: {
      dice: dice,
      numberOfRolls: data.state.numberOfRolls,
    },
  };

  return newData;
}

/**
 * after validating the data and dieIndex, as well as that the relevant die has been rolled at least once,
 * - if the relevant die is unselected, it returns the same data object
 * - otherwise, it returns a new data object with the same settings
 *   and a clone of the state, with the value of `isSelected` of the relevant die is true.
 *   and the rest of the dice are the same objects
 *
 *  si el dado está seleccionado, retornar un data objet nuevo, con las mismas settings y
 *  un array dices nuevo con los mismos dados, salvo el dado selecciona, que será un nuevo objeto
 *
 * @param {RollManagerData} data
 * @param {number} dieIndex
 * @return {RollManagerData}
 */
export function unselectDie(data, dieIndex) {
  validateRollManagerData(data);
  validateDieIndex(data, dieIndex);
  validateRolledDie(data, dieIndex);

  if (!data.state.dice[dieIndex].isSelected) return data;

  const dice = data.state.dice.map((die, i) => {
    if (dieIndex !== i) return die;

    return {
      isSelected: false,
      value: die.value,
    };
  });

  const newData = {
    settings: data.settings,
    state: {
      dice: dice,
      numberOfRolls: data.state.numberOfRolls,
    },
  };

  return newData;
}

/**
 *
 * @param {RollManagerData} data
 * @return {RollManagerData}
 */
export function rollDice(data) {
  validateRollManagerData(data);
  validateNumberOfRolls(data);

  if (!thereAreAnyUnselectedDie(data)) return data;

  //will return a copy of the data, with the same settings and a different object for state

  const dice = data.state.dice.map((die, i) => {
    if (die.isSelected) return die;

    return {
      isSelected: false,
      value: random(5),
    };
  });

  const newData = {
    settings: data.settings,
    state: {
      dice: dice,
      numberOfRolls: data.state.numberOfRolls + 1,
    },
  };

  return newData;
}
