import React, { useEffect, useState } from "react";

export const Die = (props) => {
  const { faces, isSelected, result, onClick } = props;
  const [selected, setSelected] = useState(isSelected);

  const selectDice = () => {
    setSelected(!selected);
    onClick(props);
  };

  return (
    <li className={`selected${selected}`}>
      <img src={faces[result]} alt="dice" onClick={selectDice} />
    </li>
  );
};
