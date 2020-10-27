import React from "react";
import { usePlayersContext } from "../Context/PlayersContext";

export const Monsters = () => {
  const { numberPlayers, namePlayers } = usePlayersContext();
  debugger;
  return (
    <div className="active-monster">
      {/*TODO:Ha de recibir el número y nombre de los jugadores y por cada uno de ellos crear un componente <Monster>*/}
    </div>
  );
};
