const mongoose = require("mongoose");
const express = require("express");
const app = express();
const keys = require("./config/dev");
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// Register models

require("./models/User");
require("./models/URLs");

// Connection to mongodb

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// header to be defined use   app.use(express.json());  it will be before router keep in mind
app.use(express.json());

// Register routes

app.use(cors(corsOptions));
app.use(bodyParser.json());

require("./routes/userRoutes")(app);
require("./routes/urlRoutes")(app);

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Port listening on", PORT);
});
