import React from "react";
import { usePlayersContext } from "../Context/PlayersContext";
import { range } from "lodash";
import { Monster } from "./Monter";

export const Monsters = () => {
  const { numberPlayers, namePlayers } = usePlayersContext();

  return (
    <section className="monsters">
      {range(numberPlayers).map((index) => {
        return <Monster key={index} name={namePlayers[index]} />;
      })}
    </section>
  );
};
