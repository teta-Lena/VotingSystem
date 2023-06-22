const { User, validation, loginvalidation } = require("../model/User");
const bcryptjs = require("bcryptjs");
// const { TOKEN } = process.env;
const tokenService = require("../service/tokenService");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const { errors } = validation(req.body);
    if (errors) {
      return res
        .status(400)
        .send({ message: `Errros have been found ${errors.message}` });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email address is already in use" });
    }

    const salt = await bcryptjs.genSalt(10);
    req.body.password = await bcryptjs.hash(req.body.password, salt);

    const newUser = new User(req.body);
    const result = await newUser.save();

    return res.status(201).send({ data: result, sucess: true });
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
    // console.log(email);
    // console.log(user);
    // Compare the passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accesstoken = await tokenService.generateAuthTokens(user);

    return res.status(200).json({ token: accesstoken, user, success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" + error });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const result = await User.findOne({
      _id: req.user._id,
    });

    return res.status(201).send({
      message: "OK",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

exports.getUsers = async (req, res) => {
  try {
    // const filters = {};
    // const options = {
    //   limit: req.query.limit || 1,
    //   page: req.query.page || 1,
    // };
    // filters first param
    // const users = await User.paginate(filters, options);
    const users = await User.find({});
    if (users) {
      res.status(200).json({
        success: true,
        users,
      });
    } else {
      console.log("Failed to fetch all users");
    }
  } catch (e) {
    return res.status(500).send({ message: `Error encountered: ${e}` });
  }
};
