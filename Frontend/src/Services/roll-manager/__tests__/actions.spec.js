import {
  testValidatesData,
  VALID_SETTINGS,
  VALID_STATE_UNROLLED,
  VALID_STATE_ROLLED,
  testValidatesDieIndex,
  testValidatesRolledDie,
} from "../private/test-utils";

import { rollDice, selectDie, toggleDie, unselectDie } from "../actions";
import { cloneDeep, range, uniq } from "lodash";
import { NoRollsLeftError } from "../errors";

describe("toggleDie(data, dieIndex)", () => {
  testValidatesData((data) => toggleDie(data, 0));
  testValidatesDieIndex((data, index) => toggleDie(data, index));
  testValidatesRolledDie((data, index) => toggleDie(data, index));

  it("with a selected die -> returns a new data object with the same settings and a clone of the state, with that die unselected", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = true;
    const data = { settings: VALID_SETTINGS, state };

    const expectedState = cloneDeep(VALID_STATE_ROLLED);
    expectedState.dice[0].isSelected = false;
    const expected = { settings: data.settings, state: expectedState };

    const res = toggleDie(data, 0);
    expect(res).toStrictEqual(expected);
    expect(res).not.toBe(data);
    expect(res.settings).toBe(data.settings);
    expect(res.state.dice[0]).not.toBe(data.state.dice[0]);
    expect(res.state.dice[1]).toBe(data.state.dice[1]);
    expect(res.state.dice[2]).toBe(data.state.dice[2]);
  });

  it("with a unselected die -> returns a new data object with the same settings and a clone of the state, with that die selected", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = false;
    const data = { settings: VALID_SETTINGS, state };

    const expectedState = cloneDeep(VALID_STATE_ROLLED);
    expectedState.dice[0].isSelected = true;
    const expected = { settings: data.settings, state: expectedState };

    const res = toggleDie(data, 0);
    expect(res).toStrictEqual(expected);
    expect(res).not.toBe(data);
    expect(res.settings).toBe(data.settings);
    expect(res.state.dice[0]).not.toBe(data.state.dice[0]);
    expect(res.state.dice[1]).toBe(data.state.dice[1]);
    expect(res.state.dice[2]).toBe(data.state.dice[2]);
  });
});

describe("unselectDie(data, dieIndex)", () => {
  testValidatesData((data) => unselectDie(data, 0));
  testValidatesDieIndex((data, index) => unselectDie(data, index));
  testValidatesRolledDie((data, index) => unselectDie(data, index));

  it("with a selected die -> returns a new data object with the same settings and a clone of the state, with that die unselected", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = true;
    const data = { settings: VALID_SETTINGS, state };

    const expectedState = cloneDeep(VALID_STATE_ROLLED);
    expectedState.dice[0].isSelected = false;
    const expected = { settings: data.settings, state: expectedState };

    const res = unselectDie(data, 0);
    expect(res).toStrictEqual(expected);
    expect(res).not.toBe(data);
    expect(res.settings).toBe(data.settings);
    expect(res.state.dice[0]).not.toBe(data.state.dice[0]);
    expect(res.state.dice[1]).toBe(data.state.dice[1]);
    expect(res.state.dice[2]).toBe(data.state.dice[2]);
  });

  it("with a unselected die -> returns the same data unchanged", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = false;
    const data = { settings: VALID_SETTINGS, state };
    const cloneForTest = cloneDeep(data);

    const res = unselectDie(data, 0);
    expect(res).toBe(data);
    expect(res).toEqual(cloneForTest); // we check that we haven't mutated data
  });
});

describe("selectDie(data, dieIndex)", () => {
  testValidatesData((data) => selectDie(data, 0));
  testValidatesDieIndex((data, index) => selectDie(data, index));
  testValidatesRolledDie((data, index) => selectDie(data, index));

  it("with a unselected die -> returns a new data object with the same settings and a clone of the state, with that die unselected", () => {
    /*Creo que algo está falla en la lógica de la prueba.*/
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = false;
    const data = { settings: VALID_SETTINGS, state }; //configuración inicial

    const expectedState = cloneDeep(VALID_STATE_ROLLED);
    expectedState.dice[0].isSelected = true;
    const expected = { settings: data.settings, state: expectedState }; //con el primer dado seleccionado

    const res = selectDie(data, 0); // tendría que retornar el primer dado cambiado

    expect(res).toStrictEqual(expected);
    expect(res).not.toBe(data);
    expect(res.settings).toBe(data.settings);
    expect(res.state.dice[0]).not.toBe(data.state.dice[0]);
    expect(res.state.dice[1]).toBe(data.state.dice[1]);
    expect(res.state.dice[2]).toBe(data.state.dice[2]);
  });

  it("with a unselected die -> returns the same data unchanged", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.dice[0].isSelected = true;
    const data = { settings: VALID_SETTINGS, state };
    const cloneForTest = cloneDeep(data);

    const res = selectDie(data, 0);
    expect(res).toBe(data);
    expect(res).toEqual(cloneForTest); // we check that we haven't mutated data
  });
});

describe("rollDice(data)", () => {
  testValidatesData((data) => rollDice(data, 0));

  it("explodes with not enough rolls left", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.numberOfRolls = VALID_SETTINGS.diceRollLimit;
    const data = { settings: VALID_SETTINGS, state };
    expect(() => rollDice(data)).toThrow(NoRollsLeftError);
  });

  it("works with enough rolls left", () => {
    const state = cloneDeep(VALID_STATE_ROLLED);
    state.numberOfRolls = VALID_SETTINGS.diceRollLimit - 1;
    const data = { settings: VALID_SETTINGS, state };
    expect(() => rollDice(data)).not.toThrow(NoRollsLeftError);
  });

  it("works with unrolled", () => {
    const state = cloneDeep(VALID_STATE_UNROLLED);
    const data = { settings: VALID_SETTINGS, state };
    expect(() => rollDice(data)).not.toThrow(NoRollsLeftError);
  });

  it("will return a copy of the data, with the same settings and a different object for state", () => {
    const state = cloneDeep(VALID_STATE_UNROLLED);
    const data = { settings: VALID_SETTINGS, state };

    const res = rollDice(data);
    expect(res).not.toBe(data);
    expect(res.settings).toBe(data.settings);
    expect(res.state).not.toBe(data.state);
  });

  it("the returned state will have numberOfRolls + 1", () => {
    const state = cloneDeep(VALID_STATE_UNROLLED);
    const data = { settings: VALID_SETTINGS, state };

    const res = rollDice(data);
    expect(res.state.numberOfRolls).toEqual(state.numberOfRolls + 1);
  });

  it("the returned state will have a new array of dice of the same length", () => {
    const state = cloneDeep(VALID_STATE_UNROLLED);
    const data = { settings: VALID_SETTINGS, state };

    const res = rollDice(data);
    expect(res.state.dice.length).toEqual(state.dice.length);
    expect(res.state.dice).not.toBe(state.dice);
  });

  describe("selected dice", () => {
    it("with the all the dice selected, returns the same data", () => {
      const state = cloneDeep(VALID_STATE_ROLLED);
      state.dice = state.dice.map((d) => ({
        value: d.value,
        isSelected: true,
      }));
      const data = { settings: VALID_SETTINGS, state };
      const cloneForTest = cloneDeep(data);

      const res = rollDice(data);
      expect(res).toBe(data);
      expect(res).toEqual(cloneForTest); // we check that we haven't mutated data
    });

    it("with the some the dice selected, returns the a new array. The elements of the selected dice will be the same object, while the unselected ones will be a new object", () => {
      const state = cloneDeep(VALID_STATE_ROLLED);
      state.dice[1].isSelected = true;
      state.dice[2].isSelected = true;
      const data = { settings: VALID_SETTINGS, state };

      const res = rollDice(data);
      expect(res).not.toBe(data);
      expect(res.state.dice).not.toBe(data.state.dice);
      expect(res.state.dice[0]).not.toBe(data.state.dice[0]);
      expect(res.state.dice[1]).toBe(data.state.dice[1]);
      expect(res.state.dice[2]).toBe(data.state.dice[2]);
      expect(res.state.dice[3]).not.toBe(data.state.dice[3]);
    });

    it("rolls the unselected dice", () => {
      // to test that we are actually rolling the dice, let's run this 10,000 times and check that we don't always get the same number
      const state = cloneDeep(VALID_STATE_ROLLED);
      // all dice selected except the first one
      state.dice = state.dice.map((die) => ({
        value: die.value,
        isSelected: true,
      }));
      state.dice[0].isSelected = false;
      const data = { settings: VALID_SETTINGS, state };

      const originalValueSelected = state.dice[1].value;

      const unselectedValues = [];
      const selectedValues = [];

      range(10_000).forEach(() => {
        const res = rollDice(data);
        unselectedValues.push(res.state.dice[0].value);
        selectedValues.push(res.state.dice[1].value);
      });

      expect(uniq(selectedValues)).toEqual([originalValueSelected]);
      expect(uniq(unselectedValues).length).toBeGreaterThan(1);
    });
  });
});
