import React, { useEffect, useState } from "react";
import { diceFaces, extDiceFaces } from "../Global";

// type: ()normal, extra .Indica si es de los seis principales o es uno de los dos extras que se pueden ganar
// faces []: Indica el número de caras y sus correspondientes imágenes/valores
// rollState del dado: select, roll

export const Dice = (props) => {
  const [face, setFace] = useState(0);
  const [roll, setRoll] = useState(true);
  const { type, result } = props;
  let faces;

  useEffect(() => {
    if (type === "normal") {
      faces = diceFaces;
    } else {
      faces = extDiceFaces;
    }
    setFace(faces[result]);
  }, [result, roll]);

  if (roll) {
    return (
      <li className={""}>
        <img src={face} alt="dice" onClick={() => setRoll(!roll)} />
      </li>
    );
  } else {
    return (
      <li className={"selected"}>
        <img src={face} alt="dice" onClick={() => setRoll(!roll)} />
      </li>
    );
  }
};
