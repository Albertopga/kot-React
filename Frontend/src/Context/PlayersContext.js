import React, { useContext, useState, useMemo } from "react";

const PlayersContext = React.createContext({
  numPlayers: 0,
  namePlayers: [],
  setValues: (_objWithNumAndNamePlayers) => {},
});

export const PlayersContextWrapper = ({ children }) => {
  const [numPlayers, setNumPlayers] = useState(0);
  const [namePlayers, setNamePlayers] = useState([]);

  const value = useMemo(
    () => ({
      numPlayers,
      namePlayers,
      setValues: ({ numPlayers, namePlayers }) => {
        setNumPlayers(numPlayers);
        setNamePlayers(namePlayers);
      },
    }),
    [numPlayers, namePlayers, setNumPlayers, setNamePlayers]
  );

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  return useContext(PlayersContext);
};
