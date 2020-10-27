import React from "react";

export const Monster = () => {
  return (
    <section className="monster">
      <p>Active monster</p>
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
