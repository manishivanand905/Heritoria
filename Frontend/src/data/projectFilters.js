export const budgetFilters = [
  { id: "all", label: "All Budgets", value: null },
  { id: "under1cr", label: "Under \u20b91 Cr", value: [0, 10000000] },
  { id: "1to2cr", label: "\u20b91 Cr - \u20b92 Cr", value: [10000000, 20000000] },
  { id: "2to3cr", label: "\u20b92 Cr - \u20b93 Cr", value: [20000000, 30000000] },
  { id: "above3cr", label: "Above \u20b93 Cr", value: [30000000, Infinity] },
];

export const statusFilters = [
  { id: "all", label: "All Status", value: null },
  { id: "ready", label: "Ready to Move", value: "Ready to Move" },
  {
    id: "construction",
    label: "Under Construction",
    value: "Under Construction",
  },
  { id: "prelaunch", label: "Pre-Launch", value: "Pre-Launch" },
];

export const getAreaFilters = (projects = []) => {
  const uniqueAreas = [...new Set(projects.map((project) => project.area).filter(Boolean))];

  return [
    { id: "all", label: "All Areas", value: null },
    ...uniqueAreas.map((area) => ({
      id: area.toLowerCase().replace(/\s+/g, "-"),
      label: area,
      value: area,
    })),
  ];
};
