const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require('./routes/adminRoutes');
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { DB_URL } = process.env;
const votesRoutes = require("./routes/votes.routes");
const candidateRoutes = require("./routes/candidateRoutes");
const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/votes", votesRoutes);
app.use("/api/candidates", candidateRoutes);
// app.use('/api/admin', adminRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
