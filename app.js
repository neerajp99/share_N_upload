const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialise express app
const app = express();

// Add body-parser middleware to get body details
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// Add port
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
