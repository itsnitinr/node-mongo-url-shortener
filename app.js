require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    helloText: "Hello World",
  });
});

app.get("/short", (req, res) => {
  res.send("Hello World ! - Short Route");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
