import React from "react";
import { Die } from "./Die";
import { diceFaces, extDiceFaces } from "../Global";

export const Dice = (props) => {
  const { numberDices, extraDices, dice } = props;

  /*DiceManager include: { settings, state: { dice, numberOfRolls: 0 } }
   * setting include: { numberOfDice: number, numberOfExtraDice: number, diceRollLimit: number }
   * dice include an die array,
   * each die include: { value: number, isSelected: boolean }*/

  const createDicesComponentes = () => {
    let diceType = diceFaces;
    return dice.map((die, index) => {
      if (index >= numberDices - extraDices) {
        diceType = extDiceFaces;
      }
      return (
        <Die
          value={die.value}
          isSelected={die.isSelected}
          key={index}
          faces={diceType}
          onClick={click}
        />
      );
    });
  };

  const click = (eve) => {
    console.log({ eve });
  };

  return (
    <div className="dices-wrapper">
      <ul className="dices">{dice[0].value > 0 && createDicesComponentes()}</ul>
    </div>
  );
};
