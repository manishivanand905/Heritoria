const express = require("express");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.get("/", getProjects);
router.post("/", protectAdmin, createProject);
router.get("/:id", getProjectById);
router.put("/:id", protectAdmin, updateProject);
router.delete("/:id", protectAdmin, deleteProject);

module.exports = router;
