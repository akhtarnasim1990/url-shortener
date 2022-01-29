const mongoose = require("mongoose");
const User = mongoose.model("user");

module.exports = (app) => {
  // Create a new User object

  app.post("/api/user/createUser", (req, res) => {
    console.log(req.body);
    const { name, email, dob } = req.body;
    new User({
      name: name,
      email: email,
      dob: dob,
    })
      .save()
      .then((response) => {
        console.log(response);
        return res.status(200).send({ sucess: response, type: "success" });
      })
      .catch((err) => {
        return res.send(err.message);
      });
  });

  // Fetch User by email

  app.post("/api/user/getUserByMail", (req, res) => {
    const { email } = req.body;

    User.findOne({ email: email })
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        } else {
          return res.status(404).send("Oops something went wrong!");
        }
      })
      .catch((err) => {
        return res.status(404).send(err.message);
      });
  });
};
