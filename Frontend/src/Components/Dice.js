import React, { useEffect, useState } from "react";
import { Die } from "./Die";
import { diceFaces, extDiceFaces } from "../Global";

export const Dice = (props) => {
  const { data } = props;
  const [diceData, setDiceData] = useState(data);
  const { numberDices, extraDices } = diceData.settings;
  const { dice } = diceData.state;

  useEffect(() => {
    console.table(data.state.dice);
    setDiceData(data);
  }, [data]);

  const createDicesComponentes = () => {
    let diceType = diceFaces;
    return dice.map((dieState, index) => {
      if (index >= numberDices - extraDices) {
        diceType = extDiceFaces;
      }
      return (
        <Die
          data={diceData}
          state={dieState}
          key={index}
          dieIndex={index}
          faces={diceType}
          onClick={toggleDie}
        />
      );
    });
  };

  const toggleDie = (dataWithDieChanged) => {
    setDiceData(dataWithDieChanged);
  };

  return (
    <div className="dices-wrapper">
      <ul className="dices">{createDicesComponentes()}</ul>
    </div>
  );
};
