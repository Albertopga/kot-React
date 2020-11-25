import React, { useEffect, useState } from "react";
import { Die } from "./Die";
import { diceFaces, extDiceFaces } from "../Global";

export const Dice = (props) => {
  const { dice, numberOfDice, numberOfExtraDice, selectDie } = props;

  useEffect(() => {}, []);

  const createDicesComponentes = () => {
    let diceType = diceFaces;
    return dice.map((dieState, index) => {
      if (index >= numberOfDice - numberOfExtraDice) {
        diceType = extDiceFaces;
      }
      return (
        <Die
          state={dieState}
          key={index}
          dieIndex={index}
          faces={diceType}
          onClick={getIndex}
        />
      );
    });
  };

  const getIndex = (modifiedDieIndex) => {
    selectDie(modifiedDieIndex);
  };

  return (
    <div className="dices-wrapper">
      <ul className="dices">{createDicesComponentes()}</ul>
    </div>
  );
};
