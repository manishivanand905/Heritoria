const dns = require("node:dns");
const mongoose = require("mongoose");

const DEFAULT_DB_NAME = "heritoria";
const DEFAULT_SERVER_SELECTION_TIMEOUT_MS = 10000;

const getMongoUri = () => process.env.MONGO_URI || process.env.MONGODB_URI;

const getDbNameFromUri = (uri = "") => {
  const withoutQuery = uri.split("?")[0];
  return withoutQuery.slice(withoutQuery.lastIndexOf("/") + 1);
};

const connectDB = async () => {
  try {
    const mongoUri = getMongoUri();

    if (!mongoUri) {
      throw new Error("Mongo connection URI is missing. Set MONGO_URI or MONGODB_URI.");
    }

    const dbName =
      process.env.MONGODB_DB_NAME || getDbNameFromUri(mongoUri) || DEFAULT_DB_NAME;
    const serverSelectionTimeoutMS =
      Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) ||
      DEFAULT_SERVER_SELECTION_TIMEOUT_MS;

    if (mongoUri.startsWith("mongodb+srv://")) {
      const dnsServers = (process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1")
        .split(",")
        .map((server) => server.trim())
        .filter(Boolean);

      dns.setServers(dnsServers);
    }

    await mongoose.connect(mongoUri, { dbName, serverSelectionTimeoutMS });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB CONNECTION ERROR:", error.message);
    throw error;
  }
};

module.exports = connectDB;
