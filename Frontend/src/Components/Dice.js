import React, { useEffect, useState } from "react";
import { random } from "lodash";

const getRandom = () => {
  return random(0, 5);
};

export const Dice = (props) => {
  const { faces } = props;
  const [resultFace, setResultFace] = useState(0);
  const [result, setResult] = useState(getRandom);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setResultFace(faces[result]);
  }, [result, selected]);

  const selectDice = () => {
    setSelected(!selected);
  };

  return (
    <li className={`selected${selected}`}>
      <img src={resultFace} alt="dice" onClick={selectDice} />
    </li>
  );
};
