import React from "react";
import { toggleDie } from "../Services/roll-manager/actions";

export const Die = (props) => {
  const { state, faces, onClick, dieIndex, data } = props;

  const selectDie = () => {
    onClick(toggleDie(data, dieIndex));
  };

  return (
    <li className={`selected${state.isSelected}`}>
      <img src={faces[state.value]} alt="dice" onClick={selectDie} />
    </li>
  );
};
