"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cardSchema = schema({
  image: { type: String, trim:true, lowercase:true },
  name: { type: String, required: true, trim:true, lowercase:true },
  cost: { type: Number, required: true, trim:true },
  kind: { type: String, enum: ['permanente','descartar'], required: true, trim:true, lowercase:true },
  text: {
    description: { type: String, required: true, trim:true, lowercase:true },
    effects: { type: String, trim:true, lowercase:true }
  },
});

// first param is the name of the model, the second params is the schema of the model
module.exports = mongoose.model("Card", cardSchema);
