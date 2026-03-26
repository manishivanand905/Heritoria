const express = require("express");
const {
  getInvestorLeads,
  createInvestorLead,
  updateInvestorStatus,
} = require("../controllers/investorController");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.post("/", createInvestorLead);
router.get("/", protectAdmin, getInvestorLeads);
router.patch("/:id/status", protectAdmin, updateInvestorStatus);

module.exports = router;
