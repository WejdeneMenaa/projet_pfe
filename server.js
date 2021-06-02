const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./server/models");
db.sequelize.sync();

require("./server/routes/utilisateur.routes")(app);
require("./server/routes/auth.routes")(app);

// set port, listen for requests
app.listen(3000, (req,res)=> {
  console.log('RUNNING');
});
