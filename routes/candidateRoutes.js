const {
  getAllCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} = require("../controller/candidateController");
const admin = require("../middleware/adminMiddleware");
const auth = require("../middleware/authMiddleware");

var router = require("express").Router();

router.get("/", auth, getAllCandidates);

router.post("/create", auth, admin, createCandidate);

router.put("/:id", auth, admin, updateCandidate);

router.delete("/:id", auth, admin, deleteCandidate);

// app.use("/api/candidates", router);
module.exports = router;
