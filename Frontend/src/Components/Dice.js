import React from "react";
import { Die } from "./Die";
import { diceFaces, extDiceFaces } from "../Global";
import { selectDie } from "../Services/roll-manager/actions";

export const Dice = (props) => {
  const { data } = props;
  const { numberDices, extraDices } = data.settings;
  const { dice } = data.state;
  /*DiceManager include: { settings, state: { dice, numberOfRolls: 0 } }
   * setting include: { numberOfDice: number, numberOfExtraDice: number, diceRollLimit: number }
   * dice include an die array,
   * each die include: { value: number, isSelected: boolean }*/

  const createDicesComponentes = () => {
    let diceType = diceFaces;
    return dice.map((dieState, index) => {
      if (index >= numberDices - extraDices) {
        diceType = extDiceFaces;
      }
      return (
        <Die
          value={dieState.value}
          isSelected={dieState.isSelected}
          key={index}
          dieIndex={index}
          faces={diceType}
          onClick={click}
        />
      );
    });
  };

  const click = (dieIndex) => {
    selectDie(data, dieIndex);
  };

  return (
    <div className="dices-wrapper">
      <ul className="dices">{createDicesComponentes()}</ul>
    </div>
  );
};
