import React from "react";

export const Actions = (props) => {
  const { throwDice, endTurn } = { ...props };

  return (
    <section className="actions">
      <div className="buttons">
        <button className="btn" onClick={endTurn}>
          Terminar Turno
        </button>
        <button className="btn" onClick={throwDice}>
          Lanzar
        </button>{" "}
      </div>
    </section>
  );
};
