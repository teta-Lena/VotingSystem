const express = require("express");

const { createUser, Login } = require("../controller/userController");

const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
// //Route that requires authentication
// router.post("/vote", authenticate, (req, res) => {
//   // Handle the voting logic here
// });

module.exports = router;
