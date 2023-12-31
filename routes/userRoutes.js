const express = require("express");

const {
  createUser,
  Login,
  getUsers,
  getCurrentUser,
} = require("../controller/userController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
router.get("/users", getUsers);
// //Route that requires authentication
// router.post("/vote", authenticate, (req, res) => {
//   // Handle the voting logic here
// });

router.get("/", auth, getCurrentUser);

module.exports = router;
