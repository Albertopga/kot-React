import React from "react";
import { PlayerBoard } from "../PlayerBoard";
import { Monsters } from "../Monsters";
import { Actions } from "../Acctions";
import { Board } from "../Board";
import { SectionCards } from "../SectionCards";
import { Link } from "react-router-dom";

const GamePage = () => {
  return (
    <div className={"table"}>
      <PlayerBoard />
      <Actions />
      <Link to={"/"} className={"btn exit"}>
        Salir
      </Link>
      <Monsters />
      <Board />
      <SectionCards />
    </div>
  );
};

export default GamePage;
