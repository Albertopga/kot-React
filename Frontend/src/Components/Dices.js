import React, { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { range, random } from "lodash";
import { diceFaces, extDiceFaces } from "../Global";

export const Dices = (props) => {
  const [dices, setDices] = useState(null);
  const { numberDices, extraDices } = props;

  const createDicesComponentes = () => {
    let result = [];
    let diceType = diceFaces;
    range(numberDices).map((number) => {
      if (number >= numberDices - extraDices) {
        diceType = extDiceFaces;
      }
      result.push(<Dice key={number} faces={diceType} />);
    });
    return result;
  };

  useEffect(() => {
    setDices(createDicesComponentes());
  }, [numberDices, extraDices]);

  return (
    <div className="dices-wrapper">
      <ul className="dices">{dices && dices.map((dice) => dice)}</ul>
    </div>
  );
};
