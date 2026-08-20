const express = require("express");

const { createBooking } = require("../controllers/bookingController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createBooking);

module.exports = router;
