const mongoose = require("mongoose");

const membershipPlanSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    benefitAmount: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const membershipPlanSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "default",
      trim: true,
    },
    plans: {
      type: [membershipPlanSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MembershipPlanSettings",
  membershipPlanSettingsSchema
);
