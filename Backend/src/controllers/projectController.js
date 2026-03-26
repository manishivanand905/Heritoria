const Project = require("../models/Project");
const asyncHandler = require("../utils/asyncHandler");

const getNextProjectId = async () => {
  const lastProject = await Project.findOne().sort({ id: -1 }).select("id");
  return lastProject ? lastProject.id + 1 : 1;
};

const normalizeBenefits = (benefits = []) =>
  benefits
    .filter((benefit) => benefit && benefit.title && benefit.description)
    .map((benefit, index) => ({
      id: Number(benefit.id) || index + 1,
      title: String(benefit.title).trim(),
      description: String(benefit.description).trim(),
      value: String(benefit.value || "").trim() || "Included",
      icon: String(benefit.icon || "inspection").trim(),
    }));

const normalizeAmenities = (amenities = []) =>
  amenities
    .filter(Boolean)
    .map((item) => String(item).trim())
    .filter(Boolean);

const buildProjectPayload = async (payload, existingProject = null) => {
  const projectId =
    payload.id !== undefined && payload.id !== null && payload.id !== ""
      ? Number(payload.id)
      : existingProject?.id || (await getNextProjectId());

  return {
    id: projectId,
    name: String(payload.name || "").trim(),
    location: String(payload.location || "").trim(),
    budget: String(payload.budget || "").trim(),
    budgetValue: Number(payload.budgetValue || 0),
    status: String(payload.status || "").trim(),
    area: String(payload.area || "").trim(),
    bhk: String(payload.bhk || "").trim(),
    size: String(payload.size || "").trim(),
    image: String(payload.image || "").trim(),
    featured: Boolean(payload.featured),
    amenities: normalizeAmenities(payload.amenities),
    builder: String(payload.builder || "").trim(),
    description: String(payload.description || "").trim(),
    possession: String(payload.possession || "").trim(),
    priceRange: String(payload.priceRange || "").trim(),
    unitTypes: String(payload.unitTypes || "").trim(),
    benefits: normalizeBenefits(payload.benefits),
    totalBenefitValue: String(payload.totalBenefitValue || "").trim(),
    benefitsWorth: String(payload.benefitsWorth || "").trim(),
    locationAddress: String(payload.locationAddress || "").trim(),
    googleMapsLink: String(payload.googleMapsLink || "").trim(),
  };
};

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
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

