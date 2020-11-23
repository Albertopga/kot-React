import React, { useState } from "react";

export const Die = (props) => {
  const { value, isSelected, faces, onClick, dieIndex } = props;
  const [selected, setSelected] = useState(isSelected);

  const selectDice = () => {
    setSelected(!selected);
    onClick(dieIndex);
  };

  return (
    <li className={`selected${selected}`}>
      <img src={faces[value]} alt="dice" onClick={selectDice} />
    </li>
  );
};
