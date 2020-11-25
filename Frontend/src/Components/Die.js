import React from "react";
import { toggleDie } from "../Services/roll-manager/actions";

export const Die = (props) => {
  const { state, faces, onClick, dieIndex } = props;

  const selectDie = () => {
    onClick(dieIndex);
  };

  return (
    <li className={`selected${state.isSelected}`}>
      <img src={faces[state.value]} alt="dice" onClick={selectDie} />
    </li>
  );
};
