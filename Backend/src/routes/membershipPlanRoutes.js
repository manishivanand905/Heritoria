const express = require("express");
const {
  getMembershipPlans,
  updateMembershipPlans,
} = require("../controllers/membershipPlanController");
const { protectAdmin } = require("../middlewares/adminAuthMiddleware");

const router = express.Router();

router.get("/", getMembershipPlans);
router.put("/", protectAdmin, updateMembershipPlans);

module.exports = router;
