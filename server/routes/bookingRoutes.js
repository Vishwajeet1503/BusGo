const express = require("express");

const {
  createBooking,
  getUserBookings,
  getBookingById,
} = require("../controllers/bookingController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createBooking);

router.get("/", authenticateToken, getUserBookings);

router.get("/:id", authenticateToken, getBookingById);

module.exports = router;
