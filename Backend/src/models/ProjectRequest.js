const mongoose = require("mongoose");

const projectRequestSchema = new mongoose.Schema(
  {
    requestType: {
      type: String,
      enum: ["benefitClaim", "siteVisit"],
      required: true,
    },
    projectId: {
      type: Number,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    builder: {
      type: String,
      trim: true,
      default: "",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: "",
    },
    preferredUnit: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    planId: {
      type: String,
      trim: true,
      default: "",
    },
    planName: {
      type: String,
      trim: true,
      default: "",
    },
    planPrice: {
      type: String,
      trim: true,
      default: "",
    },
    visitDate: {
      type: String,
      trim: true,
      default: "",
    },
    timeSlot: {
      type: String,
      trim: true,
      default: "",
    },
    guests: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "inProgress", "scheduled", "completed", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProjectRequest", projectRequestSchema);

