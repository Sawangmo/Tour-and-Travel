const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// ❌ Incorrect: router.get("/services", ...)
// ✅ Correct: just use the base route
router.get("/", serviceController.getServicesPage);

module.exports = router;
