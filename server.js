const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const categoryRoutes = require("./routes/categories");
const reportRoutes = require("./routes/reports");
const searchRoutes = require("./routes/search");
const ratingRoutes = require("./routes/ratings");
const locationRoutes = require("./routes/locations");
const legalPolicyRoutes = require("./routes/legalPolicies");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", categoryRoutes);
app.use("/api", reportRoutes);
app.use("/api", searchRoutes);
app.use("/api", ratingRoutes);
app.use("/api", locationRoutes);
app.use("/api", legalPolicyRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });