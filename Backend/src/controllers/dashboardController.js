const Project = require("../models/Project");
const InvestorLead = require("../models/InvestorLead");
const ProjectRequest = require("../models/ProjectRequest");
const asyncHandler = require("../utils/asyncHandler");

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
      },
      recentInvestors,
      recentRequests,
    },
  });
});

module.exports = {
  getDashboardSummary,
};

