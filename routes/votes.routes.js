const express = require("express");

const { getAllVotes, createVotes } = require("../controller/votesController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getAllVotes);
router.post("/", auth, createVotes);

module.exports = router;
