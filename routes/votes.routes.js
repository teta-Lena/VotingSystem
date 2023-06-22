const { getAllVotes, createVotes } = require("../controller/votesController");
const { auth } = require("../middleware/authMiddleware");

module.exports = (app) => {
  var router = require("express").Router();

  router.get("/", auth, getAllVotes);

  router.post("/", auth, createVotes);

  //   app.use("/api/votes", router);
  module.exports = router;
};
