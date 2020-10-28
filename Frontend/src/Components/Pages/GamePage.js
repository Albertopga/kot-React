import React from "react";
import { PlayerBoard } from "../PlayerBoard";
import { Monsters } from "../Monsters";
import { Actions } from "../Acctions";
import { Board } from "../Board";
import { SectionCards } from "../SectionCards";

const GamePage = () => {
  return (
    <div className={"table"}>
      <PlayerBoard />
      <Actions />
      <button className="btn exit">Salir</button>
      <Monsters />
      <Board />
      <SectionCards />
    </div>
  );
};

export default GamePage;
