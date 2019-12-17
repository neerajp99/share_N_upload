const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const keys = require("./config/keys");

// Initialise express app
const app = express();

// Add body-parser middleware to get body details
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Add database connection
const db = keys.mongoURI;
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log("Database connected successfully!");
  })
  .catch(error => {
    console.log(error);
  });

// Add port
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
