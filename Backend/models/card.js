"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cardSchema = schema({
  image: String,
  name: String,
  cost: Number,
  kind: String,
  text: {
    description: String,
    effects: String,
  },
});

// first param is the name of the model, the second params is the schema of the model
module.exports = mongoose.model("Card", cardSchema);
