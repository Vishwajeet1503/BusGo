const express = require("express");

const { searchBuses, getBusDetails } = require("../controllers/busController");

const router = express.Router();

router.get("/search", searchBuses);

router.get("/:id", getBusDetails);

module.exports = router;
