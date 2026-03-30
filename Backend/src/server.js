require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const connectDB = require("./config/db");
const seedDefaults = require("./utils/seedDefaults");

const PORT = process.env.PORT || 5000;

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

const startServer = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Seeding defaults...");
    await seedDefaults();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", handleStartupError);
  } catch (error) {
    await handleStartupError(error);
  }
};

startServer();
