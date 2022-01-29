const mongoose = require("mongoose");
const { Schema } = mongoose;

const userShema = new Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  dob: {
    type: String,
    default: "",
  },

  date: {
    type: String,
    default: new Date(),
  },
  lastModified: {
    type: String,
    default: Date.now(),
  },
});

mongoose.model("user", userShema);
