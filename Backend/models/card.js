"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cardSchema = schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  kind: { type: String, required: true },
  text: {
    description: { type: String, required: true },
    effects: String,
  },
});

// first param is the name of the model, the second params is the schema of the model
module.exports = mongoose.model("Card", cardSchema);
