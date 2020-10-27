import React from "react";
import { Card } from "./Card";

export const PlayerBoard = () => {
  return (
    <section className="player-board">
      <div className="cards-wrapper player-cards">
        <Card />
      </div>
    </section>
  );
};
