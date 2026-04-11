const Project = require("../models/Project");
const AmenityOption = require("../models/AmenityOption");
const asyncHandler = require("../utils/asyncHandler");

const DEFAULT_AMENITIES = [
  "Swimming Pool",
  "Clubhouse",
  "Gym",
  "Tennis Court",
  "Kids Play Area",
  "Jogging Track",
  "Spa",
  "2 Car Parking",
  "24hr Security",
  "Full Power Backup",
];

const getNextProjectId = async () => {
  const lastProject = await Project.findOne().sort({ id: -1 }).select("id");
  return lastProject ? lastProject.id + 1 : 1;
};

const normalizeAmenityName = (value = "") =>
  String(value)
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const stripCurrencySymbols = (value = "") =>
  String(value)
    .replace(/\u20B9/g, "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeCurrencyLabel = (value = "") => {
  const normalizedValue = stripCurrencySymbols(value);

  if (!normalizedValue) {
    return "";
  }

  return normalizedValue.toLowerCase() === "included"
    ? "Included"
    : `₹${normalizedValue}`;
};

const normalizePriceRange = (value = "") => {
  const normalizedValue = stripCurrencySymbols(value);

  if (!normalizedValue) {
    return "";
  }

  if (/onwards$/i.test(normalizedValue)) {
    const baseValue = normalizedValue.replace(/\s+onwards$/i, "").trim();
    return `₹${baseValue} onwards`;
  }

  const [fromValue, toValue] = normalizedValue.split(/\s*-\s*/).map((item) => item.trim());

  if (fromValue && toValue) {
    return `₹${fromValue} - ₹${toValue}`;
  }

  return `₹${normalizedValue}`;
};

const normalizeBenefits = (benefits = []) =>
  benefits
    .filter((benefit) => benefit && benefit.title && benefit.description)
    .map((benefit, index) => ({
      id: index + 1,
      title: String(benefit.title).trim(),
      description: String(benefit.description).trim(),
      value: normalizeCurrencyLabel(String(benefit.value || "").trim()) || "Included",
      icon: String(benefit.icon || "inspection").trim(),
    }));

const normalizeAmenities = (amenities = []) =>
  [...new Set(
    amenities
      .filter(Boolean)
      .map((item) => normalizeAmenityName(item))
      .filter(Boolean)
  )];

const syncAmenityCatalog = async (amenities = []) => {
  if (!amenities.length) {
    return;
  }

  await AmenityOption.bulkWrite(
    amenities.map((name) => ({
      updateOne: {
        filter: { name },
        update: { $setOnInsert: { name } },
        upsert: true,
      },
    })),
    { ordered: false }
  );
};

const buildProjectPayload = async (payload, existingProject = null) => {
  const normalizedBenefits = normalizeBenefits(payload.benefits);
  const normalizedAmenities = normalizeAmenities(payload.amenities);

  if (normalizedBenefits.length < 2) {
    const error = new Error("At least two benefits are required.");
    error.statusCode = 400;
    throw error;
  }

  const projectId = existingProject?.id || (await getNextProjectId());
  await syncAmenityCatalog(normalizedAmenities);

  return {
    id: projectId,
    name: String(payload.name || "").trim(),
    location: String(payload.location || "").trim(),
    budget: normalizeCurrencyLabel(payload.budget),
    budgetValue: Number(payload.budgetValue || 0),
    status: String(payload.status || "").trim(),
    area: String(payload.area || "").trim(),
    bhk: String(payload.bhk || "").trim(),
    size: String(payload.size || "").trim(),
    image: String(payload.image || "").trim(),
    featured: Boolean(payload.featured),
    amenities: normalizedAmenities,
    builder: String(payload.builder || "").trim(),
    description: String(payload.description || "").trim(),
    possession: String(payload.possession || "").trim(),
    priceRange: normalizePriceRange(payload.priceRange),
    unitTypes: String(payload.unitTypes || "").trim(),
    benefits: normalizedBenefits,
    totalBenefitValue: normalizeCurrencyLabel(payload.totalBenefitValue),
    benefitsWorth: normalizeCurrencyLabel(payload.benefitsWorth),
    locationAddress: String(payload.locationAddress || "").trim(),
    googleMapsLink: String(payload.googleMapsLink || "").trim(),
  };
};

const getAmenityOptions = asyncHandler(async (req, res) => {
  const [savedAmenities, projectAmenities] = await Promise.all([
    AmenityOption.find().sort({ name: 1 }).select("name -_id").lean(),
    Project.distinct("amenities"),
  ]);

  const amenityOptions = [...new Set(
    [...DEFAULT_AMENITIES, ...savedAmenities.map((item) => item.name), ...projectAmenities]
      .map((item) => normalizeAmenityName(item))
      .filter(Boolean)
  )].sort((left, right) => left.localeCompare(right));

  res.json({
    success: true,
    data: amenityOptions,
  });
});

const createAmenityOption = asyncHandler(async (req, res) => {
  const name = normalizeAmenityName(req.body?.name);

  if (name.length < 2) {
    res.status(400);
    throw new Error("Amenity name must be at least 2 characters.");
  }

  const amenity = await AmenityOption.findOneAndUpdate(
    { name },
    { $setOnInsert: { name } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({
    success: true,
    message: "Amenity added successfully",
    data: amenity,
  });
});

const getProjects = asyncHandler(async (req, res) => {
  const { featured, search, status, area } = req.query;
  const query = {};

  if (featured === "true") {
    query.featured = true;
  }

  if (status) {
    query.status = status;
  }

  if (area) {
    query.area = area;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { builder: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  const projects = await Project.find(query).sort({ id: 1 });

  res.json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ id: Number(req.params.id) });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json({
    success: true,
    data: project,
  });
});

const createProject = asyncHandler(async (req, res) => {
  const payload = await buildProjectPayload(req.body);
  const project = await Project.create(payload);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ id: Number(req.params.id) });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const payload = await buildProjectPayload(req.body, project);
  Object.assign(project, payload);
  await project.save();

  res.json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndDelete({ id: Number(req.params.id) });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json({
    success: true,
    message: "Project deleted successfully",
  });
});

module.exports = {
  getAmenityOptions,
  getProjects,
  getProjectById,
  createAmenityOption,
  createProject,
  updateProject,
  deleteProject,
};
