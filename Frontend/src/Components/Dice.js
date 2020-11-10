import React, { useEffect, useState } from "react";
import { Die } from "./Die";
import { range } from "lodash";
import { diceFaces, extDiceFaces, getRandom } from "../Global";

export const Dice = (props) => {
  const [dices, setDices] = useState(null);
  const { numberDices, extraDices } = props;

  const createDicesComponentes = () => {
    let diceType = diceFaces;
    const result = range(numberDices).map((number) => {
      if (number >= numberDices - extraDices) {
        diceType = extDiceFaces;
      }
      return (
        <Die
          key={number}
          faces={diceType}
          isSelected={false}
          result={getRandom()}
          onClick={click}
        />
      );
    });
    return result;
  };

  const click = (eve) => {
    console.log({ eve });
  };
  useEffect(() => {
    setDices(createDicesComponentes());
  }, [numberDices, extraDices]);

  return (
    <div className="dices-wrapper">
      <ul className="dices">{dices && dices.map((dice) => dice)}</ul>
      <button className="btn">Lanzar</button>{" "}
    </div>
  );
};
