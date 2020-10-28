import React from "react";
import { Card } from "./Card";

export const SectionCards = () => {
  // TODO: Traer todas las cartas de la api
  return (
    <section className="section-cards">
      <div className="cards-wrapper game">
        {/*TODO:Mostrar 3 cartas del mazo, en caso de que queden suficientes cartas*/}
        <Card />
        <Card />
        <Card />
      </div>
      <div className="cards-wrapper discard">
        {/*TODO:Mostrar el mazo de cartas restantes y el mazo de descartes cuando haya descartes*/}
        <Card />
        <Card />
      </div>
    </section>
  );
};
