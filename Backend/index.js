"use strict";

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/kot";

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión realizada con exito");
  });
