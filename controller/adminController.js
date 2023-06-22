const User = require("../models/User");

// Controller for registering a candidate
async function registerCandidate(req, res) {
  try {
    const { email, firstName, lastName, phone, password } = req.body;

    const candidate = new User({
      email,
      firstName,
      lastName,
      phone,
      password,
      role: "candidate", // Assigning the role as 'voter' for candidate
    });

    await candidate.save();

    res.status(201).json({ message: "Candidate registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerCandidate,
};
