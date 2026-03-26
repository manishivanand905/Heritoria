const express = require("express");
const { getDashboardSummary } = require("../controllers/dashboardController");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.get("/summary", protectAdmin, getDashboardSummary);

module.exports = router;
