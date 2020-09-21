require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");

// Connecting to MongoDB
(async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

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
