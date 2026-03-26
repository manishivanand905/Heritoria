const asyncHandler = require("../utils/asyncHandler");
const {
  buildAdminToken,
  validateAdminCredentials,
} = require("../utils/adminAuth");

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!validateAdminCredentials(username, password)) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  res.json({
    success: true,
    message: "Admin login successful",
    data: {
      token: buildAdminToken(),
      user: {
        username: process.env.TEMP_ADMIN_USERNAME || "admin",
        role: "admin",
      },
    },
  });
});

module.exports = {
  loginAdmin,
};

