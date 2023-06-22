const user = (req, res, next) => {
  if (!(req.user.role == "user"))
    return res.status(403).send({ message: "UNAUTHORIZED TO DO THIS" });
  next();
};

module.exports = user;
