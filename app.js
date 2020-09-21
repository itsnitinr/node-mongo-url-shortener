require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World ! - Root Route");
});

app.get("/short", (req, res) => {
  res.send("Hello World ! - Short Route");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
