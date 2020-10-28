import React from "react";

export const Monster = (props) => {
  const { name } = props;

  return (
    <section className="monster">
      <p>{name}</p>
      <div></div>
      <section className="attributes">
        <div className="att heart">
          <div></div>
          <p>10</p>
        </div>
        <div className="att star">
          <div></div>
          <p>0</p>
        </div>
        <div className="att lightning">
          <div></div>
          <p>0</p>
        </div>
      </section>
    </section>
  );
};
