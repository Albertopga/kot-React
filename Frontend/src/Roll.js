import { range } from "lodash";
import { getRandom } from "./Global";

class Roll {
  constructor(numberOfDice, numberOfExtraDices, diceRollLimit) {
    this.numberOfDices = numberOfDice; // between 6 and 8 both includes
    this.numberOfExtraDices = numberOfExtraDices; // between 0 and 2 both includes
    this.diceRollLimit = diceRollLimit; // usually three
    this.numberOfRolls = 0;
    this.dice = range(0, numberOfDice).map((number) => {
      return {
        value: null,
        isSelected: false,
      };
    });
  }

  selectDice(index) {
    if (!this.dice[index].value) return;

    this.dice[index].isSelected = !this.dice[index].isSelected;
  }

  rollDie() {
    if (this.numberOfRolls > this.diceRollLimit) return;

    this.dice = this.dice.map((die) => {
      if (!die.isSelected) {
        die.value = getRandom();
      }
      return die;
    });

    this.numberOfRolls++;
  }

  getDiceValue() {
    return this.dice.map((dice) => {
      return dice.value;
    });
  }

  getStateDice() {
    return this.dice.map((dice) => {
      return dice.isSelected;
    });
  }
}

let roll = new Roll(6, 0, 3);
roll.selectDice(0);

for (let i = 0; i < 6; i++) {
  roll.rollDie();
  if (roll.numberOfRolls <= roll.diceRollLimit) {
    console.log(roll.getDiceValue());
  } else {
    console.log("numero de tiradas excedido");
    break;
  }
}

console.log(roll.getStateDice());
roll.selectDice(0);
console.log(roll.getStateDice());
