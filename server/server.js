const express = require("express"),
  path = require("path"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  config = require("./config/db");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true }).then(
  () => {
    console.log("Database connection established");
  },
  err => {
    console.log("Error connecting to database: " + err);
  }
);

const palindromeUnitRoutes = require("./routes/palindrome");

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use("/palindromes", palindromeUnitRoutes);

const server = app.listen(port, function() {
  console.log("Listening on port: " + port);
});