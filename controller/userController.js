const { User, validation, loginvalidation } = require("../model/User");
const bcryptjs = require("bcryptjs");
// const { TOKEN } = process.env;
const jwt = require("jsonwebtoken");
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
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
// User login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { errors } = loginvalidation(req.body);

    if (errors) {
      return res.status(400).send({ message: errors.message });
    }

    // console.log("Here");
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    console.log(email);
    console.log(user);
    // Compare the passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "T18LX03NA05", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" + error });
  }
};
