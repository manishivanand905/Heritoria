const dns = require("node:dns");
const mongoose = require("mongoose");

const DEFAULT_DB_NAME = "heritoria";
const dnsServers = (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);
const extractDbName = (uri = "") => {
  const withoutQuery = uri.split("?")[0];
  return withoutQuery.slice(withoutQuery.lastIndexOf("/") + 1);
};

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is missing in Backend/.env");
  }

  const dbName = process.env.MONGODB_DB_NAME || extractDbName(mongoUri) || DEFAULT_DB_NAME;

  dns.setServers(dnsServers);
  await mongoose.connect(mongoUri, { dbName });
  console.log("MongoDB connected");
};

module.exports = connectDB;
