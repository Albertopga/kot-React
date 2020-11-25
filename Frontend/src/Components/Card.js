import React from "react";
import imagen from "../Assets/Images/cards/Carta1.png";

export const Card = () => {
  //TODO: Recibir las props de la carta
  return (
    <div className="card">
      <img src={imagen} alt="" />
    </div>
  );
};
