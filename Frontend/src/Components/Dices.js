import React, { useEffect, useState } from "react";
import { Dice } from "./Dice";
import { range } from "lodash";

export const Dices = (props) => {
  let [dices, setDices] = useState(null);
  const { numberDices } = props;
  //Todo: pk no me renderiza de nuevo, si cambio la propo que le paso desde el padre?

  const createDicesComponentes = () => {
    let result = [];
    range(numberDices).map((number) => {
      if (number >= 6) {
        result.push(<Dice key={number} type={"extra"} result={0} state={""} />);
      } else {
        result.push(
          <Dice key={number} type={"normal"} result={0} state={""} />
        );
      }
    });
    return result;
  };

  useEffect(() => {
    setDices(createDicesComponentes());
  }, []);

  return (
    <div className="dices-wrapper">
      <ul className="dices">{dices && dices.map((dice) => dice)}</ul>
    </div>
  );
};
