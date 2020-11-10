import { range } from "lodash";
import { getRandom } from "./Global";

export class Roll {
  constructor(numberOfDice, numberOfExtraDices, diceRollLimit) {
    if (
      !isNaN(numberOfDice) &&
      numberOfDice != null &&
      !isNaN(numberOfExtraDices) &&
      numberOfExtraDices != null &&
      !isNaN(diceRollLimit) &&
      diceRollLimit != null
    ) {
      this.numberOfDices = numberOfDice; // between 6 and 8 both includes
      this.numberOfExtraDices = numberOfExtraDices; // between 0 and 2 both includes
      this.diceRollLimit = diceRollLimit; // usually three
      this.numberOfRolls = 0;
      this.dice = range(0, this.numberOfDices).map((number) => {
        return {
          value: 10,
          isSelected: false,
        };
      });
    } else {
      throw "Error in the params";
    }
  }

  selectDie(index) {
    if (index >= this.dice.length) throw "index out of range";
    if (this.numberOfRolls >= this.diceRollLimit) return; // no se puede seleccionar ni deseleccionar si si he cubierto el cupo de tiradas

    this.dice[index].isSelected = !this.dice[index].isSelected;
  }

  rollDice() {
    if (this.numberOfRolls > this.diceRollLimit) return;

    this.dice = this.dice.map((die) => {
      if (!die.isSelected) {
        die.value = getRandom();
      }
      return die;
    });

    this.numberOfRolls++;
  }

  getDiceValueSet() {
    return this.dice.map((dice) => {
      return dice.value;
    });
  }

  getDieValue(index) {
    if (index >= this.dice.length) throw "Index out of range";

    return this.dice[index].value;
  }

  getDiceStateSet() {
    return this.dice.map((dice) => {
      return { ...dice };
    });
  }

  getDieState(index) {
    if (index >= this.dice.length) return;

    return { ...this.dice[index] };
  }
}
