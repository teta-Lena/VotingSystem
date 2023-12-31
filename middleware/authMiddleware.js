const jwt = require("jsonwebtoken");
const { User } = require("../model/User");

const auth = async (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).send("UNAUTHORIZED .. Log in first");
  //header on the frontend
  var token = req.header("Authorization").trim();
  // console.log(token, "the token");
  if (!token) return res.status(401).send("UNAUTHORIZED ... Log in first");

  try {
    token = token.replace("Bearer", "").trim();
    let user = jwt.verify(token, process.env.TOKEN.trim());
    // console.log(user);
    const userInfo = await User.findById(user.userId);
    delete userInfo.password;
    req.user = userInfo;
    next();
  } catch (e) {
    return res.status(500).send({ message: `Error ${e}` });
  }
};

module.exports = auth;
