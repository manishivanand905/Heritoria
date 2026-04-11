const Project = require("../models/Project");
const InvestorLead = require("../models/InvestorLead");
const ProjectRequest = require("../models/ProjectRequest");
const asyncHandler = require("../utils/asyncHandler");

const benefitClaimBaseFilter = { requestType: "benefitClaim" };
const subscribedFilter = {
  requestType: "benefitClaim",
  $or: [{ subscriberStatus: "subscribed" }, { subscriberStatus: { $exists: false } }],
};
const notUsedFilter = {
  requestType: "benefitClaim",
  subscriberStatus: "notUsed",
};
const expiredFilter = {
  requestType: "benefitClaim",
  $or: [
    { subscriberStatus: "expired" },
    { subscriberStatus: { $exists: false }, status: { $in: ["completed", "closed"] } },
  ],
};

const getDashboardSummary = asyncHandler(async (req, res) => {
  const [
    totalProjects,
    featuredProjects,
    totalInvestors,
    openInvestorLeads,
    totalRequests,
    newRequests,
    siteVisitRequests,
    benefitRequests,
    totalSubscribers,
    subscribedSubscribers,
    notUsedSubscribers,
    expiredSubscribers,
    recentInvestors,
    recentRequests,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    InvestorLead.countDocuments(),
    InvestorLead.countDocuments({ status: { $in: ["new", "contacted"] } }),
    ProjectRequest.countDocuments(),
    ProjectRequest.countDocuments({ status: "new" }),
    ProjectRequest.countDocuments({ requestType: "siteVisit" }),
    ProjectRequest.countDocuments({ requestType: "benefitClaim" }),
    ProjectRequest.countDocuments(benefitClaimBaseFilter),
    ProjectRequest.countDocuments(subscribedFilter),
    ProjectRequest.countDocuments(notUsedFilter),
    ProjectRequest.countDocuments(expiredFilter),
    InvestorLead.find().sort({ createdAt: -1 }).limit(5),
    ProjectRequest.find().sort({ createdAt: -1 }).limit(5),
  ]);

  res.json({
    success: true,
    data: {
      totals: {
        totalProjects,
        featuredProjects,
        totalInvestors,
        openInvestorLeads,
        totalRequests,
        newRequests,
        siteVisitRequests,
        benefitRequests,
        totalSubscribers,
        subscribedSubscribers,
        notUsedSubscribers,
        expiredSubscribers,
      },
      recentInvestors,
      recentRequests,
    },
  });
});

module.exports = {
  getDashboardSummary,
};
