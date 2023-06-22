const user = (req, res, next) => {
  if (!(req.user.userrole == "user"))
    return res.status(401).send({ message: "UNAUTHORIZED" });
  next();
};

module.exports = user;
