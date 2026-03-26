const mongoose = require("mongoose");

const benefitSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    budget: {
      type: String,
      required: true,
      trim: true,
    },
    budgetValue: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    bhk: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    amenities: {
      type: [String],
      default: [],
    },
    builder: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    possession: {
      type: String,
      required: true,
      trim: true,
    },
    priceRange: {
      type: String,
      required: true,
      trim: true,
    },
    unitTypes: {
      type: String,
      required: true,
      trim: true,
    },
    benefits: {
      type: [benefitSchema],
      default: [],
    },
    totalBenefitValue: {
      type: String,
      required: true,
      trim: true,
    },
    benefitsWorth: {
      type: String,
      required: true,
      trim: true,
    },
    locationAddress: {
      type: String,
      required: true,
      trim: true,
    },
    googleMapsLink: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);

