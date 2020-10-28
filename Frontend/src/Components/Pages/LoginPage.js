import React, { useState, useEffect } from "react";
import { usePlayersContext } from "../../Context/PlayersContext";
import { range, forIn } from "lodash";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const [numberPlayers, setNumberPlayers] = useState(0);
  const [namePlayers, setNamePlayers] = useState(null);

  const { setValues } = usePlayersContext();

  useEffect(() => {
    setValues({ numberPlayers, namePlayers });
  }, [numberPlayers, namePlayers]);

  const handleSubmitNames = (eve) => {
    eve.preventDefault();

    const inputs = eve.target.children;
    const names = [];

    forIn(inputs, (elem) => {
      if (elem.tagName === "INPUT") {
        names.push(elem.value);
      }
    });
    setNamePlayers(names);
  };

  return (
    <section className="start">
      <form>
        <select
          className={"btn"}
          name={"numberOfPlayers"}
          defaultValue={0}
          onChange={(event) => {
            setNumberPlayers(parseInt(event.target.value));
          }}
        >
          <option disabled value="0">
            Número de jugadores
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </form>

      {numberPlayers > 0 ? (
        <form onSubmit={handleSubmitNames}>
          {range(numberPlayers).map((i) => (
            <input type={"text"} defaultValue={`Monstruo ${i + 1}`} key={i} />
          ))}
          <>
            <button className={"btn"} type="submit">
              A Jugar
            </button>
            <p>
              Puede asignar un nombre para cada jugador. Por defecto será el que
              aparece en el campo
            </p>
          </>
        </form>
      ) : (
        <p>Selecciona numero de jugadores</p>
      )}
      {namePlayers && <Redirect exact to="/game" />}
    </section>
  );
};
export default LoginPage;
