require("dotenv").config();
const express = require("express");
const app = express();
const ShortUrl = require("./models/ShortUrl");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Connecting to MongoDB
const connectDB = require("./config/db");
connectDB();

app.get("/", async (req, res) => {
  const urls = await ShortUrl.find();
  res.render("index", { shortUrls: urls });
});

app.post("/short", async (req, res) => {
  const url = new ShortUrl({
    fullUrl: req.body.fullUrl,
  });
  await url.save();
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const url = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
  if (!url) res.sendStatus(404);
  url.clicks++;
  await url.save();
  res.redirect(url.fullUrl);
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
