const admin = (req, res, next) => {
  if (!(req.user.role == "admin"))
    return res.status(401).send({ message: "UNAUTHORIZED" });

  next();
};

module.exports = admin;
