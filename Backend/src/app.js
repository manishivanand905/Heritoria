const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const projectRoutes = require("./routes/projectRoutes");
const investorRoutes = require("./routes/investorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

const defaultOrigins = ["http://localhost:3000", "https://heritoria.vercel.app"];
const envOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Heritoria backend is running",
    api: "/api/health",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Heritoria API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/investors", investorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
