const express = require("express");

const { createUser, Login } = require("../controller/userController");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);

module.exports = router;
