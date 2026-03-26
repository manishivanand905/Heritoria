const InvestorLead = require("../models/InvestorLead");
const asyncHandler = require("../utils/asyncHandler");

const getInvestorLeads = asyncHandler(async (req, res) => {
  const query = {};

  if (req.query.status) {
    query.status = req.query.status;
  }

  const investors = await InvestorLead.find(query).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: investors.length,
    data: investors,
  });
});

const createInvestorLead = asyncHandler(async (req, res) => {
  const investor = await InvestorLead.create({
    fullName: req.body.fullName,
    phone: req.body.phone,
    email: req.body.email,
    budget: req.body.budget,
    timeline: req.body.timeline,
    notes: req.body.notes,
  });

  res.status(201).json({
    success: true,
    message: "Investor request captured successfully",
    data: investor,
  });
});

const updateInvestorStatus = asyncHandler(async (req, res) => {
  const investor = await InvestorLead.findById(req.params.id);

  if (!investor) {
    res.status(404);
    throw new Error("Investor lead not found");
  }

  investor.status = req.body.status || investor.status;
  await investor.save();

  res.json({
    success: true,
    message: "Investor status updated successfully",
    data: investor,
  });
});

module.exports = {
  getInvestorLeads,
  createInvestorLead,
  updateInvestorStatus,
};

