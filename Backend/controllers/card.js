"use strict";

const controller = {
  prueba: (rew, res) => {
    return res.status(200).send({
      message: "prueba realizada",
    });
  },
};

module.exports = controller;
