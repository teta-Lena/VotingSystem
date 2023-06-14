const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/VotingBackend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Routes
app.use("/api/users", userRoutes);
// app.use('/api/admin', adminRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
