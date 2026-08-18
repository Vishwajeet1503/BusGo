const express = require("express");

const { searchBuses } = require("../controllers/busController");

const router = express.Router();

router.get("/search", searchBuses);

module.exports = router;
