import React, { useState } from "react";
import { Dices } from "./Dices";

export const Actions = () => {
  const [dicesRoll, setDicesRoll] = useState("false");

  const rollDices = () => {};

  return (
    <section className="actions">
      <div className="buttons">
        <button className="btn">Terminar Turno</button>
      </div>
      <Dices numberDices={8} rollDices={dicesRoll} />
    </section>
  );
};
