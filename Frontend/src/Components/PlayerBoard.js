import React from "react";
import { Card } from "./Card";
import { Monster } from "./Monter";

export const PlayerBoard = () => {
  return (
    <section className="player-board">
      {/*TODO: Esta sección se rellenará con las cartas y la tarjeta de monstruo activo*/}
      <div className="cards-wrapper player-cards">
        {/*TODO: Las cartas se irán añadiendo según el monstruo activo las adquiera y sean cartas permanentes*/}
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="active-monster">
        <Monster name={"monster proof"} />
      </div>
    </section>
  );
};
