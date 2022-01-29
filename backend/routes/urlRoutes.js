const mongoose = require("mongoose");
const URLs = mongoose.model("urls");
const validUrl = require("valid-url");
const shortid = require("shortid");

module.exports = (app) => {
  app.post("/api/shortUrl", async (req, res) => {
    const { longUrl, email } = req.body;

    const baseUrl = "http:localhost:3000";
    if (!validUrl.isUri(baseUrl)) {
      return res.status(401).send("Invalid base URL");
    }

    const urlCode = shortid.generate();

    if (validUrl.isUri(longUrl)) {
      try {
        const shortUrl = baseUrl + "/" + urlCode;

        // invoking the Url model and saving to the DB
        const url = new URLs({
          longUrl,
          shortUrl,
          urlCode,
          email,
          createdAt: Date.now(),
          hits: 0,
        });
        await url.save();
        return res.send(url);
      } catch (err) {
        // exception handler
        console.log(err);
        res.status(500).send("Server Error");
      }
    } else {
      res.status(401).send("Invalid longUrl");
    }
  });

  // Redirect route

  app.post("/api/redirectRoute", async (req, res) => {
    const { urlCode } = req.body;

    let url = await URLs.findOne({ urlCode }).exec();
    if (url) {
      url.hits = url.hits + 1;
      url.save();
    }

    let url2 = await URLs.findOne({ urlCode }).exec();
    if (url2) {
      return res.status(200).send(url2);
    } else {
      return res.status(404).send("Invalid url!");
    }
  });

  // Fetch urls for single user
  app.post("/api/fetchUrl", async (req, res) => {
    const { email } = req.body;
    const result = await URLs.find({ email }).exec();

    if (result) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send("Invalid email!");
    }
  });
};
