import React from "react";
import { PlayerBoard } from "../PlayerBoard";
import { Monsters } from "../Monsters";

const GamePage = () => {
  return (
    <div className={"table"}>
      <PlayerBoard />
      <Monsters />
    </div>
  );
};

export default GamePage;
