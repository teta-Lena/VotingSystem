const userroutes = require("./userRoutes");
const candidateroutes = require("./candidateRoutes");
const votesRoutes = require("./votes.routes");

const express = require("express");
const router = express.Router();

router.use("/u", userroutes);
router.use("/c", candidateroutes);
router.use("/v", votesRoutes);

module.exports = router;
