const DEFAULT_MEMBERSHIP_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "Rs. 1,999",
    description: "Ideal for first-time buyers who want benefit access.",
    benefitAmount: "Rs 20K",
    features: [
      "Benefit unlock for this project",
      "Builder pricing support",
      "Documentation guidance",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "Rs. 4,999",
    description: "Best for families comparing units and negotiating.",
    benefitAmount: "Rs 1 Lakh",
    features: [
      "Everything in Basic",
      "Priority site visit coordination",
      "Shortlist review and negotiation help",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "Rs. 9,999",
    description: "White-glove support from selection to booking.",
    benefitAmount: "Rs 3 Lakhs",
    features: [
      "Everything in Premium",
      "Dedicated relationship manager",
      "Booking strategy and concierge support",
    ],
  },
];

module.exports = {
  DEFAULT_MEMBERSHIP_PLANS,
};
