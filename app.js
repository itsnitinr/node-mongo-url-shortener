require("dotenv").config();
const express = require("express");
const app = express();
const ShortUrl = require("./models/ShortUrl");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connecting to MongoDB
const connectDB = require("./config/db");
connectDB();

// Home page
app.get("/", async (req, res) => {
  try {
    // Get all shortened URLs
    const urls = await ShortUrl.find();
    res.render("index", { shortUrls: urls });
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

// Generate short URL
app.post("/short", async (req, res) => {
  try {
    // Create a new short URL
    const url = new ShortUrl({
      fullUrl: req.body.fullUrl,
    });
    // Save it to database
    await url.save();
    // Redirect to hompage
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    // Get shortened url from database
    const url = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    // If it doesn't exist, send 404
    if (!url) return res.sendStatus(404);
    // If it exists, increment count and redirect to fullUrl
    url.clicks++;
    await url.save();
    res.redirect(url.fullUrl);
  } catch (err) {
    console.error(err);
    res.send("Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
