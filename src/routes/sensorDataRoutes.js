const express = require("express");
const authenticateApiKey = require("../middleware/authMiddleware");
const { createSensorData } = require("../controllers/sensorDataController");

const router = express.Router();

router.post("/sensor-data", authenticateApiKey, createSensorData);

module.exports = router;
