const ProjectRequest = require("../models/ProjectRequest");
const asyncHandler = require("../utils/asyncHandler");

const getProjectRequests = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.requestType) {
    query.requestType = req.query.requestType;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  const requests = await ProjectRequest.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: requests.length,
    data: requests,
  });
});

const createProjectRequest = asyncHandler(async (req, res) => {
  const request = await ProjectRequest.create({
    requestType: req.body.requestType,
    projectId: Number(req.body.projectId),
    projectName: req.body.projectName,
    builder: req.body.builder,
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    preferredUnit: req.body.preferredUnit,
    notes: req.body.notes,
    planId: req.body.planId,
    planName: req.body.planName,
    planPrice: req.body.planPrice,
    visitDate: req.body.visitDate,
    timeSlot: req.body.timeSlot,
    guests: req.body.guests,
  });

  res.status(201).json({
    success: true,
    message: "Project request created successfully",
    data: request,
  });
});

const updateProjectRequestStatus = asyncHandler(async (req, res) => {
  const request = await ProjectRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Project request not found");
  }

  request.status = req.body.status || request.status;
  await request.save();

  res.json({
    success: true,
    message: "Request status updated successfully",
    data: request,
  });
});

module.exports = {
  getProjectRequests,
  createProjectRequest,
  updateProjectRequestStatus,
};

