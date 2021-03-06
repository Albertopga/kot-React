import React, { useEffect, useState } from "react";
import { PlayerBoard } from "../PlayerBoard";
import { Monsters } from "../Monsters";
import { Actions } from "../Acctions";
import { Board } from "../Board";
import { SectionCards } from "../SectionCards";
import { Link } from "react-router-dom";
import { Dice } from "../Dice";
import { buildRollManagerFresh } from "../../Services/roll-manager/creation";
import { DEFAULT_ROLL_MANAGER_SETTINGS } from "../../Global";
import { rollDice, toggleDie } from "../../Services/roll-manager/actions";

const GamePage = () => {
  const [diceManager, setDiceManager] = useState(
    buildRollManagerFresh(DEFAULT_ROLL_MANAGER_SETTINGS)
  );

  useEffect(() => {
    console.table(diceManager.state.dice);
  }, [diceManager]);

  const throwDice = () => {
    const res = rollDice(diceManager);
    setDiceManager(res);
  };
  const endTurn = () => {};

  const selectDie = (dieIndexToChange) => {
    setDiceManager(toggleDie(diceManager, dieIndexToChange));
  };

  return (
    <div className={"table"}>
      <PlayerBoard />
      <Actions throwDice={throwDice} endTurn={endTurn} />
      {diceManager.state.numberOfRolls > 0 && (
        <Dice
          dice={diceManager.state.dice}
          numberOfDice={diceManager.settings.numberOfDice}
          numberOfExtraDice={diceManager.settings.numberOfExtraDice}
          selectDie={selectDie}
        />
      )}
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
