"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const routes = require("./routes/card");
const port = 3901;
const url = "mongodb://localhost:27017/kot";

mongoose.set("useFindAndModify", false); // disable old mongoose methods
mongoose.Promise = global.Promise; // enable mongoose promesis
mongoose //create the connection with mongodb
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión realizada con exito");

    app.listen(port, () => {
      console.log(`servidor corriendo en http://localhost:${port}`);
    });
  });
