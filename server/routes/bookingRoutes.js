const express = require("express");

const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
} = require("../controllers/bookingController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createBooking);

router.get("/", authenticateToken, getUserBookings);

router.get("/:id", authenticateToken, getBookingById);

router.patch("/:id/cancel", authenticateToken, cancelBooking);

module.exports = router;
