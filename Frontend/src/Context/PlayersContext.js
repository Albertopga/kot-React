import React, { useContext, useState, useMemo } from "react";

const PlayersContext = React.createContext({
  numberPlayers: 0,
  namePlayers: [],
  setValues: (_objWithNumAndNamePlayers) => {},
});

export const PlayersContextWrapper = ({ children }) => {
  const [numberPlayers, setNumPlayers] = useState(0);
  const [namePlayers, setNamePlayers] = useState([]);
  const value = useMemo(
    () => ({
      numberPlayers,
      namePlayers,
      setValues: ({ numberPlayers, namePlayers }) => {
        setNumPlayers(numberPlayers);
        setNamePlayers(namePlayers);
      },
    }),
    [numberPlayers, namePlayers, setNumPlayers, setNamePlayers]
  );

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  );
};

export const usePlayersContext = () => {
  return useContext(PlayersContext);
};
