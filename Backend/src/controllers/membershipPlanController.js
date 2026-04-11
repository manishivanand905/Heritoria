const MembershipPlanSettings = require("../models/MembershipPlanSettings");
const { DEFAULT_MEMBERSHIP_PLANS } = require("../constants/defaultMembershipPlans");
const asyncHandler = require("../utils/asyncHandler");

const normalizePlanId = (value = "", fallback = "plan") => {
  const normalizedValue = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalizedValue || fallback;
};

const normalizeMembershipPlans = (plans = []) =>
  plans
    .filter(
      (plan) =>
        plan &&
        plan.name &&
        plan.price &&
        plan.description &&
        plan.benefitAmount
    )
    .map((plan, index) => ({
      id: normalizePlanId(plan.id || plan.name, `plan-${index + 1}`),
      name: String(plan.name).trim(),
      price: String(plan.price).trim(),
      description: String(plan.description).trim(),
      benefitAmount: String(plan.benefitAmount).trim(),
      features: Array.isArray(plan.features)
        ? plan.features.map((feature) => String(feature || "").trim()).filter(Boolean)
        : [],
    }))
    .filter((plan) => plan.features.length > 0);

const getMembershipPlans = asyncHandler(async (req, res) => {
  const settings = await MembershipPlanSettings.findOne({ key: "default" })
    .select("plans -_id")
    .lean();

  res.json({
    success: true,
    data:
      settings?.plans?.length > 0 ? settings.plans : DEFAULT_MEMBERSHIP_PLANS,
  });
});

const updateMembershipPlans = asyncHandler(async (req, res) => {
  const plans = normalizeMembershipPlans(req.body?.plans);

  if (!plans.length) {
    res.status(400);
    throw new Error("At least one membership plan is required.");
  }

  const settings = await MembershipPlanSettings.findOneAndUpdate(
    { key: "default" },
    { $set: { plans } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }
  );

  res.json({
    success: true,
    message: "Membership plans updated successfully",
    data: settings.plans,
  });
});

module.exports = {
  getMembershipPlans,
  updateMembershipPlans,
};
