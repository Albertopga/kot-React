import React from "react";
import { Dice } from "./Dice";

export const Dices = () => {
  return (
    <div className="dices-wrapper">
      <ul className="dices">
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
        <Dice />
      </ul>
    </div>
  );
};
