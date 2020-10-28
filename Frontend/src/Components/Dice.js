import React, { useEffect, useState } from "react";
import { random } from "lodash";
import { diceFaces, extDiceFaces } from "../Global";

// type: ()normal, extra .Indica si es de los seis principales o es uno de los dos extras que se pueden ganar
// faces []: Indica el número de caras y sus correspondientes imágenes/valores
// Estados del dado: seleccionado, no seleccionado

export const Dice = (props) => {
  const [face, setFace] = useState(0);
  const { type, result, state } = props;

  let faces;
  useEffect(() => {
    if (type === "normal") {
      faces = diceFaces;
    } else {
      faces = extDiceFaces;
    }
    setFace(faces[result]);
  }, []);

  return (
    <li className={state}>
      <img src={face} alt="dice" />
    </li>
  );
};
