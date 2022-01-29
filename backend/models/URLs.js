const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlShema = new Schema({
  longUrl: {
    type: String,
    default: "",
  },
  shortUrl: {
    type: String,
    default: "",
  },
  urlCode: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
  hits: {
    type: Number,
    default: 0,
  },
});

mongoose.model("urls", urlShema);
