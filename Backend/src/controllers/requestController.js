const ProjectRequest = require("../models/ProjectRequest");
const asyncHandler = require("../utils/asyncHandler");

const getNormalizedSubscriberStatus = (request) => {
  if (request.subscriberStatus) {
    return request.subscriberStatus;
  }

  if (request.requestType !== "benefitClaim") {
    return "";
  }

  if (["completed", "closed"].includes(request.status)) {
    return "expired";
  }

  return "notUsed";
};

const getProjectRequests = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.requestType) {
    query.requestType = req.query.requestType;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  const requests = await ProjectRequest.find(query).sort({ createdAt: -1 });
  const normalizedRequests = requests.map((request) => {
    const item = request.toObject();

    if (item.requestType === "benefitClaim") {
      item.subscriberStatus = getNormalizedSubscriberStatus(item);
    }

    return item;
  });

  res.json({
    success: true,
    count: normalizedRequests.length,
    data: normalizedRequests,
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
    subscriberStatus:
      req.body.requestType === "benefitClaim" ? "notUsed" : undefined,
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

  if (request.requestType === "benefitClaim") {
    const nextSubscriberStatus =
      req.body.subscriberStatus || getNormalizedSubscriberStatus(request);

    request.subscriberStatus = nextSubscriberStatus;

    if (nextSubscriberStatus === "expired") {
      request.usedAt = request.usedAt || new Date();
      request.expiredAt = request.expiredAt || new Date();
    } else {
      request.usedAt = null;
      request.expiredAt = null;
    }
  } else {
    request.status = req.body.status || request.status;
  }
  await request.save();

  res.json({
    success: true,
    message: "Request status updated successfully",
    data: {
      ...request.toObject(),
      subscriberStatus:
        request.requestType === "benefitClaim"
          ? getNormalizedSubscriberStatus(request)
          : undefined,
    },
  });
});

const updateProjectRequest = asyncHandler(async (req, res) => {
  const request = await ProjectRequest.findById(req.params.id);

  if (!request) {
    res.status(404);
    throw new Error("Project request not found");
  }

  request.fullName = req.body.fullName || request.fullName;
  request.phone = req.body.phone || request.phone;
  request.email = req.body.email !== undefined ? req.body.email : request.email;
  
  if (req.body.projectId) {
    request.projectId = Number(req.body.projectId);
    request.projectName = req.body.projectName || request.projectName;
    request.builder = req.body.builder !== undefined ? req.body.builder : request.builder;
  }

  if (req.body.planId) {
    request.planId = req.body.planId;
    request.planName = req.body.planName || request.planName;
    request.planPrice = req.body.planPrice || request.planPrice;
  }

  await request.save();

  res.json({
    success: true,
    message: "Request updated successfully",
    data: {
      ...request.toObject(),
      subscriberStatus:
        request.requestType === "benefitClaim"
          ? getNormalizedSubscriberStatus(request)
          : undefined,
    },
  });
});

module.exports = {
  updateProjectRequest,
  getProjectRequests,
  createProjectRequest,
  updateProjectRequestStatus,
};

