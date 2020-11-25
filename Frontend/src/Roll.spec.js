import { Roll } from "./Roll";
import { range } from "lodash";

describe("Roll", () => {
  describe("instance creation", () => {
    it("the initial value of isSelected is false", () => {
      const roll = new Roll(3, 0, 1);
      const dieTestisSelected = roll.dice[0];

      expect(dieTestisSelected.isSelected).toBe(false);
    });
    it("the initial value of value is 10", () => {
      const roll = new Roll(3, 0, 1);
      const dieTestisSelected = roll.dice[0];

      expect(dieTestisSelected.value).toBe(10);
    });
    describe("receives number of dice as first argument", () => {
      it("works with a number", () => {
        expect(new Roll(1, 1, 1)).toBeInstanceOf(Roll);
      });
      it("throws exception with null", () => {
        expect(() => new Roll(null, 1, 1)).toThrow();
      });
      it("throws exception with undefined", () => {
        expect(() => new Roll(undefined, 1, 1)).toThrow();
      });
      it("throws exception with string", () => {
        expect(() => new Roll("cacafuty", 1, 1)).toThrow();
      });
      it("throws exception with array with a number", () => {
        expect(() => new Roll([1], 1, 1)).toThrow();
      });
      it("throws exception with object", () => {
        expect(() => new Roll({ value: 1 }, 1, 1)).toThrow();
      });
    });

    describe("receives number of extra dice as second argument", () => {
      it("works with a number", () => {
        expect(new Roll(1, 1, 1)).toBeInstanceOf(Roll);
      });
      it("throws exception with null", () => {
        expect(() => new Roll(1, null, 1)).toThrow();
      });
      it("throws exception with undefined", () => {
        expect(() => new Roll(1, undefined, 1)).toThrow();
      });
      it("throws exception with string", () => {
        expect(() => new Roll(1, "cacafuty", 1)).toThrow();
      });
      it("throws exception with array with a number", () => {
        expect(() => new Roll(1, [1], 1)).toThrow();
      });
      it("throws exception with object", () => {
        expect(() => new Roll(1, { value: 1 }, 1)).toThrow();
      });
    });

    describe("receives limit of rolls as third argument", () => {
      it("works with a number", () => {
        expect(new Roll(1, 1, 1)).toBeInstanceOf(Roll);
      });
      it("throws exception with null", () => {
        expect(() => new Roll(1, 1, null)).toThrow();
      });
      it("throws exception with undefined", () => {
        expect(() => new Roll(1, 1, undefined)).toThrow();
      });
      it("throws exception with string", () => {
        expect(() => new Roll(1, 1, "cacafuty")).toThrow();
      });
      it("throws exception with array with a number", () => {
        expect(() => new Roll(1, 1, [1])).toThrow();
      });
      it("throws exception with object", () => {
        expect(() => new Roll(1, 1, { value: 1 })).toThrow();
      });
    });
  });

  describe("#dice", () => {
    const roll = new Roll(1, 0, 2);
    const result = roll.dice;
    const expected = [{ value: 10, isSelected: false }];

    it("after creation it stores an array with one object per dice in total (numberOfDice + numberOfExtraDice)", () => {
      expect(result).toStrictEqual(expected); // creo que esto no es así
    });
    it("each object has { value: number, isSelected: boolean }", () => {
      expect(result[0]).toStrictEqual(expected[0]);
    });
    it("after creation all objects have value = 10, isSelected = false", () => {
      expect(result[0]).toStrictEqual(expected[0]);
    });
  });

  describe("#selectDie(index)", () => {
    const roll = new Roll(3, 0, 1);

    describe("change the state isSelected to the die that matches the index passed", () => {
      it("if isSelected is false, change the value to true", () => {
        const dieTestisSelected = roll.dice[0];

        dieTestisSelected.isSelected = false;
        roll.selectDie(0);

        expect(dieTestisSelected.isSelected).toBe(true);
      });
      it("if isSelected is true, change the value to false", () => {
        const dieTestisSelected = roll.dice[0];

        dieTestisSelected.isSelected = true;
        roll.selectDie(0);

        expect(dieTestisSelected.isSelected).toBe(false);
      });
    });

    it("throws exception when index exceeds the array length", () => {
      expect(() => {
        roll.selectDie(10);
      }).toThrow();
    });
    it("throws exception when index not is or cant be cast to a number", () => {
      expect(() => {
        roll.selectDie("asas");
      }).toThrow();
      expect(() => {
        roll.selectDie("0");
      }).not.toThrow();
    });
    it("can't select a die when the diceRolLimit is exceeded", () => {
      const roll = new Roll(3, 0, 0);
      roll.selectDie(0);
      const result = roll.dice[0].isSelected;

      expect(result).toBe(false);
    });
  });

  describe("#rollDIce()", () => {
    it("doesn´t change the value of the selected dice", () => {
      const roll = new Roll(3, 0, 2);

      const diceTest = roll.dice[0];
      const expected = { ...diceTest };

      diceTest.isSelected = true;
      roll.rollDice();

      expect(diceTest.value).toBe(expected.value);
    });
    it("does change the value of the unselected dice", () => {
      const roll = new Roll(3, 0, 2);
      const diceTest = roll.dice[0]; // default value 10
      const expected = { ...diceTest };

      diceTest.isSelected = false;
      roll.rollDice();

      expect(diceTest.value).not.toBe(expected.value);
    });
  });

  describe("#getDiceValueSet()", () => {
    const roll = new Roll(3, 0, 3);

    it("return a set of numeric values equal in length as the number of dice", () => {
      const result = roll.getDiceValueSet();
      const expected = range(0, roll.numberOfDices).map((number) => 10);

      expect(result).toStrictEqual(expected);
    });
  });

  describe("#getDieValue(index)", () => {
    const roll = new Roll(3, 0, 3);

    it("return the value of the die that matches the index passed ", () => {
      const result = roll.getDieValue(0);
      const expected = roll.dice[0].value;

      expect(result).toBe(expected);
    });
    it("throws exception when index exceeds the array length", () => {
      expect(() => {
        roll.getDieValue(10);
      }).toThrow();
    });
    it("throws exception when index not is or cant be cast to a number", () => {
      expect(() => {
        roll.getDieValue("asas");
      }).toThrow();
      expect(() => {
        roll.getDieValue("0");
      }).not.toThrow();
    });
  });

  describe("#getDiceStateSet()", () => {
    it("returns a copy of the #dice array with a copy of each die status", () => {
      const roll = new Roll(3, 2, 2);
      const result = roll.getDiceStateSet();
      const diceOrigin = roll.dice;

      expect(result).toEqual(diceOrigin);
      expect(result).not.toBe(diceOrigin);

      expect(result[0]).toEqual(diceOrigin[0]);
      expect(result[0]).not.toBe(diceOrigin[0]);
    });
    it("mutating an object of the result of #getDiceStateSet() will not mutate the state in #dice", () => {
      const roll = new Roll(3, 2, 2);
      const result = roll.getDiceStateSet();

      const resFirst = result[0];
      const dieFirst = roll.dice[0];
      expect(resFirst).toEqual(dieFirst);
      expect(resFirst).not.toBe(dieFirst);

      expect(resFirst.value).toEqual(dieFirst.value);
      resFirst.value = resFirst.value - 1;
      expect(resFirst.value).not.toEqual(dieFirst.value);
    });
  });

  describe("#getDieState(index)", () => {
    const roll = new Roll(3, 0, 3);

    it("return a copy of the die that matches the index passed", () => {
      const result = roll.getDieState(0);
      const expected = { ...roll.dice[0] };

      expect(result).toEqual(expected);
      expect(result).not.toBe(expected);
    });
  });
});
