"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const port = 3901;

// //deshabilita metods antiguos de mongoose
mongoose.set("useFindAndModify", false);

// activamos promesas de mongoose
mongoose.Promise = global.Promise;"use strict";

//crear la conexión a mongodb por medio de una promesa
const url = "mongodb://localhost:27017/kot";

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión realizada con exito");
  });
