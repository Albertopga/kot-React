"use strict";
const validator = require("validator");
const card = require("../models/card");

const cardController = {
  save: (req, res) => {
    let params = req.body;
    return res.status(200).send({
      message: "saved card",
    });
  },
};

module.exports = cardController;
