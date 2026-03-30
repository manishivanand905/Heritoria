const dns = require("node:dns");
const mongoose = require("mongoose");

const DEFAULT_DB_NAME = "heritoria";
const DEFAULT_SERVER_SELECTION_TIMEOUT_MS = 10000;
const dnsServers = (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);
const isSrvMongoUri = (uri = "") => uri.startsWith("mongodb+srv://");
const extractDbName = (uri = "") => {
  const withoutQuery = uri.split("?")[0];
  return withoutQuery.slice(withoutQuery.lastIndexOf("/") + 1);
};

const formatMongoError = (error) => {
  const topology = error?.reason || error?.cause;
  const serverErrors = topology?.servers instanceof Map
    ? [...topology.servers.entries()]
        .map(([address, description]) => {
          const message = description?.error?.message;
          return message ? `${address}: ${message}` : null;
        })
        .filter(Boolean)
    : [];

  return serverErrors.length
    ? `${error.message} | ${serverErrors.join(" | ")}`
    : error.message;
};

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing. Set it in Backend/.env for local development or in your hosting provider environment variables for deployment.",
    );
  }

  const dbName = process.env.MONGODB_DB_NAME || extractDbName(mongoUri) || DEFAULT_DB_NAME;
  const serverSelectionTimeoutMS =
    Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) ||
    DEFAULT_SERVER_SELECTION_TIMEOUT_MS;

  if (isSrvMongoUri(mongoUri)) {
    dns.setServers(dnsServers);
  }

  try {
    await mongoose.connect(mongoUri, { dbName, serverSelectionTimeoutMS });
    console.log("MongoDB connected");
  } catch (error) {
    throw new Error(formatMongoError(error), { cause: error });
  }
};

module.exports = connectDB;
