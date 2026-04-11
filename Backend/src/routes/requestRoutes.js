const express = require("express");
const {
  getProjectRequests,
  createProjectRequest,
  updateProjectRequest,
  updateProjectRequestStatus,
} = require("../controllers/requestController");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.post("/", createProjectRequest);
router.get("/", protectAdmin, getProjectRequests);
router.put("/:id", protectAdmin, updateProjectRequest);
router.patch("/:id/status", protectAdmin, updateProjectRequestStatus);

module.exports = router;
