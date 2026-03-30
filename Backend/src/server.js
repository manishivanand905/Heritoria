require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");
const seedDefaults = require("./utils/seedDefaults");

const PORT = process.env.PORT || 5000;
const DB_RETRY_DELAY_MS = Number(process.env.DB_RETRY_DELAY_MS) || 10000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handleStartupError = async (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other server or change PORT in Backend/.env.`);
  } else {
    console.error("FULL ERROR:", error);
  }

  try {
    await mongoose.disconnect();
  } catch (disconnectError) {
    console.error("Failed to close MongoDB connection:", disconnectError.message);
  }

  process.exit(1);
};

const initializeDatabase = async () => {
  let attempt = 1;

  while (true) {
    try {
      console.log(`Connecting to database (attempt ${attempt})...`);
      await connectDB();

      console.log("Seeding defaults...");
      await seedDefaults();
      console.log("Database initialization complete");
      return;
    } catch (error) {
      console.error(
        `Database initialization failed on attempt ${attempt}: ${error.message}`,
      );

      try {
        await mongoose.disconnect();
      } catch (disconnectError) {
        console.error("Failed to reset MongoDB connection:", disconnectError.message);
      }

      attempt += 1;
      console.log(`Retrying database connection in ${DB_RETRY_DELAY_MS / 1000} seconds...`);
      await delay(DB_RETRY_DELAY_MS);
    }
  }
};

const startServer = async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", handleStartupError);
    initializeDatabase().catch(handleStartupError);
  } catch (error) {
    await handleStartupError(error);
  }
};

startServer();
