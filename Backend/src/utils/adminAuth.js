const buildAdminToken = () => {
  const username = process.env.TEMP_ADMIN_USERNAME || "admin";
  const password = process.env.TEMP_ADMIN_PASSWORD || "Heritoria@123";
  const salt = process.env.TEMP_ADMIN_TOKEN_SALT || "heritoria-admin-temporary";

  return Buffer.from(`${username}:${password}:${salt}`).toString("base64");
};

const validateAdminCredentials = (username, password) => {
  const expectedUsername = process.env.TEMP_ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.TEMP_ADMIN_PASSWORD || "Heritoria@123";

  return username === expectedUsername && password === expectedPassword;
};

module.exports = {
  buildAdminToken,
  validateAdminCredentials,
};

