import React from "react";
import { Dices } from "./Dices";

export const Actions = () => {
  return (
    <section className="actions">
      <div className="buttons">
        <button className="btn">Lanzar</button>
        <button className="btn">Terminar Turno</button>
      </div>
      <Dices />
    </section>
  );
};
