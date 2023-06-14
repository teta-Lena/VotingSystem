const { User, validation } = require("../model/User");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const { errors } = validation(req.body);
    if (errors) {
      console.log("here error");
      return res
        .status(400)
        .send({ message: `Errros have been found ${errors.message}` });
    }

    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User(req.body);
    const result = await newUser.save();

    return res.status(201).send({ message: result });
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
