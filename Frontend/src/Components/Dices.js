import React, { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { range, random } from "lodash";

export const Dices = (props) => {
  const [dices, setDices] = useState(null);
  const { numberDices, rollDices } = props;

  const createDicesComponentes = () => {
    let result = [];
    let diceType = "normal";
    range(numberDices).map((number) => {
      if (number >= 6) {
        diceType = "extra";
      }
      result.push(
        <Dice key={number} type={diceType} result={random(0, 5)} tirar={roll} />
      );
    });
    return result;
  };

  useEffect(() => {
    setDices(createDicesComponentes());
  }, [numberDices]);

  const roll = (elemProps) => {};

  return (
    <div className="dices-wrapper">
      <ul className="dices">{dices && dices.map((dice) => dice)}</ul>
      <button className="btn" onClick={roll}>
        Lanzar
      </button>
    </div>
  );
};
