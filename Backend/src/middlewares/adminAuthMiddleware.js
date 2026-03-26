const { buildAdminToken } = require("../utils/adminAuth");

const protectAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : "";

  if (!token || token !== buildAdminToken()) {
    res.status(401);
    next(new Error("Admin authorization required"));
    return;
  }

  req.adminUser = {
    username: process.env.TEMP_ADMIN_USERNAME || "admin",
    role: "admin",
  };
  next();
};

module.exports = {
  protectAdmin,
};

