const Project = require("../models/Project");
const seedProjects = require("../data/seedProjects");

const seedDefaults = async () => {
  if (process.env.SEED_DEFAULT_PROJECTS === "false") {
    return;
  }

  const projectCount = await Project.countDocuments();

  if (projectCount > 0) {
    return;
  }

  await Project.insertMany(seedProjects);
  console.log("Default projects seeded");
};

module.exports = seedDefaults;

