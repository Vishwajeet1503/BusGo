const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db/database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const busRoutes = require("./routes/busRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Bus Booking API is running",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "PostgreSQL connection successful",
      databaseTime: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/buses", busRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
